import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = '!<>-_\\/[]{}—=+*^?#@$%'

type HTMLTag = keyof React.JSX.IntrinsicElements

interface Props {
  text: string
  className?: string
  delay?: number
  tag?: HTMLTag
}

/**
 * Renders text that scrambles through random characters on viewport entry,
 * then resolves to the final string. Left-to-right resolution.
 */
export default function ScrambleText({ text, className = '', delay = 0, tag }: Props) {
  const Tag = (tag ?? 'span') as HTMLTag
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.8 })
  const [output, setOutput] = useState(text)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
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
              const resolved = frame / totalFrames > i / text.length
              return resolved
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
  }, [inView, text, delay])

  const El = Tag as React.ElementType
  return (
    <El ref={ref} className={`font-mono ${className}`}>
      {output}
    </El>
  )
}
