import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { ease } from '../lib/motion'
import ScrambleText from './ScrambleText'
import MagneticButton from './MagneticButton'
import { useIsTouch } from '../hooks/useMediaQuery'

const SERVICES_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4'

const WHATSAPP_BASE = 'https://wa.me/5511924796028'

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

export default function Services() {
  const { t } = useLanguage()
  const { services } = t
  const { formats } = services
  const whatsappFor = (format?: string) =>
    `${WHATSAPP_BASE}?text=${encodeURIComponent(format ? `${formats.ask} ${format}.` : formats.ask_generic)}`
  const isTouch = useIsTouch()

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
        {/* Video background — desktop only (saves bandwidth on mobile) */}
        {!isTouch && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20">
              <source src={SERVICES_VIDEO_SRC} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
          </div>
        )}

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
              <motion.h2 variants={fadeUp(0.05)} className="font-serif text-[38px] md:text-[52px] lg:text-[56px] leading-[1.1] text-white max-w-lg whitespace-pre-line">
                {services.headline}
              </motion.h2>
              <motion.p variants={fadeUp(0.1)} className="font-sans text-[16px] text-white/65 max-w-md leading-relaxed">
                {services.body}
              </motion.p>
            </div>

          </motion.div>

          {/* Right: service cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {services.cards.map(({ icon, title, description }) => (
              <motion.div key={title} variants={cardAnim}>
                <div className="group p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]
                  hover:border-cyan-400/20 hover:bg-white/[0.04] transition-colors duration-500 h-full cursor-default">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08]
                    flex items-center justify-center mb-5
                    group-hover:bg-cyan-400/10 group-hover:border-cyan-400/20 transition-all duration-500">
                    <span className="material-symbols-outlined text-cyan-400 text-[18px]">{icon}</span>
                  </div>
                  <h3 className="font-serif text-[24px] text-white mb-3">{title}</h3>
                  <p className="font-sans text-[15px] text-white/65 leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Separator ── */}
      <div className="px-6 md:px-20">
        <div className="max-w-container-max mx-auto">
          <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }} />
        </div>
      </div>

      {/* ── Formats: what each engagement includes — pricing is handled in the proposal ── */}
      <div className="relative px-6 md:px-20 py-20 md:py-28">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 80% at -5% 50%, rgba(76,215,246,0.03) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-24 items-start">
          {/* Left: positioning + how a proposal is built */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="space-y-8 lg:sticky lg:top-32"
          >
            <div className="space-y-5">
              <motion.div variants={fadeUp()}>
                <ScrambleText
                  text={formats.label}
                  className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/80"
                  delay={150}
                />
              </motion.div>
              <motion.h2 variants={fadeUp(0.05)} className="font-serif text-[34px] md:text-[44px] leading-[1.1] text-white whitespace-pre-line">
                {formats.headline}
              </motion.h2>
              <motion.p variants={fadeUp(0.1)} className="font-sans text-[15px] text-white/55 leading-relaxed max-w-md">
                {formats.body}
              </motion.p>
            </div>

            <motion.ol variants={fadeUp(0.15)} className="relative max-w-md space-y-5 pl-8">
              {/* Rail */}
              <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent" />
              {formats.steps.map(({ title, description }, i) => (
                <li key={title} className="relative">
                  <span aria-hidden className={`absolute -left-8 top-1.5 w-[15px] h-[15px] rounded-full border
                    ${i === 0 ? 'border-cyan-400/60 bg-cyan-400/15' : 'border-white/15 bg-black'}`} />
                  <span className="font-sans text-[14px] text-white/85">{title}</span>
                  <span className="font-sans text-[14px] text-white/40"> — {description}</span>
                </li>
              ))}
            </motion.ol>

            <motion.div variants={fadeUp(0.2)}>
              <MagneticButton>
                <a
                  href={whatsappFor()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full
                    bg-white text-black font-sans text-[12px] uppercase tracking-widest
                    hover:bg-cyan-300 transition-colors duration-300"
                >
                  {formats.cta}
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: format index — each row opens a pre-filled conversation */}
          <div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
              className="border-t border-white/[0.06]"
            >
              {formats.items.map(({ title, fit, includes }, i) => (
                <motion.li key={title} variants={cardAnim} className="border-b border-white/[0.06]">
                  <a
                    href={whatsappFor(title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative grid grid-cols-[2.25rem_1fr_auto] md:grid-cols-[3rem_1fr_auto] gap-x-3 md:gap-x-4 py-6 md:py-7 px-3 -mx-3 rounded-xl
                      hover:bg-white/[0.025] transition-colors duration-500"
                  >
                    {/* Accent line */}
                    <span aria-hidden className="absolute left-0 top-6 bottom-6 w-px bg-cyan-400/0 group-hover:bg-cyan-400/60 transition-colors duration-500" />
                    <span className="font-mono text-[12px] text-white/25 pt-2 group-hover:text-cyan-400/70 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 space-y-2.5">
                      <h3 className="font-serif text-[24px] md:text-[28px] leading-tight text-white/85 group-hover:text-white transition-colors">
                        {title}
                      </h3>
                      <p className="font-sans text-[14px] md:text-[15px] text-white/50 leading-relaxed max-w-lg">{fit}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {includes.map((item) => (
                          <span key={item} className="font-sans text-[10px] uppercase tracking-widest text-white/40
                            border border-white/[0.08] rounded-full px-2.5 py-1
                            group-hover:border-white/[0.14] group-hover:text-white/60 transition-colors duration-500">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="material-symbols-outlined self-start pt-1.5 md:self-center md:pt-0 text-[22px] text-white/15
                      group-hover:text-cyan-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300">
                      arrow_outward
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <p className="mt-6 font-sans text-[12px] text-white/30">{formats.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
