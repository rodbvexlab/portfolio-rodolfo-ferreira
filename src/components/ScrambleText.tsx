import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%'

type HTMLTag = keyof React.JSX.IntrinsicElements

interface Props {
  text: string
  className?: string
  delay?: number
  tag?: HTMLTag
}

/**
 * Scrambles through random characters on viewport entry, resolves left-to-right.
 * Skips animation when `prefers-reduced-motion: reduce` is set — renders text instantly.
 */
export default function ScrambleText({ text, className = '', delay = 0, tag }: Props) {
  const Tag = (tag ?? 'span') as HTMLTag
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const reducedMotion = usePrefersReducedMotion()
  const [output, setOutput] = useState(reducedMotion ? text : text) // always start resolved
  const hasRun = useRef(false)

  useEffect(() => {
    // Skip scramble if user prefers reduced motion
    if (reducedMotion || !inView || hasRun.current) return
    hasRun.current = true

    const timeout = setTimeout(() => {
      const totalFrames = text.length * 3
      let frame = 0

      const tick = setInterval(() => {
        setOutput(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              return frame / totalFrames > i / text.length
                ? char
                : CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        frame++
        if (frame > totalFrames + text.length) {
          setOutput(text)
          clearInterval(tick)
        }
      }, 28)

      return () => clearInterval(tick)
    }, delay)

    return () => clearTimeout(timeout)
  }, [inView, text, delay, reducedMotion])

  const El = Tag as React.ElementType
  return (
    <El ref={ref} className={`font-mono ${className}`}>
      {output}
    </El>
  )
}
