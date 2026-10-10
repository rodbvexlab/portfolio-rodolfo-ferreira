import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { createScrollScrub, fetchVideoBlob } from '../lib/scrollScrub'

/** Narrow portrait screens get the 9:16 centre cut of the video. */
const PORTRAIT_QUERY = '(max-aspect-ratio: 7/10)'
const HERO_MEDIA = {
  landscape: { video: '/hero/hero-scrub-desktop.mp4', poster: '/hero/hero-poster-desktop.webp' },
  portrait: { video: '/hero/hero-scrub-mobile.mp4', poster: '/hero/hero-poster-mobile.webp' },
}
/** Both encodes keep the source's 24 fps (docs/hero-video.md). */
const VIDEO_FPS = 24
const VIDEO_TYPE = 'video/mp4; codecs="avc1.640028"'

/** 0 → 1 while `progress` crosses [start, end]. */
const segment = (progress: number, start: number, end: number) =>
  Math.min(1, Math.max(0, (progress - start) / (end - start)))

type Connection = { saveData?: boolean; effectiveType?: string }

function prefersLightMedia() {
  const connection = (navigator as Navigator & { connection?: Connection }).connection
  return !!connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '')
}

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t
  const reducedMotion = usePrefersReducedMotion()
  const portrait = useMediaQuery(PORTRAIT_QUERY)

  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const introShadeRef = useRef<HTMLDivElement>(null)
  const exitShadeRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLSpanElement>(null)
  const loadingRef = useRef<HTMLSpanElement>(null)
  // Object URLs survive source switches (rotation) and are revoked on unmount.
  const blobUrls = useRef(new Map<string, string>())
  const disposed = useRef(false)

  useEffect(() => {
    disposed.current = false
    const urls = blobUrls.current
    return () => {
      disposed.current = true
      urls.forEach((url) => URL.revokeObjectURL(url))
      urls.clear()
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const media = mediaRef.current
    const title = titleRef.current
    const details = detailsRef.current
    const ctas = ctasRef.current
    const introShade = introShadeRef.current
    const exitShade = exitShadeRef.current
    const progressBar = progressRef.current
    const progressFill = progressFillRef.current
    const loading = loadingRef.current
    if (!track || !stage || !media || !title || !details || !ctas || !introShade || !exitShade || !progressBar || !progressFill || !loading) return

    const animated = [media, title, details, introShade, exitShade, progressBar, progressFill]
    if (reducedMotion) {
      // Static opening: poster, full copy, nothing tied to scroll.
      animated.forEach((el) => el.removeAttribute('style'))
      ctas.inert = false
      stage.dataset.video = 'off'
      return
    }

    // Moment 1 (0 → ~0.2): headline, description and CTAs, then they fold away.
    // Moment 2: the video has the stage; from ~0.55 it darkens from the bottom
    // while "Projetos selecionados" rises over it (native scroll, see index.css).
    const applyProgress = (p: number) => {
      const detailsOut = segment(p, 0.03, 0.14)
      const titleOut = segment(p, 0.06, 0.2)
      details.style.opacity = String(1 - detailsOut)
      details.style.transform = `translate3d(0, ${(-14 * detailsOut).toFixed(2)}px, 0)`
      title.style.opacity = String(1 - titleOut)
      title.style.transform = `translate3d(0, ${(-26 * titleOut).toFixed(2)}px, 0)`
      const ctasHidden = detailsOut > 0.4
      if (ctas.inert !== ctasHidden) ctas.inert = ctasHidden
      introShade.style.opacity = String(1 - 0.75 * segment(p, 0.05, 0.22))
      exitShade.style.opacity = String(segment(p, 0.52, 0.94))
      media.style.opacity = String(1 - 0.4 * segment(p, 0.78, 1))
      progressFill.style.transform = `scaleY(${p.toFixed(4)})`
      progressBar.style.opacity = String(1 - segment(p, 0.82, 0.97))
      const moment = p < 0.18 ? '1' : '2'
      if (progressBar.dataset.moment !== moment) progressBar.dataset.moment = moment
    }

    const video = videoRef.current
    const scrub = createScrollScrub({
      track,
      stage,
      fps: VIDEO_FPS,
      onProgress: applyProgress,
      onFrameReady: () => { stage.dataset.video = 'ready' },
    })

    // Save-Data, 2G or no H.264 decoder: keep the poster and skip the download.
    if (!video || prefersLightMedia() || !video.canPlayType(VIDEO_TYPE)) {
      stage.dataset.video = 'off'
      return () => scrub.destroy()
    }

    const src = portrait ? HERO_MEDIA.portrait.video : HERO_MEDIA.landscape.video
    const abort = new AbortController()
    let cancelled = false
    let attached = false
    let shownPercent = -1
    let primeTimer = 0

    const showLoading = (ratio: number | null) => {
      const percent = ratio === null ? -1 : Math.round(ratio * 100)
      if (percent === shownPercent) return
      shownPercent = percent
      loading.textContent = percent < 0 || percent >= 100 ? '' : `${loading.dataset.label} ${percent}%`
    }

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
    const onError = () => {
      if (cancelled) return
      stage.dataset.video = 'error'
      showLoading(null)
      scrub.setVideo(null)
    }

    stage.dataset.video = 'loading'
    video.addEventListener('loadeddata', onLoaded, { once: true })
    video.addEventListener('play', onPlay)
    video.addEventListener('error', onError)

    const cached = blobUrls.current.get(src)
    const load = cached
      ? Promise.resolve(cached)
      : fetchVideoBlob(src, abort.signal, showLoading).then(
          (url) => {
            // Finished after unmount: nothing will revoke it later, so do it now.
            if (disposed.current) {
              URL.revokeObjectURL(url)
              return null
            }
            blobUrls.current.set(src, url)
            return url
          },
          // Network/stream trouble: let the element stream the file itself.
          () => (abort.signal.aborted ? null : src),
        )
    load.then((url) => {
      showLoading(null)
      if (cancelled || !url) return
      video.src = url
      video.load()
    })

    return () => {
      cancelled = true
      window.clearTimeout(primeTimer)
      abort.abort()
      scrub.destroy()
      video.removeEventListener('loadeddata', onLoaded)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('error', onError)
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [reducedMotion, portrait])

  return (
    <section id="hero-section" ref={trackRef} aria-labelledby="hero-title" className="hero-track">
      <div ref={stageRef} className="hero-stage" data-video="idle">
        <div ref={mediaRef} className="absolute inset-0">
          <picture>
            <source media={PORTRAIT_QUERY} srcSet={HERO_MEDIA.portrait.poster} />
            <img src={HERO_MEDIA.landscape.poster} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </picture>
          {!reducedMotion && (
            <video
              ref={videoRef}
              className="hero-video absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
            />
          )}
        </div>

        <div aria-hidden="true" className="hero-shade-top" />
        <div ref={introShadeRef} aria-hidden="true" className="hero-shade-intro" />
        <div ref={exitShadeRef} aria-hidden="true" className="hero-shade-exit" />

        <div className="relative z-10 h-full max-w-container-max mx-auto px-6 md:px-20 flex flex-col justify-end pb-6 md:pb-10">
          <div ref={titleRef} className="hero-copy will-change-transform">
            <p className="section-label mb-5 md:mb-7">{hero.label}</p>
            <h1 id="hero-title" className="font-sans font-normal text-[clamp(2.1rem,9.2vw,3.4rem)] md:text-[clamp(3.5rem,7vw,6.6rem)] leading-[1] tracking-[-0.055em] text-white">
              {hero.headline.map((line) => <span key={line} className="block">{line}</span>)}
            </h1>
          </div>
          <div ref={detailsRef} className="hero-copy will-change-transform">
            <div className="mt-6 md:mt-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
              <p className="text-[16px] md:text-[18px] leading-relaxed text-white/80 max-w-[34rem]">{hero.body}</p>
              <div ref={ctasRef} className="flex flex-wrap items-center gap-x-7 gap-y-3 shrink-0">
                <a href="#projects" className="primary-link">{hero.cta_primary}<span aria-hidden="true">↗</span></a>
                <a href="#contato" className="text-[14px] text-white/85 hover:text-cyan-300 transition-colors py-3">{hero.cta_secondary}</a>
              </div>
            </div>
            <div className="mt-8 md:mt-12 pt-4 border-t border-white/15 flex items-center justify-between gap-4 text-[12px] text-white/65">
              <span>{hero.note}</span>
              <span ref={loadingRef} data-label={hero.loading} aria-hidden="true" className="font-mono tabular-nums text-white/55" />
            </div>
          </div>
        </div>

        <div ref={progressRef} aria-hidden="true" className="hero-progress group" data-moment="1">
          <span className="font-mono text-[10px] text-white/45 group-data-[moment=1]:text-white">01</span>
          <span className="relative block w-px h-16 md:h-24 bg-white/20 overflow-hidden">
            <span ref={progressFillRef} className="hero-progress-fill" />
          </span>
          <span className="font-mono text-[10px] text-white/45 group-data-[moment=2]:text-white">02</span>
        </div>
      </div>
    </section>
  )
}
