import { useCallback, useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query. Re-renders only when the match changes. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(query)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  const getSnapshot = () => window.matchMedia(query).matches
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

/** True on touch-primary devices (phones, tablets). Uses pointer:coarse — more reliable than screen width. */
export const useIsTouch = () => useMediaQuery('(pointer: coarse)')

/** True when the OS has requested reduced motion. Animations should be minimal or skipped. */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** True on screens ≤ 768px */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)')
