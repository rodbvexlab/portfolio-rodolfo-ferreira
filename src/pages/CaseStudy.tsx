import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ease } from '../lib/motion'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { projects } from '../data/projects'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease, delay } },
})

const sections = [
  { key: 'challenge', icon: 'search', color: 'text-amber-400/70', border: 'border-amber-400/15' },
  { key: 'solution', icon: 'build', color: 'text-cyan-400/70', border: 'border-cyan-400/15' },
  { key: 'result', icon: 'trending_up', color: 'text-green-400/70', border: 'border-green-400/15' },
] as const

const WHATSAPP_URL = 'https://wa.me/5511924796028?text=Ol%C3%A1%21%20Vi%20seus%20cases%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.'

// Unwritten case copy is stored as "[PENDENTE …]" — never render it publicly.
const isWritten = (text: string) => text.trim().length > 0 && !text.trim().startsWith('[')

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const { lang, t } = useLanguage()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    if (!project) return
    const previous = document.title
    document.title = `${project.title} — Rodolfo Ferreira`
    return () => { document.title = previous }
  }, [project])

  if (!project) return <Navigate to="/" replace />

  // Prev/next follow the grid the visitor just saw; hidden cases fall back to the full list.
  const inGrid = project.inGrid !== false
  const navList = inGrid ? projects.filter((p) => p.inGrid !== false) : projects
  const index = navList.findIndex((p) => p.slug === project.slug)
  const prevProject = navList[(index - 1 + navList.length) % navList.length]
  const nextProject = navList[(index + 1) % navList.length]
  const backHash = inGrid ? `#project-${project.slug}` : '#projects'

  const writtenSections = sections.filter(({ key }) => isWritten(project.case[key][lang]))
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&embed=screenshot.url&wait=3`

  return (
    <div className="min-h-screen bg-black text-white pt-28 md:pt-36 pb-24 px-6 md:px-20">
      <div className="max-w-[900px] mx-auto">
        {/* Back link — returns to this project's card on the home grid */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <Link
            to={{ pathname: '/', hash: backHash }}
            className="group inline-flex items-center gap-2 py-2 font-sans text-[12px] uppercase tracking-widest
              text-white/40 hover:text-white/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            {t.case.back}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial="hidden" animate="show" className="space-y-6 mb-12 md:mb-16">
          <motion.div variants={fadeUp(0.05)} className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-sans text-[10px] uppercase tracking-widest
                text-cyan-400/60 border border-cyan-400/20 px-3 py-1 rounded-full bg-cyan-400/[0.04]">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={fadeUp(0.1)}
            className="font-serif text-[44px] sm:text-[56px] md:text-[72px] leading-[1.05] text-white break-words text-balance"
          >
            {project.title}
          </motion.h1>

          <motion.p variants={fadeUp(0.15)} className="font-sans text-[16px] md:text-[17px] text-white/60 max-w-2xl leading-relaxed">
            {project.description[lang]}
          </motion.p>

          <motion.div
            variants={fadeUp(0.2)}
            className="flex flex-wrap items-center gap-x-10 gap-y-5 pt-4 border-t border-white/[0.06]"
          >
            <dl className="flex gap-10">
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/25 mb-1">{t.case.year}</dt>
                <dd className="font-sans text-[14px] text-white/70">{project.year}</dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/25 mb-1">{t.case.scope}</dt>
                <dd className="font-sans text-[14px] text-white/70">{project.tags[0]}</dd>
              </div>
            </dl>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group sm:ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                font-sans text-[11px] uppercase tracking-widest text-white/80
                border border-white/[0.12] bg-white/[0.03]
                hover:text-black hover:bg-cyan-300 hover:border-cyan-300 transition-all duration-300"
            >
              {t.case.visit}
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                arrow_outward
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Key visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: ease, delay: 0.3 }}
          className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] mb-16 md:mb-20"
        >
          <img
            src={project.poster ?? screenshotUrl}
            alt={project.title}
            className={`w-full h-full ${project.poster ? 'object-contain' : 'object-cover object-top'}`}
          />
        </motion.div>

        {/* Case sections */}
        {writtenSections.length > 0 ? (
          <div className="space-y-14 md:space-y-16">
            {writtenSections.map(({ key, icon, color, border }, i) => (
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
                    {t.case[key]}
                  </span>
                </div>
                <p className="font-sans text-[16px] text-white/70 leading-relaxed">
                  {project.case[key][lang]}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="font-sans text-[15px] text-white/50 leading-relaxed pl-6 border-l-2 border-white/10">
            {t.case.pending}
          </p>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-24 p-6 sm:p-8 md:p-10 rounded-2xl border border-white/[0.07]
            bg-[radial-gradient(ellipse_80%_120%_at_100%_0%,rgba(76,215,246,0.06),transparent_60%)]
            flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
        >
          <div className="flex-1 space-y-2">
            <h2 className="font-serif text-[28px] md:text-[32px] leading-tight text-white">{t.case.cta_title}</h2>
            <p className="font-sans text-[15px] text-white/50">{t.case.cta_body}</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-full shrink-0 whitespace-nowrap
              bg-white text-black font-sans text-[11px] sm:text-[12px] uppercase tracking-widest
              hover:bg-cyan-300 transition-colors duration-300"
          >
            {t.case.cta}
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </a>
        </motion.div>

        {/* Prev / next */}
        <nav aria-label={t.nav.projects} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { project: prevProject, label: t.case.previous, icon: 'arrow_left_alt', align: 'sm:text-left' },
            { project: nextProject, label: t.case.next, icon: 'arrow_right_alt', align: 'text-right' },
          ].map(({ project: target, label, icon, align }, i) => (
            <Link
              key={label}
              to={`/case/${target.slug}`}
              className={`group flex items-center gap-4 p-6 rounded-2xl ${i === 0 ? 'order-2 sm:order-1' : 'order-1 sm:order-2 flex-row-reverse'}
                border border-white/[0.07] bg-white/[0.02]
                hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500`}
            >
              <span className={`material-symbols-outlined text-[26px] text-white/20 group-hover:text-white/60 transition-all
                ${i === 0 ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                {icon}
              </span>
              <div className={`flex-1 min-w-0 ${align}`}>
                <span className="font-sans text-[11px] uppercase tracking-widest text-white/25 mb-1.5 block">
                  {label}
                </span>
                <span className="font-serif text-[24px] md:text-[26px] text-white/70 group-hover:text-white transition-colors block truncate">
                  {target.title}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
