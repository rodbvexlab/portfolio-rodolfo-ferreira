import { ease } from '../lib/motion'
import { motion } from 'framer-motion'
import rodolfoImg from '../assets/rodolfo-ferreira.jpg'
import { useLanguage } from '../context/LanguageContext'
import ScrambleText from './ScrambleText'
import { FluidParticlesBackground } from './ui/fluid-particles-background'
import { useIsTouch } from '../hooks/useMediaQuery'

export default function About() {
  const { t } = useLanguage()
  const { about } = t
  const isTouch = useIsTouch()

  return (
    <section
      id="about"
      className="relative z-10 border-t border-white/[0.05] overflow-hidden"
    >
      {/* Fluid particles — fewer on touch devices to preserve performance */}
      <FluidParticlesBackground
        particleCount={isTouch ? 400 : 1000}
        noiseIntensity={0.0018}
        particleSize={{ min: 0.3, max: 1.6 }}
        className="absolute inset-0 z-0"
      />

      {/* Vignette overlay so particles don't compete with text */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 20%, rgba(0,0,0,0.55) 100%)',
            'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)',
          ].join(', '),
        }}
      />

      {/* Content — sits above canvas + vignette */}
      <div className="relative z-10 px-6 md:px-20 py-24 md:py-32">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: ease }}
            className="md:col-span-4 flex justify-center"
          >
            <div
              className="relative w-full max-w-[300px] aspect-[4/5] rounded-3xl overflow-hidden
                border border-white/[0.08] bg-neutral-900 group
                shadow-[0_0_60px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute -inset-4 bg-cyan-400/[0.06] blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              <img
                src={rodolfoImg}
                alt="Rodolfo Ferreira"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: ease, delay: 0.1 }}
            className="md:col-span-8 space-y-7"
          >
            <div className="space-y-5">
              <ScrambleText
                text={about.label}
                className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/80 block"
                delay={100}
              />
              <h2 className="font-serif text-[34px] md:text-[40px] lg:text-[48px] text-white leading-[1.1] whitespace-pre-line max-w-[38rem]">
                {about.headline}
              </h2>
            </div>

            <div className="space-y-5 font-sans text-[16px] text-white/65 leading-relaxed max-w-[36rem]">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
