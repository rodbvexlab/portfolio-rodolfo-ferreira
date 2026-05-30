import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { ease } from '../lib/motion'
import ScrambleText from './ScrambleText'
import MagneticButton from './MagneticButton'

const SERVICES_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease, delay } },
})

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease } },
}

/** Subtle 3D tilt on mouse move — the expensive-feeling hover */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${y * -7}deg) rotateY(${x * 7}deg) translateZ(4px)`
    el.style.transition = 'transform 0.1s ease-out'
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

export default function Services() {
  const { t } = useLanguage()
  const { services } = t

  return (
    <section id="services" className="relative z-10 overflow-hidden" style={{
      background: 'radial-gradient(ellipse 70% 50% at 85% 0%, rgba(76,215,246,0.05) 0%, transparent 65%), #000',
    }}>
      {/* Thin separator line with fade */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 60%, transparent)' }}
      />

      {/* ── Service cards block ── */}
      <div className="relative px-6 md:px-20 py-28 md:py-36">
        {/* Video background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20">
            <source src={SERVICES_VIDEO_SRC} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-10"
          >
            <div className="space-y-5">
              <motion.div variants={fadeUp()}>
                <ScrambleText
                  text={services.label}
                  className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/80"
                  delay={200}
                />
              </motion.div>
              <motion.h2 variants={fadeUp(0.05)} className="font-serif text-[38px] md:text-[52px] lg:text-[56px] leading-[1.05] text-white max-w-lg">
                {services.headline}
              </motion.h2>
              <motion.p variants={fadeUp(0.1)} className="font-sans text-[16px] text-white/50 max-w-md leading-relaxed">
                {services.body}
              </motion.p>
            </div>

            {/* Vertical timeline nav */}
            <motion.div variants={stagger} className="relative flex flex-col gap-6 pl-5 border-l border-white/[0.08]">
              {services.nav.map((item, i) => (
                <motion.div key={item} variants={cardAnim} className="relative flex items-center">
                  <div className={`absolute -left-[21px] w-2 h-2 rounded-full transition-colors duration-500 ${i === 0 ? 'bg-cyan-400 shadow-[0_0_8px_rgba(76,215,246,0.6)]' : 'bg-white/15'}`} />
                  <span className={`font-sans text-[12px] uppercase tracking-widest ${i === 0 ? 'text-white' : 'text-white/40'}`}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: service cards with 3D tilt */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {services.cards.map(({ icon, title, description }) => (
              <motion.div key={title} variants={cardAnim}>
                <TiltCard className="group p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]
                  hover:border-cyan-400/20 hover:bg-white/[0.04] transition-colors duration-500 h-full cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08]
                    flex items-center justify-center mb-5
                    group-hover:bg-cyan-400/10 group-hover:border-cyan-400/20 transition-all duration-500">
                    <span className="material-symbols-outlined text-cyan-400 text-[18px]">{icon}</span>
                  </div>
                  <h3 className="font-serif text-[22px] text-white mb-3">{title}</h3>
                  <p className="font-sans text-[14px] text-white/45 leading-relaxed">{description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Pricing separator ── */}
      <div className="px-6 md:px-20">
        <div className="max-w-container-max mx-auto">
          <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }} />
        </div>
      </div>

      {/* ── Investment / Pricing block ── */}
      <div className="relative px-6 md:px-20 py-20 md:py-28">
        {/* Subtle light from left for pricing section */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 80% at -5% 50%, rgba(76,215,246,0.03) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-container-max mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start"
          >
            {/* Left */}
            <div className="space-y-5">
              <motion.div variants={fadeUp()}>
                <ScrambleText
                  text={services.pricing.label}
                  className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/80"
                  delay={150}
                />
              </motion.div>
              <motion.h2 variants={fadeUp(0.05)} className="font-serif text-[32px] md:text-[42px] leading-tight text-white">
                {services.pricing.headline}
              </motion.h2>
              <motion.p variants={fadeUp(0.1)} className="font-sans text-[13px] text-white/30 leading-relaxed max-w-xs">
                {services.pricing.note}
              </motion.p>
              <motion.div variants={fadeUp(0.15)}>
                <MagneticButton>
                  <a
                    href="https://wa.me/5511924796028?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-full
                      border border-white/10 bg-white/[0.03]
                      font-sans text-[12px] uppercase tracking-widest text-white/60
                      hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-300
                      transition-all duration-300"
                  >
                    {services.pricing.cta}
                    <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                  </a>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right: pricing table */}
            <motion.div variants={stagger} className="flex flex-col divide-y divide-white/[0.05]">
              {services.pricing.items.map(({ service, range }, i) => {
                const isConsult = range.toLowerCase().includes('consult') || range.toLowerCase().includes('consultar')
                return (
                  <motion.div
                    key={service}
                    variants={cardAnim}
                    custom={i}
                    className="group flex items-center justify-between py-5
                      hover:bg-white/[0.02] transition-colors duration-300 px-4 -mx-4 rounded-xl cursor-default"
                  >
                    <span className="font-sans text-[15px] text-white/60 group-hover:text-white/85 transition-colors">
                      {service}
                    </span>
                    <span className={`font-mono text-[13px] tracking-tight transition-colors ${isConsult ? 'text-white/25 italic' : 'text-cyan-400/70 group-hover:text-cyan-300'}`}>
                      {range}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
