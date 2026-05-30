import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ease } from '../lib/motion'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { projects } from '../data/projects'
import ScrambleText from './ScrambleText'
import { useIsTouch } from '../hooks/useMediaQuery'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: ease } },
}

/** Elegant placeholder for projects without a video */
function VideoPlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#080808]">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full bg-cyan-400/[0.04] blur-[60px]" />
      </div>
      <span className="font-serif text-[13px] text-white/15 tracking-widest uppercase relative z-10">
        {title}
      </span>
    </div>
  )
}

function ProjectCard({ project, wide = false }: { project: typeof projects[0]; wide?: boolean }) {
  const { lang, t } = useLanguage()
  const isTouch = useIsTouch()
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {})
  }
  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.pause()
  }

  return (
    <motion.div variants={cardAnim} className={wide ? 'md:col-span-2' : ''}>
      <Link
        to={`/case/${project.slug}`}
        className="group block"
        onMouseEnter={!isTouch ? handleMouseEnter : undefined}
        onMouseLeave={!isTouch ? handleMouseLeave : undefined}
      >
        {/* Visual container */}
        <div
          className={`relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/[0.05]
            transition-all duration-500 group-hover:border-white/[0.10]
            ${wide ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}
        >
          {/* Video: desktop hover-play only. Mobile: always show placeholder (no bandwidth waste) */}
          {project.video && !isTouch ? (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="none"       /* Don't preload — loads only on mouseEnter */
              className="absolute inset-0 w-full h-full object-cover opacity-40
                group-hover:opacity-85 transition-opacity duration-700 ease-out"
            />
          ) : (
            <VideoPlaceholder title={project.title} />
          )}

          {/* Gradient overlay — thins on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
              opacity: 1,
            }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
            }}
          />

          {/* "Ver case" chip — slides in on hover */}
          <div
            className="absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-2 rounded-full
              bg-black/70 backdrop-blur-md border border-white/10
              opacity-0 group-hover:opacity-100
              translate-y-2 group-hover:translate-y-0
              transition-all duration-400"
          >
            <span className="font-sans text-[11px] uppercase tracking-widest text-white/80">
              {t.portfolio.view_case}
            </span>
            <span className="material-symbols-outlined text-[14px] text-cyan-400">arrow_right_alt</span>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5 space-y-2">
          {/* Primary — project name dominates */}
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-serif text-[22px] leading-tight text-white/85
              group-hover:text-white transition-colors duration-300">
              {project.title}
            </h3>
            <span className="font-mono text-[11px] text-white/25 shrink-0">{project.year}</span>
          </div>

          {/* Secondary — description */}
          <p className="font-sans text-[13px] text-white/50 leading-snug max-w-xs">
            {project.description[lang]}
          </p>
        </div>

        {/* Tags — tertiary */}
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[10px] uppercase tracking-widest
                text-white/30 border border-white/[0.08] px-2.5 py-1 rounded-full
                group-hover:border-white/[0.14] group-hover:text-white/45
                transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  )
}

export default function Portfolio() {
  const { t } = useLanguage()
  const { portfolio } = t

  return (
    <section
      id="projects"
      className="relative z-10 px-6 md:px-20 py-24 md:py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 60% 40% at 10% 100%, rgba(76,215,246,0.04) 0%, transparent 65%), #000',
      }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)' }}
      />

      <div className="max-w-container-max mx-auto space-y-20">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          <motion.div variants={cardAnim} className="md:col-span-3">
            <ScrambleText
              text={portfolio.label}
              className="text-[11px] uppercase tracking-[0.2em] text-white/30"
              delay={100}
            />
          </motion.div>
          <motion.div variants={cardAnim} className="md:col-span-9 space-y-5">
            <h2 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] text-white leading-tight font-light">
              {portfolio.headline}
            </h2>
            <div className="flex items-center gap-2 text-white/30 font-sans text-[11px] uppercase tracking-[0.2em]">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
              {portfolio.available}
            </div>
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-y-20"
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} wide={project.wide} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
