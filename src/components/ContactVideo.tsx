import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { useObjectUrlCache } from '../hooks/useObjectUrlCache'
import { arrivalProgress, createScrollScrub, loadScrubVideo, shouldSkipScrubVideo } from '../lib/scrollScrub'

/** The 1:1 cut of the hand video (900×900, docs/hero-video.md): one file for every screen. */
const MEDIA = {
  video: '/about/about-scrub-mobile.mp4',
  poster: '/about/about-poster-mobile.webp',
}
const VIDEO_FPS = 24
/** Start downloading about one viewport before the video arrives. */
const PRELOAD_MARGIN = '100% 0px'

/**
 * The hand beside the contact form. Decorative: the poster is always there;
 * the video follows the scroll from the moment it enters the screen until it
 * reaches the middle (or the page ends). Edge masks live in index.css.
 */
export default function ContactVideo() {
  const reducedMotion = usePrefersReducedMotion()
  const { cache, isDisposed } = useObjectUrlCache()
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const target: HTMLDivElement = frame
    if (reducedMotion) {
      frame.dataset.video = 'off'
      return
    }

    const scrub = createScrollScrub({
      target: frame,
      progress: arrivalProgress(frame),
      fps: VIDEO_FPS,
      onFrameReady: () => { frame.dataset.video = 'ready' },
    })
    const video = videoRef.current
    if (!video || shouldSkipScrubVideo(video)) {
      frame.dataset.video = 'off'
      return () => scrub.destroy()
    }

    let stopLoading = () => {}
    let started = false
    const start = () => {
      if (started) return
      started = true
      near.disconnect()
      window.removeEventListener('scroll', check)
      frame.dataset.video = 'loading'
      stopLoading = loadScrubVideo({
        video,
        src: MEDIA.video,
        scrub,
        cache,
        isDisposed,
        onError: () => { frame.dataset.video = 'error' },
      })
    }
    // The position check backs up the observer (a jump made while the page is
    // still loading can go unnoticed by it).
    function check() {
      const { top, bottom } = target.getBoundingClientRect()
      if (top < window.innerHeight * 2 && bottom > -window.innerHeight) start()
    }
    const near = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) start() }, { rootMargin: PRELOAD_MARGIN })
    near.observe(frame)
    window.addEventListener('scroll', check, { passive: true })
    check()

    return () => {
      near.disconnect()
      window.removeEventListener('scroll', check)
      stopLoading()
      scrub.destroy()
    }
  }, [reducedMotion, cache, isDisposed])

  return (
    <div ref={frameRef} className="contact-video" data-video="idle" aria-hidden="true">
      <img src={MEDIA.poster} alt="" width={900} height={900} loading="lazy" decoding="async" className="contact-video-fill" />
      {!reducedMotion && (
        <video ref={videoRef} className="contact-video-fill contact-video-el" muted playsInline preload="auto" disablePictureInPicture tabIndex={-1} />
      )}
    </div>
  )
}
