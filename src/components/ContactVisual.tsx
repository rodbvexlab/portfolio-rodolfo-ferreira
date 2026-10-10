import { useEffect, useRef, useState, type ComponentType } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery'
import type { DitherVeilProps } from './DitherVeil'

/** Photo by Maxim Berg on Unsplash (Unsplash License) — docs/hero-video.md. */
const IMAGE = {
  // Original file referenced by the component's src (1400×1939), used by WebGL.
  original: '/contact/dither-veil.jpg',
  // Static copies: same photo, near-black background taken to #000 so the
  // frame disappears into the section (tones above 48/255 are untouched).
  static: '/contact/dither-veil-static.webp',
  staticSmall: '/contact/dither-veil-800.webp',
}
/** The reveal follows a pointer: only on screens that hover with a fine pointer. */
const INTERACTIVE_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)'
/** Load the WebGL chunk about one viewport before the section arrives. */
const PRELOAD_MARGIN = '100% 0px'

/** 150–180 px, scaled with the frame (≈30% of its shorter side). */
const radiusFor = (w: number, h: number) => Math.round(Math.min(180, Math.max(150, Math.min(w, h) * 0.3)))

/**
 * Decorative image beside the contact form. Desktop with a mouse: DitherVeil
 * (WebGL2, loaded on approach). Touch, narrow screens, reduced motion or any
 * WebGL/image failure: the static image in colour.
 */
export default function ContactVisual({ className = '' }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion()
  const canHover = useMediaQuery(INTERACTIVE_QUERY)
  const [Veil, setVeil] = useState<ComponentType<DitherVeilProps> | null>(null)
  const [fallback, setFallback] = useState(false)
  const [radius, setRadius] = useState(165)
  const frameRef = useRef<HTMLDivElement>(null)
  const interactive = canHover && !reducedMotion && !fallback

  // Fetch the component (and ogl) only when the section approaches.
  useEffect(() => {
    const frame = frameRef.current
    if (!interactive || Veil || !frame) return
    let cancelled = false
    const near = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      near.disconnect()
      import('./DitherVeil').then(
        (module) => { if (!cancelled) setVeil(() => module.default) },
        () => { if (!cancelled) setFallback(true) },
      )
    }, { rootMargin: PRELOAD_MARGIN })
    near.observe(frame)
    return () => {
      cancelled = true
      near.disconnect()
    }
  }, [interactive, Veil])

  useEffect(() => {
    const frame = frameRef.current
    if (!interactive || !frame) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setRadius(radiusFor(width, height))
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [interactive])

  const mode = interactive ? (Veil ? 'webgl' : 'pending') : 'static'
  return (
    <div ref={frameRef} aria-hidden="true" className={`contact-visual ${className}`} data-mode={mode}>
      {interactive ? (
        Veil && (
          <Veil
            src={IMAGE.original}
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
