/**
 * Scroll-scrubbed video controller.
 *
 * A `ProgressSource` turns the scroll position into a local 0–1 progress for
 * one element; the page height never enters the calculation:
 *
 * - `stickyProgress`: a tall track with a sticky stage (the hero).
 *     progress = -track.top / (track.height - stage.height)
 * - `passageProgress`: an element in normal flow crossing the viewport
 *     (the services video), so the section keeps its natural height.
 *
 * Everything runs on refs and requestAnimationFrame; no React state is touched
 * per frame. The playhead eases toward the scroll target, only one seek is in
 * flight at a time, and when it lands the next seek goes to the latest target.
 * When scrolling stops the playhead converges, the loop idles and the video
 * stays paused on that frame.
 */

export interface ProgressSource {
  /** Current progress; may fall outside 0–1 (the controller clamps it). */
  read: () => number
  /** Re-measure cached sizes after a resize. */
  measure: () => void
}

export function stickyProgress(track: HTMLElement, stage: HTMLElement): ProgressSource {
  let range = 1
  return {
    measure() {
      range = Math.max(1, track.offsetHeight - stage.offsetHeight)
    },
    read: () => -track.getBoundingClientRect().top / range,
  }
}

/**
 * 0 when `el`'s top reaches `start` × viewport height, 1 when its bottom
 * reaches `end` × viewport height (1 = bottom edge, 0 = top edge).
 */
export function passageProgress(el: HTMLElement, start: number, end: number): ProgressSource {
  return {
    measure() {},
    read() {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      return (vh * start - rect.top) / (vh * (start - end) + rect.height)
    },
  }
}

export interface ScrollScrubOptions {
  /** Element observed for visibility; the loop only runs while it intersects the viewport. */
  target: HTMLElement
  progress: ProgressSource
  /** Elements whose size changes require `progress.measure()`. Defaults to `[target]`. */
  observe?: HTMLElement[]
  /** Frame rate of the encoded file, used to snap seeks to real frames. */
  fps: number
  /** Called inside rAF whenever the local progress changes. */
  onProgress?: (progress: number) => void
  /** Called once the first scrubbed frame is decoded after a video is attached. */
  onFrameReady?: () => void
}

export interface ScrollScrub {
  /** Attach a video that has loaded data, or detach with null. */
  setVideo: (video: HTMLVideoElement | null) => void
  destroy: () => void
}

/** Time constant (ms) for easing the playhead toward the scroll target. */
const SMOOTHING_MS = 90
/** Some browsers occasionally drop `seeked`; never wait on a seek longer than this. */
const SEEK_TIMEOUT_MS = 400

export function createScrollScrub({ target, progress: source, observe, fps, onProgress, onFrameReady }: ScrollScrubOptions): ScrollScrub {
  let frameId = 0
  let inView = true
  let lastProgress = -1
  let lastTs = 0

  let video: HTMLVideoElement | null = null
  let maxFrame = 0
  let playhead = -1 // eased position, in frames
  let shownFrame = -1 // last frame requested from the decoder
  let seeking = false
  let seekTimer = 0
  let revealed = false

  const readProgress = () => Math.min(1, Math.max(0, source.read()))

  const stop = () => {
    cancelAnimationFrame(frameId)
    frameId = 0
    lastTs = 0
  }

  const schedule = () => {
    if (!frameId && inView && !document.hidden) frameId = requestAnimationFrame(tick)
  }

  const finishSeek = () => {
    if (!seeking) return
    seeking = false
    window.clearTimeout(seekTimer)
    if (!revealed && video) {
      revealed = true
      onFrameReady?.()
    }
    schedule()
  }

  const seek = (frame: number) => {
    if (!video) return
    seeking = true
    shownFrame = frame
    // Aim at the middle of the frame so float rounding never lands on a neighbour.
    video.currentTime = (frame + 0.5) / fps
    window.clearTimeout(seekTimer)
    seekTimer = window.setTimeout(finishSeek, SEEK_TIMEOUT_MS)
  }

  function tick(ts: number) {
    frameId = 0
    const dt = lastTs ? Math.min(ts - lastTs, 100) : 16
    lastTs = ts

    const progress = readProgress()
    const moved = Math.abs(progress - lastProgress) > 1e-4
    if (moved) {
      lastProgress = progress
      onProgress?.(progress)
    }

    let pending = false
    if (video) {
      const goal = progress * maxFrame
      if (playhead < 0) playhead = goal
      else {
        playhead += (goal - playhead) * (1 - Math.exp(-dt / SMOOTHING_MS))
        if (Math.abs(goal - playhead) < 0.25) playhead = goal
      }
      const frame = Math.round(playhead)
      if (frame !== shownFrame && !seeking) seek(frame)
      pending = seeking || playhead !== goal || frame !== shownFrame
    }

    if (moved || pending) schedule()
    else lastTs = 0
  }

  const onScroll = () => schedule()
  const onVisibility = () => {
    if (document.hidden) stop()
    else schedule()
  }
  const remeasure = () => {
    source.measure()
    lastProgress = -1
    schedule()
  }

  const resizeObserver = new ResizeObserver(remeasure)
  const viewObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    if (inView) {
      schedule()
      return
    }
    stop()
    // Leave the styles at the edge the visitor left through (0 above, 1 below).
    lastProgress = readProgress()
    onProgress?.(lastProgress)
  })

  source.measure()
  for (const el of observe ?? [target]) resizeObserver.observe(el)
  viewObserver.observe(target)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', remeasure)
  document.addEventListener('visibilitychange', onVisibility)
  schedule()

  const detach = () => {
    window.clearTimeout(seekTimer)
    video?.removeEventListener('seeked', finishSeek)
    video = null
    seeking = false
    shownFrame = -1
    playhead = -1
    revealed = false
  }

  return {
    setVideo(next) {
      detach()
      if (!next || !Number.isFinite(next.duration) || next.duration <= 0) return
      video = next
      maxFrame = Math.max(0, Math.round(next.duration * fps) - 1)
      next.pause()
      next.addEventListener('seeked', finishSeek)
      schedule()
    },
    destroy() {
      stop()
      detach()
      resizeObserver.disconnect()
      viewObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', remeasure)
      document.removeEventListener('visibilitychange', onVisibility)
    },
  }
}

/** H.264 High — the codec of every scrub encode (docs/hero-video.md). */
export const SCRUB_VIDEO_TYPE = 'video/mp4; codecs="avc1.640028"'

type Connection = { saveData?: boolean; effectiveType?: string }

/** Save-Data, 2G or no H.264 decoder: keep the poster and skip the download. */
export function shouldSkipScrubVideo(video: HTMLVideoElement) {
  const connection = (navigator as Navigator & { connection?: Connection }).connection
  return !!connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '') || !video.canPlayType(SCRUB_VIDEO_TYPE)
}

/**
 * Downloads a video into memory so seeking never waits on the network.
 * Reports real progress only when the response has an uncompressed Content-Length.
 */
export async function fetchVideoBlob(
  src: string,
  signal: AbortSignal,
  onProgress: (ratio: number | null) => void,
): Promise<string> {
  // Low priority: the poster, fonts and code come first.
  const response = await fetch(src, { signal, priority: 'low' })
  if (!response.ok || !response.body) throw new Error(`Video request failed (${response.status})`)
  const length = Number(response.headers.get('content-length'))
  const total = !response.headers.get('content-encoding') && length > 0 ? length : 0

  const reader = response.body.getReader()
  const chunks: BlobPart[] = []
  let loaded = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value as BlobPart)
    loaded += value.byteLength
    onProgress(total ? Math.min(1, loaded / total) : null)
  }
  return URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' }))
}

export interface ScrubVideoLoad {
  video: HTMLVideoElement
  src: string
  scrub: ScrollScrub
  /** Object URLs by source, owned by the component (revoked on its unmount). */
  cache: Map<string, string>
  /** True once the owning component has unmounted. */
  isDisposed: () => boolean
  onError: () => void
  onLoadProgress?: (ratio: number | null) => void
}

/**
 * Fetches `src` (or reuses its cached object URL), attaches it to `video` and
 * hands it to `scrub`. Falls back to streaming the URL if the fetch fails.
 * Returns a cleanup that aborts the download and releases the element.
 */
export function loadScrubVideo({ video, src, scrub, cache, isDisposed, onError, onLoadProgress }: ScrubVideoLoad): () => void {
  const abort = new AbortController()
  let cancelled = false
  let attached = false
  let primeTimer = 0
  const reportProgress = onLoadProgress ?? (() => {})

  const attach = () => {
    if (cancelled || attached) return
    attached = true
    video.pause()
    scrub.setVideo(video)
  }
  const onLoaded = () => {
    // iOS only paints seeked frames once the element has played; prime it muted.
    const primed = video.play()
    if (primed) primed.then(attach, attach)
    primeTimer = window.setTimeout(attach, 400)
  }
  const onPlay = () => { if (attached) video.pause() }
  const handleError = () => {
    if (cancelled) return
    reportProgress(null)
    scrub.setVideo(null)
    onError()
  }

  video.addEventListener('loadeddata', onLoaded, { once: true })
  video.addEventListener('play', onPlay)
  video.addEventListener('error', handleError)

  const cached = cache.get(src)
  const load = cached
    ? Promise.resolve(cached)
    : fetchVideoBlob(src, abort.signal, reportProgress).then(
        (url) => {
          // Finished after unmount: nothing will revoke it later, so do it now.
          if (isDisposed()) {
            URL.revokeObjectURL(url)
            return null
          }
          cache.set(src, url)
          return url
        },
        // Network/stream trouble: let the element stream the file itself.
        () => (abort.signal.aborted ? null : src),
      )
  load.then((url) => {
    reportProgress(null)
    if (cancelled || !url) return
    video.src = url
    video.load()
  })

  return () => {
    cancelled = true
    window.clearTimeout(primeTimer)
    abort.abort()
    video.removeEventListener('loadeddata', onLoaded)
    video.removeEventListener('play', onPlay)
    video.removeEventListener('error', handleError)
    video.pause()
    video.removeAttribute('src')
    video.load()
  }
}
