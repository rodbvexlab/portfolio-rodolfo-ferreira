/**
 * Scroll-scrubbed video controller.
 *
 * Progress is local to `track` (the tall hero section), never to the page:
 *
 *   progress = -track.top / (track.height - stage.height)
 *
 * 0 when the track's top reaches the viewport top, 1 when its bottom meets the
 * bottom of the sticky `stage`. Everything runs on refs and requestAnimationFrame;
 * no React state is touched per frame.
 *
 * Seeking: the playhead eases toward the scroll target, only one seek is in
 * flight at a time, and when it lands the next seek goes to the latest target.
 * When scrolling stops the playhead converges, the loop idles and the video
 * stays paused on that frame.
 */

export interface ScrollScrubOptions {
  track: HTMLElement
  stage: HTMLElement
  /** Frame rate of the encoded file, used to snap seeks to real frames. */
  fps: number
  /** Called inside rAF whenever the local progress changes. */
  onProgress: (progress: number) => void
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

export function createScrollScrub({ track, stage, fps, onProgress, onFrameReady }: ScrollScrubOptions): ScrollScrub {
  let frameId = 0
  let inView = true
  let range = 1
  let lastProgress = -1
  let lastTs = 0

  let video: HTMLVideoElement | null = null
  let maxFrame = 0
  let playhead = -1 // eased position, in frames
  let shownFrame = -1 // last frame requested from the decoder
  let seeking = false
  let seekTimer = 0
  let revealed = false

  const measure = () => {
    range = Math.max(1, track.offsetHeight - stage.offsetHeight)
  }

  const readProgress = () => Math.min(1, Math.max(0, -track.getBoundingClientRect().top / range))

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
      onProgress(progress)
    }

    let pending = false
    if (video) {
      const target = progress * maxFrame
      if (playhead < 0) playhead = target
      else {
        playhead += (target - playhead) * (1 - Math.exp(-dt / SMOOTHING_MS))
        if (Math.abs(target - playhead) < 0.25) playhead = target
      }
      const frame = Math.round(playhead)
      if (frame !== shownFrame && !seeking) seek(frame)
      pending = seeking || playhead !== target || frame !== shownFrame
    }

    if (moved || pending) schedule()
    else lastTs = 0
  }

  const onScroll = () => schedule()
  const onVisibility = () => {
    if (document.hidden) stop()
    else schedule()
  }

  const resizeObserver = new ResizeObserver(() => {
    measure()
    lastProgress = -1
    schedule()
  })
  const viewObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    if (inView) {
      schedule()
      return
    }
    stop()
    // Leave the styles at the edge the visitor left through (0 above, 1 below).
    lastProgress = readProgress()
    onProgress(lastProgress)
  })

  measure()
  resizeObserver.observe(track)
  resizeObserver.observe(stage)
  viewObserver.observe(track)
  window.addEventListener('scroll', onScroll, { passive: true })
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
      document.removeEventListener('visibilitychange', onVisibility)
    },
  }
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
