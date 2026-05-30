import { useState, useEffect } from 'react'

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

/** True on touch-primary devices (phones, tablets). Uses pointer:coarse — more reliable than screen width. */
export const useIsTouch = () => useMediaQuery('(pointer: coarse)')

/** True when the OS has requested reduced motion. Animations should be minimal or skipped. */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** True on screens ≤ 768px */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
