import { ease } from '../lib/motion'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import ScrambleText from './ScrambleText'

const PROCESS_VIDEO_HLS = 'https://cdn.dribbble.com/userupload/11094311/file/original-84df46d0803a71c3972ee3ec8938744f.mp4'
const PROCESS_VIDEO_MP4 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease } },
}

export default function Process() {
  const { t } = useLanguage()
  const { process } = t

  return (
    <section id="process" className="relative z-10 px-6 md:px-20 py-24 md:py-40 bg-black overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-20"
          ref={(el) => { if (el) el.playbackRate = 0.5 }}
        >
          <source src={PROCESS_VIDEO_HLS} type="video/mp4" />
          <source src={PROCESS_VIDEO_MP4} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: ease }}
          className="space-y-5 mb-20"
        >
          <ScrambleText
            text={process.label}
            className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/80 block"
            delay={100}
          />
          <h2 className="font-serif text-[36px] md:text-[52px] text-white max-w-3xl leading-tight">
            {process.headline}
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {process.steps.map(({ num, title, description }, i) => (
            <motion.div
              key={num}
              variants={item}
              className="group relative p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]
                hover:border-cyan-400/20 hover:bg-white/[0.04] transition-all duration-500 cursor-default"
            >
              {/* Connector line (desktop only) */}
              {i < process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-5 h-px bg-white/[0.06] z-0" />
              )}

              <div className="font-serif text-[40px] text-cyan-400/25 mb-5 leading-none group-hover:text-cyan-400/40 transition-colors">
                {num}
              </div>
              <h3 className="font-serif text-[20px] text-white mb-3">{title}</h3>
              <p className="font-sans text-[13px] text-white/40 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
