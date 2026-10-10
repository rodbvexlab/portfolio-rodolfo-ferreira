import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { useObjectUrlCache } from '../hooks/useObjectUrlCache'
import { createScrollScrub, loadScrubVideo, shouldSkipScrubVideo, stickyProgress } from '../lib/scrollScrub'

const SMALL_QUERY = '(max-width: 767px)'
const MEDIA = {
  large: { video: '/about/about-scrub-desktop.mp4', poster: '/about/about-poster-desktop.webp' },
  // 1:1 centre cut: figure, hand and rings stay in frame above the text on phones
  small: { video: '/about/about-scrub-mobile.mp4', poster: '/about/about-poster-mobile.webp' },
}
/** Both encodes keep the source's 24 fps (docs/hero-video.md). */
const VIDEO_FPS = 24
/** Start downloading about one viewport before the section arrives. */
const PRELOAD_MARGIN = '100% 0px'

/**
 * Local progress windows for each line: [enter from, enter to, leave from, leave to].
 * Moment 1 (headline and intro) reads first; moment 2 (experience and the
 * closing line) follows and holds until the stage releases.
 */
type Window = [number, number, number, number]
const MOMENT_1: Window[] = [
  [-1, 0, 0.33, 0.41], // label + "Sou o Rodolfo." — already in place when the stage pins
  [0.03, 0.1, 0.33, 0.41],
  [0.08, 0.15, 0.34, 0.42],
]
const MOMENT_2: Window[] = [
  [0.44, 0.51, 0.9, 0.97],
  [0.49, 0.56, 0.9, 0.97],
  [0.54, 0.61, 0.91, 0.98],
]

const segment = (p: number, start: number, end: number) => Math.min(1, Math.max(0, (p - start) / (end - start)))

/**
 * "Sobre": a light editorial pause between the black sections. The video is
 * decorative; the copy stays in semantic order and fully in the DOM. With
 * reduced motion, no H.264, Save-Data/2G or a failed load, the section becomes
 * a static composition: poster plus all of the copy, no scroll needed.
 */
export default function About() {
  const { t } = useLanguage()
  const { about } = t
  const reducedMotion = usePrefersReducedMotion()
  const small = useMediaQuery(SMALL_QUERY)
  const [unsupported] = useState(() => shouldSkipScrubVideo(document.createElement('video')))
  const [failed, setFailed] = useState(false)
  const isStatic = reducedMotion || unsupported || failed
  const { cache, isDisposed } = useObjectUrlCache()

  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const moment1Ref = useRef<HTMLDivElement>(null)
  const moment2Ref = useRef<HTMLDivElement>(null)
  const exitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const moment1 = moment1Ref.current
    const moment2 = moment2Ref.current
    const exit = exitRef.current
    if (!track || !stage || !moment1 || !moment2 || !exit) return

    const parts1 = [...moment1.querySelectorAll<HTMLElement>('[data-part]')]
    const parts2 = [...moment2.querySelectorAll<HTMLElement>('[data-part]')]
    const veil1 = moment1.querySelector<HTMLElement>('.about-veil')
    const veil2 = moment2.querySelector<HTMLElement>('.about-veil')
    const animated = [...parts1, ...parts2, veil1, veil2, exit].filter((el): el is HTMLElement => !!el)
    if (isStatic) {
      animated.forEach((el) => el.removeAttribute('style'))
      return
    }

    const place = (parts: HTMLElement[], windows: Window[], p: number) => {
      let shown = 0
      parts.forEach((el, i) => {
        const [a, b, c, d] = windows[Math.min(i, windows.length - 1)]
        const enter = a < 0 ? 1 : segment(p, a, b)
        const leave = segment(p, c, d)
        const opacity = enter * (1 - leave)
        shown = Math.max(shown, opacity)
        el.style.opacity = opacity.toFixed(3)
        el.style.transform = `translate3d(0, ${((1 - enter) * 14 - leave * 12).toFixed(2)}px, 0)`
      })
      return shown
    }
    const applyProgress = (p: number) => {
      const shown1 = place(parts1, MOMENT_1, p)
      const shown2 = place(parts2, MOMENT_2, p)
      // Localized light behind each group follows the group in and out.
      if (veil1) veil1.style.opacity = shown1.toFixed(3)
      if (veil2) veil2.style.opacity = shown2.toFixed(3)
      exit.style.opacity = segment(p, 0.9, 1).toFixed(3)
    }

    const scrub = createScrollScrub({
      target: track,
      progress: stickyProgress(track, stage),
      observe: [track, stage],
      fps: VIDEO_FPS,
      onProgress: applyProgress,
      onFrameReady: () => { stage.dataset.video = 'ready' },
    })
    const video = videoRef.current
    if (!video) return () => scrub.destroy()

    let stopLoading = () => {}
    const near = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      near.disconnect()
      stage.dataset.video = 'loading'
      stopLoading = loadScrubVideo({
        video,
        src: small ? MEDIA.small.video : MEDIA.large.video,
        scrub,
        cache,
        isDisposed,
        onError: () => setFailed(true),
      })
    }, { rootMargin: PRELOAD_MARGIN })
    near.observe(track)

    return () => {
      near.disconnect()
      stopLoading()
      scrub.destroy()
    }
  }, [isStatic, small, cache, isDisposed])

  return (
    <section aria-labelledby="about-title" className="about-section" data-mode={isStatic ? 'static' : 'scrub'}>
      <div aria-hidden="true" className="about-ramp about-ramp--in" />
      <div id="about" ref={trackRef} className="about-track">
        <div ref={stageRef} className="about-stage" data-video="idle">
          <div className="about-media" aria-hidden="true">
            <picture>
              <source media={SMALL_QUERY} srcSet={MEDIA.small.poster} />
              <img src={MEDIA.large.poster} alt="" loading="lazy" decoding="async" className="about-fill" />
            </picture>
            {!isStatic && (
              <video ref={videoRef} className="about-fill about-video" muted playsInline preload="auto" disablePictureInPicture tabIndex={-1} />
            )}
            <div ref={exitRef} className="about-exit" />
          </div>

          <div className="about-copy">
            <div ref={moment1Ref} className="about-moment about-moment--1">
              <span aria-hidden="true" className="about-veil" />
              <div data-part>
                <p className="about-label">{about.label}</p>
                <h2 id="about-title" className="about-title">{about.headline}</h2>
              </div>
              {about.intro.map((line, i) => <p key={i} data-part className="about-line">{line}</p>)}
            </div>
            <div ref={moment2Ref} className="about-moment about-moment--2">
              <span aria-hidden="true" className="about-veil" />
              {about.experience.map((line, i) => <p key={i} data-part className="about-line">{line}</p>)}
              <p data-part className="about-closing">{about.working}</p>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="about-ramp about-ramp--out" />
    </section>
  )
}
