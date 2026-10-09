import { Fragment, forwardRef, useRef, lazy, Suspense } from 'react'
import { ease } from '../lib/motion'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import MagneticButton from './MagneticButton'
import { useIsTouch, usePrefersReducedMotion } from '../hooks/useMediaQuery'

// Lazy-load Three.js — only on non-touch devices (saves 136KB on mobile)
const DottedSurface = lazy(() =>
  import('./ui/dotted-surface').then((m) => ({ default: m.DottedSurface }))
)

// ── Cyan bloom / lens-flare layers ──────────────────────────────────
// Four concentric layers of light + a thin horizontal flare streak.
// All opacities are deliberately low so the effect reads as "ambient"
// rather than decorative — a cinematographer would call it "motivated light."
function CyanBloom({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>

      {/* Layer 1 — wide, diffused bloom from slightly above center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 55% at 50% 38%, rgba(76,215,246,0.055) 0%, rgba(76,215,246,0.015) 45%, transparent 70%)',
        }}
      />

      {/* Layer 2 — tighter focused glow, the "source" of the light */}
      <div
        className="absolute"
        style={{
          top: '18%', left: '50%',
          transform: 'translate(-50%, 0)',
          width: '520px', height: '380px',
          background:
            'radial-gradient(ellipse at center, rgba(76,215,246,0.09) 0%, rgba(76,215,246,0.03) 45%, transparent 75%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Layer 3 — hot core: small, bright, heavily blurred */}
      <motion.div
        className="absolute"
        style={{
          top: '22%', left: '50%',
          transform: 'translate(-50%, 0)',
          width: '180px', height: '120px',
          background: 'radial-gradient(circle, rgba(180,240,255,0.18) 0%, transparent 70%)',
          filter: 'blur(18px)',
        }}
        {...(!reduced && {
          animate: { opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] },
          transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        })}
      />

      {/* Layer 4 — very subtle bloom on the bottom half (light bouncing back) */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '50%',
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(76,215,246,0.025) 0%, transparent 70%)',
        }}
      />

      {/* Horizontal flare streak — ultra-thin, fades to edges */}
      <div
        className="absolute inset-x-0"
        style={{
          top: '28%',
          height: '1px',
          background:
            'linear-gradient(to right, transparent 0%, rgba(76,215,246,0.04) 20%, rgba(180,240,255,0.10) 50%, rgba(76,215,246,0.04) 80%, transparent 100%)',
        }}
      />

      {/* Secondary micro-streak slightly offset */}
      <div
        className="absolute inset-x-0"
        style={{
          top: 'calc(28% + 3px)',
          height: '1px',
          background:
            'linear-gradient(to right, transparent 10%, rgba(76,215,246,0.025) 35%, rgba(76,215,246,0.05) 50%, rgba(76,215,246,0.025) 65%, transparent 90%)',
        }}
      />
    </div>
  )
}

// A var() inside an unsupported value would resolve to `unset` instead of falling
// back to the vw classes, so the container-unit size is only applied when supported.
const SUPPORTS_CQI = typeof CSS !== 'undefined' && CSS.supports('font-size', '1cqi')

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const word = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: ease } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: ease, delay: d } }),
}

/** A small project outline, without simulated business metrics. */
function TechMockup({ m }: { m: ReturnType<typeof useLanguage>['t']['hero']['mockup'] }) {
  const rows = [
    { label: m.label1, value: m.val1 },
    { label: m.label2, value: m.val2 },
    { label: m.label3, value: m.val3 },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.8 }}
      className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-black/70 p-6 md:p-7"
    >
      <div className="flex items-center gap-3 pb-5 border-b border-white/10">
        <span aria-hidden="true" className="material-symbols-outlined text-cyan-300/70 text-[20px]">code</span>
        <span className="font-mono text-[14px] text-white/80">{m.filename}</span>
      </div>
      <p className="font-mono text-[12px] text-white/55 mt-5 mb-6">{m.comment1}</p>
      <dl className="space-y-5">
        {rows.map(({ label, value }) => (
          <div key={label} className="space-y-1">
            <dt className="font-mono text-[12px] text-cyan-300/70">{label}</dt>
            <dd className="font-sans text-[15px] text-white/80">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 font-mono text-[12px] text-white/55">
        <span aria-hidden className="relative flex w-1.5 h-1.5">
          <span className="absolute inset-0 rounded-full bg-emerald-400/60 animate-ping" />
          <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </span>
        {m.status}
      </p>
    </motion.div>
  )
}

const Hero = forwardRef<HTMLElement>((_, _ref) => {
  const { t } = useLanguage()
  const { hero } = t
  const isTouch = useIsTouch()
  const reducedMotion = usePrefersReducedMotion()

  // ── Scroll-based fade for the dots background ──────────────────────
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const dotsOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const dotsY = useTransform(scrollYProgress, [0, 1], ['0%', reducedMotion ? '0%' : '-18%'])

  return (
    <main
      ref={(node) => {
        // Satisfy both the forwarded ref and our internal scroll ref
        sectionRef.current = node
        if (typeof _ref === 'function') _ref(node)
        else if (_ref) _ref.current = node
      }}
      id="hero-section"
      className="relative flex-grow flex items-center justify-center min-h-screen px-6 md:px-20 overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* ── Background: Three.js on desktop, CSS grid on mobile ── */}
      {isTouch ? (
        /* Mobile: lightweight CSS dot grid — zero JS/GPU cost */
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: 'radial-gradient(rgba(76,215,246,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden
        />
      ) : (
        /* Desktop: Three.js animated wave, fades + parallax on scroll */
        <motion.div
          style={{ opacity: dotsOpacity, y: dotsY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <Suspense fallback={null}>
            <DottedSurface />
          </Suspense>
        </motion.div>
      )}

      {/* ── Cyan bloom / lens flare — sits above dots, below vignette ── */}
      <CyanBloom reduced={reducedMotion} />

      {/* Radial vignette — darkens edges so dots & bloom stay contained */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.60) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-container-max mx-auto pt-32 pb-16 lg:pt-32 lg:pb-20 [container-type:inline-size]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 font-sans text-[10px] sm:text-[11px] md:text-[12px] uppercase leading-relaxed tracking-[0.14em] sm:tracking-[0.16em] text-cyan-300/80 mb-4 md:mb-6"
        >
          <span aria-hidden className="hidden sm:block h-px w-8 bg-cyan-300/50" />
          {hero.label}
        </motion.p>

        {/* Headline — a single line fitted to the content width, so the thesis
            reads like a masthead. --fit is the rendered width of "From design to
            code" (the wider locale) in em, plus ~2% slack: ~6.4em on mobile, where
            spacing stays near normal so small sizes don't cramp, and ~6.07em from
            md up, where display-size tracking and word spacing are tightened.
            The vw classes are a fallback for browsers without container units. */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-serif text-[12.5vw] md:text-[11vw] leading-[0.95] text-white [font-kerning:normal]
            tracking-[-0.02em] md:tracking-[-0.03em] md:[word-spacing:-0.04em] [--fit:6.6] md:[--fit:6.2]"
          style={SUPPORTS_CQI ? { fontSize: 'calc(100cqi / var(--fit))' } : undefined}
        >
          {hero.headline.map((line, li) => (
            // Padding keeps accents (ó) and descenders (g) clear of the reveal mask
            <span key={li} className="block overflow-hidden py-[0.2em] -my-[0.2em]">
              {line.split(' ').map((w, wi) => (
                <Fragment key={wi}>
                  {/* Real space keeps the heading readable for screen readers and crawlers */}
                  {wi > 0 && ' '}
                  <motion.span variants={word} className="inline-block">
                    {w}
                  </motion.span>
                </Fragment>
              ))}
            </span>
          ))}
        </motion.h1>

        <div className="mt-10 md:mt-12 lg:grid lg:grid-cols-[minmax(0,34rem)_340px] lg:justify-between lg:items-start lg:gap-16">
          {/* Left: introduction and actions */}
          <div className="flex flex-col items-start gap-8">
            {/* Body */}
            <motion.p
              custom={0.9}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="font-sans text-[17px] md:text-[18px] leading-[1.6] text-white/65 max-w-[34rem]"
            >
              {hero.body}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={1.05}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <MagneticButton>
                <a
                  href="#projects"
                  className="group flex items-center gap-3 px-7 py-3.5 rounded-full
                    bg-white text-black font-sans text-[12px] uppercase tracking-widest
                    hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  {hero.cta_primary}
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_right_alt
                  </span>
                </a>
              </MagneticButton>
              <a
                href="#contato"
                className="py-2 font-sans text-[12px] uppercase tracking-widest text-white/70
                  underline decoration-white/20 underline-offset-[6px]
                  hover:text-white hover:decoration-cyan-300/60 transition-colors"
              >
                {hero.cta_secondary}
              </a>
            </motion.div>

            {/* Proof points — concrete working terms instead of vanity metrics */}
            <motion.ul
              custom={1.2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2.5 sm:pt-6 sm:border-t border-white/[0.07] w-full"
            >
              {hero.proof.map((item) => (
                <li key={item} className="flex items-center gap-2 font-sans text-[13px] text-white/45">
                  <span aria-hidden className="material-symbols-outlined text-[15px] text-cyan-300/60">check</span>
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* Mobile: project outline after the introduction */}
            <motion.div
              custom={1.4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="lg:hidden w-full mt-4"
            >
              <TechMockup m={hero.mockup} />
            </motion.div>
          </div>

          {/* Desktop: tech mockup in grid column */}
          <div className="hidden lg:flex relative justify-end">
            <TechMockup m={hero.mockup} />
          </div>
        </div>
      </div>

      {/* Bottom fade into next section — sits above dots, below content */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-[5]"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.85) 60%, #000 100%)' }}
      />
    </main>
  )
})

Hero.displayName = 'Hero'
export default Hero
