import { useEffect, useRef } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { useObjectUrlCache } from '../hooks/useObjectUrlCache'
import { createScrollScrub, loadScrubVideo, passageProgress, shouldSkipScrubVideo } from '../lib/scrollScrub'

const SMALL_QUERY = '(max-width: 767px)'
const MEDIA = {
  large: '/services/services-scrub-desktop.mp4',
  small: '/services/services-scrub-mobile.mp4',
  poster: '/services/services-poster.webp',
}
/** Both encodes keep the source's 24 fps (docs/hero-video.md). */
const VIDEO_FPS = 24
/** Scrub while the video crosses the viewport: its top at 95% of the height → its bottom at 5%. */
const PASSAGE = { start: 0.95, end: 0.05 }
/** Start downloading about one viewport before the video arrives. */
const PRELOAD_MARGIN = '100% 0px'

/**
 * The floating island beside "O que eu desenvolvo". Decorative: the poster is
 * always there; the video follows the section's own scroll (no sticky track),
 * so the section keeps its natural height. Edge masks live in index.css.
 */
export default function ServicesVideo({ className = '' }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion()
  const small = useMediaQuery(SMALL_QUERY)
  const { cache, isDisposed } = useObjectUrlCache()
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    if (reducedMotion) {
      frame.dataset.video = 'off'
      return
    }

    const scrub = createScrollScrub({
      target: frame,
      progress: passageProgress(frame, PASSAGE.start, PASSAGE.end),
      fps: VIDEO_FPS,
      onFrameReady: () => { frame.dataset.video = 'ready' },
    })
    const video = videoRef.current
    if (!video || shouldSkipScrubVideo(video)) {
      frame.dataset.video = 'off'
      return () => scrub.destroy()
    }

    let stopLoading = () => {}
    const near = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      near.disconnect()
      frame.dataset.video = 'loading'
      stopLoading = loadScrubVideo({
        video,
        src: small ? MEDIA.small : MEDIA.large,
        scrub,
        cache,
        isDisposed,
        onError: () => { frame.dataset.video = 'error' },
      })
    }, { rootMargin: PRELOAD_MARGIN })
    near.observe(frame)

    return () => {
      near.disconnect()
      stopLoading()
      scrub.destroy()
    }
  }, [reducedMotion, small, cache, isDisposed])

  return (
    <div ref={frameRef} className={`services-media ${className}`} data-video="idle" aria-hidden="true">
      <img src={MEDIA.poster} alt="" width={1180} height={988} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      {!reducedMotion && (
        <video
          ref={videoRef}
          className="services-video absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
        />
      )}
    </div>
  )
}
