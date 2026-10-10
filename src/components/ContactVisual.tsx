import { useEffect, useRef, useState, type ComponentType } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery'
import type { DitherVeilProps } from './DitherVeil'

/** Photo by Maxim Berg on Unsplash (Unsplash License) — docs/hero-video.md. */
const IMAGE = {
  // Original file referenced by the component's src (1400×1939), used by WebGL.
  original: '/contact/dither-veil.jpg',
  // Static copies: same photo, near-black background taken to #000 so the
  // frame disappears into the section (tones above 48/255 are untouched).
  // The 800 px one also feeds the effect on phones.
  static: '/contact/dither-veil-static.webp',
  staticSmall: '/contact/dither-veil-800.webp',
}
/** The reveal follows a pointer only on screens that hover with a fine pointer; elsewhere it follows the scroll. */
const POINTER_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)'
const WIDE_QUERY = '(min-width: 768px)'
/** Centre of the face in the photo (frame coordinates), where the scroll reveal opens. */
const FACE: [number, number] = [0.52, 0.4]
/** Load the WebGL chunk about one viewport before the section arrives. */
const PRELOAD_MARGIN = '100% 0px'

/** 150–180 px, scaled with the frame (≈30% of its shorter side). */
const radiusFor = (w: number, h: number) => Math.round(Math.min(180, Math.max(150, Math.min(w, h) * 0.3)))

/**
 * Decorative image beside the contact form, DitherVeil (WebGL2, loaded on
 * approach). Desktop with a mouse: the cursor reveals the colours. Touch and
 * narrow screens: the colours open from the face while scrolling down and
 * close again on the way up. Reduced motion or any WebGL/image failure: the
 * static image in colour.
 */
export default function ContactVisual({ className = '' }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion()
  const canHover = useMediaQuery(POINTER_QUERY)
  const wide = useMediaQuery(WIDE_QUERY)
  const [Veil, setVeil] = useState<ComponentType<DitherVeilProps> | null>(null)
  const [fallback, setFallback] = useState(false)
  const [radius, setRadius] = useState(165)
  const frameRef = useRef<HTMLDivElement>(null)
  const animated = !reducedMotion && !fallback
  const trigger = canHover ? 'pointer' : 'scroll'

  // Fetch the component (and ogl) only when the section approaches. The
  // position check backs up the observer, which can miss a jump made while the
  // page is still loading; whichever sees it first loads, once.
  useEffect(() => {
    const frame = frameRef.current
    if (!animated || Veil || !frame) return
    const target: HTMLDivElement = frame
    let cancelled = false
    let requested = false
    let near: IntersectionObserver | null = null
    const stop = () => {
      near?.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
    const load = () => {
      if (requested) return
      requested = true
      stop()
      import('./DitherVeil').then(
        (module) => { if (!cancelled) setVeil(() => module.default) },
        () => { if (!cancelled) setFallback(true) },
      )
    }
    function check() {
      const { top, bottom } = target.getBoundingClientRect()
      if (top < window.innerHeight * 2 && bottom > -window.innerHeight) load()
    }
    near = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) load() }, { rootMargin: PRELOAD_MARGIN })
    near.observe(target)
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    check()
    return () => {
      cancelled = true
      stop()
    }
  }, [animated, Veil])

  useEffect(() => {
    const frame = frameRef.current
    if (!animated || trigger !== 'pointer' || !frame) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setRadius(radiusFor(width, height))
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [animated, trigger])

  const mode = animated ? (Veil ? 'webgl' : 'pending') : 'static'
  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className={`contact-visual ${className}`}
      data-mode={mode}
      data-trigger={animated ? trigger : undefined}
    >
      {animated ? (
        Veil && (
          <Veil
            src={wide ? IMAGE.original : IMAGE.staticSmall}
            trigger={trigger}
            focus={FACE}
            pattern="floyd"
            fit="contain"
            pixelSize={2}
            inkColor="#000000"
            paperColor="#f4f1ea"
            revealRadius={radius}
            softness={0.6}
            linger={1}
            reverse={false}
            wander={false}
            clickBurst={false}
            rim={0}
            onFallback={() => setFallback(true)}
          />
        )
      ) : (
        <img
          src={IMAGE.static}
          srcSet={`${IMAGE.staticSmall} 800w, ${IMAGE.static} 1400w`}
          sizes="(min-width: 1024px) 34rem, 90vw"
          alt=""
          width={1400}
          height={1939}
          loading="lazy"
          decoding="async"
          className="contact-visual-img"
        />
      )}
    </div>
  )
}
