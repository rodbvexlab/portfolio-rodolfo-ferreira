import { useEffect, useRef } from 'react'

const HERO_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

interface VideoBackgroundProps {
  heroRef: React.RefObject<HTMLElement | null>
}

export default function VideoBackground({ heroRef }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Scroll fade: video + hero text fade out as user scrolls (over 90% of hero height)
  useEffect(() => {
    const video = videoRef.current
    let raf: number

    const update = () => {
      const hero = heroRef.current
      const scrollY = window.scrollY
      const heroHeight = hero?.offsetHeight || window.innerHeight
      const progress = Math.min(scrollY / (heroHeight * 0.9), 1)
      const opacity = 1 - progress

      // Video fades from 0.85 → 0
      if (video) video.style.opacity = String(0.85 * opacity)
      // Hero text fades from 1 → 0
      if (hero) (hero as HTMLElement).style.opacity = String(opacity)

      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [heroRef])

  return (
    <>
      {/*
        Z-index layers (all fixed, behind content):
          0 → black base (#000 on html/body)
          1 → video at 85% opacity  (z-index: 1, inside fixed container at z-index: 0)
          2 → light darkening overlay  (z-index: 2)
          3 → top + bottom fades  (z-index: 3)
        Hero content sits at z-index: 10 (relative, above all of these)
      */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundColor: '#000',
          overflow: 'hidden',
        }}
      >
        {/* VIDEO — clearly visible */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.85,
            zIndex: 1,
            transform: 'translateY(0%)',
          }}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Light darkening so text stays readable — max black/25 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background: 'rgba(0,0,0,0.25)',
            pointerEvents: 'none',
          }}
        />

        {/* Top edge fade — narrow */}
        <div
          style={{
            position: 'absolute',
            inset: '0 0 auto 0',
            height: '80px',
            zIndex: 3,
            background: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Bottom fade — keeps centre of hero fully visible */}
        <div
          style={{
            position: 'absolute',
            inset: 'auto 0 0 0',
            height: '30vh',
            zIndex: 3,
            background: 'linear-gradient(to bottom, transparent 0%, #000 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </>
  )
}
