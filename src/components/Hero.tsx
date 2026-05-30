import { forwardRef, useRef, lazy, Suspense } from 'react'
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

const iconMap: Record<string, string> = {
  'Web Design': 'design_services',
  'Sistemas Internos': 'terminal',
  'Internal Systems': 'terminal',
  'IA Aplicada': 'psychology',
  'Applied AI': 'psychology',
}

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

/* Animated metrics mockup card */
function TechMockup({ m }: { m: ReturnType<typeof useLanguage>['t']['hero']['mockup'] }) {
  const metrics = [
    { label: m.label1, val: m.val1, color: '#4cd7f6' },
    { label: m.label2, val: m.val2, color: '#a3e635' },
    { label: m.label3, val: m.val3, color: '#f59e0b' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, ease: ease, delay: 1 }}
      className="w-full lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[340px] select-none"
      style={{ willChange: 'transform' }}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-cyan-400/5 blur-3xl rounded-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-3 font-mono text-[11px] text-white/30">{m.filename}</span>
        </div>

        {/* Code body */}
        <div className="px-5 py-5 font-mono text-[12px] leading-7 space-y-1">
          <div className="text-white/20">{m.comment1}</div>
          <div className="text-white/40">const metrics = {'{'}</div>
          {metrics.map(({ label, val, color }, i) => (
            <motion.div
              key={label}
              className="pl-4 flex items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + i * 0.15, duration: 0.5, ease: 'easeOut' }}
            >
              <span className="text-white/30">{label}:</span>
              <motion.span
                style={{ color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 + i * 0.15 }}
                className="font-semibold"
              >
                "{val}"
              </motion.span>
            </motion.div>
          ))}
          <div className="text-white/40">{'}'}</div>
        </div>

        {/* Status bar */}
        <div className="px-5 py-3 border-t border-white/[0.06] bg-white/[0.02] flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-green-400"
          />
          <span className="font-mono text-[10px] text-white/30">{m.status}</span>
        </div>
      </div>
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
      <div className="relative z-10 w-full max-w-container-max mx-auto lg:grid lg:grid-cols-[1fr_380px] lg:gap-12 lg:items-center">
        {/* Left: text */}
        <div className="flex flex-col items-start gap-8 pt-28 lg:py-0">
          {/* Status chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
              border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-sm"
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            />
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">
              {hero.available}
            </span>
          </motion.div>

          {/* Headline — staggered words */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-serif text-[52px] md:text-[72px] lg:text-[80px] leading-[1.0] tracking-tight text-white"
          >
            {hero.headline.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                {line.split(' ').map((w, wi) => (
                  <motion.span key={wi} variants={word} className="inline-block mr-[0.25em]">
                    {w}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Body */}
          <motion.p
            custom={0.9}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-sans text-[17px] text-white/60 max-w-lg leading-relaxed"
          >
            {hero.body}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={1.05}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-2"
          >
            <MagneticButton>
              <a
                href="https://wa.me/5511924796028?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
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
              href="#services"
              className="font-sans text-[12px] uppercase tracking-widest text-white/40
                hover:text-white/80 transition-colors border-b border-white/10 hover:border-white/30 pb-0.5"
            >
              {hero.cta_secondary}
            </a>
          </motion.div>

          {/* Service pills */}
          <motion.div
            custom={1.2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3 mt-4"
          >
            {hero.pills.map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                  border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-cyan-400 text-[15px]">
                  {iconMap[label] ?? 'star'}
                </span>
                <span className="font-sans text-[11px] text-white/60 tracking-wide">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Mobile: tech mockup inline below pills */}
          <motion.div
            custom={1.4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="lg:hidden w-full mt-2 pb-10"
          >
            <TechMockup m={hero.mockup} />
          </motion.div>
        </div>

        {/* Desktop: tech mockup in grid column */}
        <div className="hidden lg:block relative h-full">
          <TechMockup m={hero.mockup} />
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
