import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Object URLs by source, kept across effect re-runs (e.g. a source switch on
 * rotation) and revoked when the component unmounts. `isDisposed` lets async
 * work that finishes after unmount release its URL instead of caching it.
 */
export function useObjectUrlCache() {
  const [cache] = useState(() => new Map<string, string>())
  const disposed = useRef(false)
  const isDisposed = useCallback(() => disposed.current, [])

  useEffect(() => {
    disposed.current = false
    return () => {
      disposed.current = true
      cache.forEach((url) => URL.revokeObjectURL(url))
      cache.clear()
    }
  }, [cache])

  return { cache, isDisposed }
}
