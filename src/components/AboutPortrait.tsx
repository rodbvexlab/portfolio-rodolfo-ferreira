import { useEffect, useRef, useState, type ComponentType } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery'
import type { DitherVeilProps } from './DitherVeil'

/** Photo by Maxim Berg on Unsplash (Unsplash License) — docs/hero-video.md. */
const IMAGE = {
  // Original file referenced by the component's src (1400×1939), used by WebGL.
  original: '/about/portrait.jpg',
  // Static copies: same photo, near-black background taken to #000 so the
  // frame disappears into the section (tones above 48/255 are untouched).
  // The 800 px one also feeds the effect on phones.
  static: '/about/portrait-static.webp',
  staticSmall: '/about/portrait-800.webp',
}
/** The cursor reveal needs a screen that hovers with a fine pointer. */
const POINTER_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)'
const WIDE_QUERY = '(min-width: 768px)'
/** Centre of the face in the photo (frame coordinates), where `reveal` opens. */
const FACE: [number, number] = [0.52, 0.4]
/** Load the WebGL chunk about one viewport before the section arrives. */
const PRELOAD_MARGIN = '100% 0px'

/** 150–180 px, scaled with the frame (≈30% of its shorter side). */
const radiusFor = (w: number, h: number) => Math.round(Math.min(180, Math.max(150, Math.min(w, h) * 0.3)))

/**
 * The dotted face in "Sobre", DitherVeil (WebGL2, loaded on approach). The
 * colours open with `reveal` (the section's progress); on a desktop with a
 * mouse the cursor reveals them too. Reduced motion or any WebGL/image
 * failure: the static photo in colour.
 */
export default function AboutPortrait({ reveal, className = '' }: { reveal: () => number; className?: string }) {
  const reducedMotion = usePrefersReducedMotion()
  const canHover = useMediaQuery(POINTER_QUERY)
  const wide = useMediaQuery(WIDE_QUERY)
  const [Veil, setVeil] = useState<ComponentType<DitherVeilProps> | null>(null)
  const [fallback, setFallback] = useState(false)
  const [radius, setRadius] = useState(165)
  const frameRef = useRef<HTMLDivElement>(null)
  const animated = !reducedMotion && !fallback

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
    if (!animated || !canHover || !frame) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setRadius(radiusFor(width, height))
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [animated, canHover])

  const mode = animated ? (Veil ? 'webgl' : 'pending') : 'static'
  return (
    <div ref={frameRef} aria-hidden="true" className={`about-portrait ${className}`.trim()} data-mode={mode} data-pointer={animated && canHover ? 'true' : undefined}>
      {animated ? (
        Veil && (
          <Veil
            src={wide ? IMAGE.original : IMAGE.staticSmall}
            pointer={canHover}
            reveal={reveal}
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
          sizes="(min-width: 1024px) 40rem, 90vw"
          alt=""
          width={1400}
          height={1939}
          loading="lazy"
          decoding="async"
          className="about-portrait-img"
        />
      )}
    </div>
  )
}
