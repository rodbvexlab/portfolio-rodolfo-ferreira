import { motion, type Variants } from 'framer-motion'

/**
 * Opening text for sections that skip a headline: a large two-tone paragraph.
 * The first sentence carries the point in full white; the rest reads as support.
 */
export default function Lede({
  lead,
  variants,
  className = '',
}: {
  lead: readonly [string, string]
  variants?: Variants
  className?: string
}) {
  const [strong, rest] = lead
  return (
    <motion.p
      variants={variants}
      className={`font-sans text-[22px] md:text-[26px] lg:text-[30px] leading-[1.35] tracking-[-0.015em] text-balance ${className}`}
    >
      <span className="text-white">{strong}</span>{' '}
      <span className="text-white/40">{rest}</span>
    </motion.p>
  )
}
