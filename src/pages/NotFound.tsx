import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { ease } from '../lib/motion'

export default function NotFound() {
  const { lang } = useLanguage()

  const copy = {
    pt: {
      code: '404',
      headline: 'Página não encontrada.',
      body: 'Esse endereço não existe — mas tudo que foi construído está aqui.',
      cta: 'Voltar ao início',
      alt: 'Ver projetos',
    },
    en: {
      code: '404',
      headline: 'Page not found.',
      body: "That address doesn't exist — but everything that was built is right here.",
      cta: 'Back to home',
      alt: 'View projects',
    },
  }[lang]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(76,215,246,0.05) 0%, transparent 65%)',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(76,215,246,0.1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: ease }}
        className="relative z-10 text-center space-y-8 max-w-lg"
      >
        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: ease, delay: 0.1 }}
          className="relative"
        >
          <span
            className="font-serif text-[140px] md:text-[180px] leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(76,215,246,0.15) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {copy.code}
          </span>
          {/* Flare streak through the number */}
          <div
            className="absolute inset-x-0 pointer-events-none"
            style={{
              top: '52%',
              height: '1px',
              background:
                'linear-gradient(to right, transparent, rgba(76,215,246,0.08) 25%, rgba(180,240,255,0.18) 50%, rgba(76,215,246,0.08) 75%, transparent)',
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease, delay: 0.35 }}
          className="space-y-3"
        >
          <h1 className="font-serif text-[28px] md:text-[36px] text-white leading-tight">
            {copy.headline}
          </h1>
          <p className="font-sans text-[15px] text-white/55 leading-relaxed">
            {copy.body}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ease, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-7 py-3.5 rounded-full
              bg-white text-black font-sans text-[12px] uppercase tracking-widest
              hover:bg-cyan-300 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            {copy.cta}
          </Link>
          <Link
            to="/#projects"
            className="font-sans text-[12px] uppercase tracking-widest text-white/45
              hover:text-white/80 transition-colors border-b border-white/10 hover:border-white/30 pb-0.5"
          >
            {copy.alt}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
