import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIsTouch } from '../hooks/useMediaQuery'

interface Props {
  children: React.ReactNode
  className?: string
  strength?: number
}

/**
 * Magnetic hover — drifts toward cursor on desktop.
 * On touch devices, renders a plain wrapper (no JS overhead,
 * no broken UX from touch events triggering drift).
 */
export default function MagneticButton({ children, className = '', strength = 0.28 }: Props) {
  const isTouch = useIsTouch()
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * strength,
      y: (e.clientY - (rect.top + rect.height / 2)) * strength,
    })
  }

  const handleLeave = () => setPos({ x: 0, y: 0 })

  // Touch: plain div — no event listeners, no animation overhead
  if (isTouch) {
    return <div className={`inline-flex ${className}`}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.6 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}
