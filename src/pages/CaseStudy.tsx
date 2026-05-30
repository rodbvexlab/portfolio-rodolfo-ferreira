import { useParams, Link, Navigate } from 'react-router-dom'
import { ease } from '../lib/motion'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { projects } from '../data/projects'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease, delay } },
})

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const { lang, t } = useLanguage()
  const project = projects.find((p) => p.slug === slug)
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  if (!project) return <Navigate to="/" replace />

  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&embed=screenshot.url&wait=3`

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-20">
      <div className="max-w-[900px] mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-widest
              text-white/30 hover:text-white/70 transition-colors mb-14"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            {t.case.back}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          className="space-y-6 mb-16"
        >
          <motion.div variants={fadeUp(0.05)} className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-sans text-[10px] uppercase tracking-widest
                text-cyan-400/60 border border-cyan-400/20 px-3 py-1 rounded-full bg-cyan-400/[0.04]">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1 variants={fadeUp(0.1)} className="font-serif text-[52px] md:text-[72px] leading-tight text-white">
            {project.title}
          </motion.h1>

          <motion.p variants={fadeUp(0.15)} className="font-sans text-[17px] text-white/50 max-w-2xl leading-relaxed">
            {project.description[lang]}
          </motion.p>

          <motion.div variants={fadeUp(0.2)}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-widest
                text-white/60 hover:text-cyan-300 transition-colors border-b border-white/10 hover:border-cyan-400/30 pb-0.5"
            >
              {t.case.visit}
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Screenshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: ease, delay: 0.3 }}
          className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] mb-20"
        >
          <img
            src={screenshotUrl}
            alt={`Screenshot ${project.title}`}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Case sections */}
        <div className="space-y-16">
          {(
            [
              { key: 'challenge', icon: 'search', color: 'text-amber-400/70', border: 'border-amber-400/15' },
              { key: 'solution', icon: 'build', color: 'text-cyan-400/70', border: 'border-cyan-400/15' },
              { key: 'result', icon: 'trending_up', color: 'text-green-400/70', border: 'border-green-400/15' },
            ] as const
          ).map(({ key, icon, color, border }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: ease, delay: i * 0.05 }}
              className={`pl-6 border-l-2 ${border}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`material-symbols-outlined text-[18px] ${color}`}>{icon}</span>
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/30">
                  {t.case[key as keyof typeof t.case]}
                </span>
              </div>
              <p className="font-sans text-[16px] text-white/65 leading-relaxed">
                {project.case[key as keyof typeof project.case][lang]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-20 border-t border-white/[0.06]" />

        {/* Next project */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to={`/case/${nextProject.slug}`}
            className="group flex items-center justify-between p-6 rounded-2xl
              border border-white/[0.07] bg-white/[0.02]
              hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500"
          >
            <div>
              <span className="font-sans text-[11px] uppercase tracking-widest text-white/25 mb-2 block">
                {t.case.next}
              </span>
              <span className="font-serif text-[28px] text-white/70 group-hover:text-white transition-colors">
                {nextProject.title}
              </span>
            </div>
            <span className="material-symbols-outlined text-[28px] text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
              arrow_right_alt
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
