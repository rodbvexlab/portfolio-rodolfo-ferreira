import { ease } from '../lib/motion'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import ScrambleText from './ScrambleText'
import { useIsTouch } from '../hooks/useMediaQuery'

const PROCESS_VIDEO_HLS = 'https://cdn.dribbble.com/userupload/11094311/file/original-84df46d0803a71c3972ee3ec8938744f.mp4'
const PROCESS_VIDEO_MP4 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease } },
}

export default function Process() {
  const { t } = useLanguage()
  const { process } = t
  const isTouch = useIsTouch()

  return (
    <section id="process" className="relative z-10 px-6 md:px-20 py-24 md:py-40 bg-black overflow-hidden">
      {/* Video background — desktop only */}
      {!isTouch && (
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
      )}

      {/* Mobile: subtle gradient instead of video */}
      {isTouch && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(76,215,246,0.04) 0%, transparent 70%)',
          }}
        />
      )}

      <div className="relative z-10 max-w-container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: ease }}
          className="space-y-4 mb-14 md:mb-20"
        >
          <ScrambleText
            text={process.label}
            className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/80 block"
            delay={100}
          />
          <h2 className="font-serif text-[30px] md:text-[52px] text-white max-w-3xl leading-tight">
            {process.headline}
          </h2>
        </motion.div>

        {/* Steps — 2-col on mobile, 5-col on desktop */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {process.steps.map(({ num, title, description }, i) => (
            <motion.div
              key={num}
              variants={item}
              className={`group relative p-5 md:p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]
                hover:border-cyan-400/20 hover:bg-white/[0.03] transition-colors duration-300 cursor-default
                ${i === 4 ? 'col-span-2 md:col-span-1' : ''}` /* Last step full-width on mobile 2-col */
              }
            >
              {/* Desktop connector */}
              {i < process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-5 h-px bg-white/[0.06] z-0" />
              )}
              <div className="font-serif text-[32px] md:text-[40px] text-cyan-400/25 mb-4 leading-none">
                {num}
              </div>
              <h3 className="font-serif text-[17px] md:text-[20px] text-white mb-2">{title}</h3>
              <p className="font-sans text-[12px] md:text-[13px] text-white/40 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
