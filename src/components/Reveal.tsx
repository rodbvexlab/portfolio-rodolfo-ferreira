import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ease } from '../lib/motion'

/** Fades a block up once, as it enters the viewport. Transforms are skipped under reduced motion (MotionConfig). */
export default function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
