import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Route-aware scroll control for the SPA.
 *
 * - New page (PUSH/REPLACE to another pathname) → starts at the top, instantly.
 * - Hash (`/#projects`, `/#project-origens`) → scrolls to that element once it exists.
 * - Same page + hash/logo click → smooth scroll (feels like an in-page anchor).
 * - Back/forward (POP) → restores the position the visitor left that entry at.
 */
const positions = new Map<string, number>()
const MAX_WAIT_MS = 1200

function scrollWhenReady(getTop: () => number | null, behavior: ScrollBehavior) {
  const start = performance.now()
  let frame = 0
  const tick = () => {
    const top = getTop()
    const reachable = top !== null && document.documentElement.scrollHeight - window.innerHeight >= top - 1
    if (top !== null && (reachable || performance.now() - start > MAX_WAIT_MS)) {
      window.scrollTo({ top, behavior })
      return
    }
    if (performance.now() - start <= MAX_WAIT_MS) frame = requestAnimationFrame(tick)
  }
  tick()
  return () => cancelAnimationFrame(frame)
}

export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const lastY = useRef(0)
  const prev = useRef<{ pathname: string; key: string } | null>(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    const onScroll = () => { lastY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const previous = prev.current
    if (previous) positions.set(previous.key, lastY.current)
    prev.current = { pathname, key }

    const samePage = previous?.pathname === pathname
    const behavior: ScrollBehavior = samePage ? 'smooth' : 'instant'

    if (navigationType === 'POP' && positions.has(key)) {
      const saved = positions.get(key)!
      return scrollWhenReady(() => saved, 'instant')
    }

    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      return scrollWhenReady(() => {
        const el = document.getElementById(id)
        if (!el) return null
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
        return Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin)
      }, behavior)
    }

    window.scrollTo({ top: 0, behavior })
  }, [pathname, hash, key, navigationType])

  return null
}
