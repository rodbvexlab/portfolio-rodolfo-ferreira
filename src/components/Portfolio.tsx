import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ease } from '../lib/motion'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { projects } from '../data/projects'
import { useIsTouch, usePrefersReducedMotion } from '../hooks/useMediaQuery'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: ease } },
}

const desktopOrderClasses = {
  1: 'lg:order-1', 2: 'lg:order-2', 3: 'lg:order-3', 4: 'lg:order-4',
  5: 'lg:order-5', 6: 'lg:order-6', 7: 'lg:order-7', 8: 'lg:order-8',
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

/**
 * ProjectMedia — poster→video for the new media path (projects with a `poster`).
 * Owns everything about whether the preview is actually allowed to play:
 * viewport presence, single-active arbitration (via `isActivePreview`,
 * arbitrated by the parent Portfolio), reduced-motion/touch eligibility,
 * and graceful fallback on a decode/network error. The poster is always
 * rendered underneath and is the only thing required to understand the card.
 */
function ProjectMedia({
  project,
  isActivePreview,
}: {
  project: typeof projects[0]
  isActivePreview: boolean
}) {
  const isTouch = useIsTouch()
  const reducedMotion = usePrefersReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [hasErrored, setHasErrored] = useState(false)

  const canPreview = !isTouch && !reducedMotion && !!project.videoPreview
  // The single boolean that actually drives playback — every exit path
  // (mouseleave, blur, scroll-out, tab hidden, single-active arbitration,
  // reduced-motion, error) just needs to flip one of its inputs.
  const shouldPlay = canPreview && isActivePreview && isIntersecting && !hasErrored

  // Viewport gate — native IntersectionObserver only, no scroll listeners, no rAF.
  useEffect(() => {
    if (!canPreview) return
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [canPreview])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (shouldPlay) {
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [shouldPlay])

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Poster — the real experience. Always visible, full quality, no JS required. */}
      <img
        src={project.poster}
        alt=""
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out
          ${canPreview
            ? (shouldPlay ? 'scale-[1.02]' : 'scale-100')
            : 'scale-100 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]'}`}
      />
      {/* Preview video — crossfades in only once it can actually show a frame */}
      {canPreview && (
        <video
          ref={videoRef}
          src={project.videoPreview}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setVideoReady(true)}
          onPause={() => setVideoReady(false)}
          onError={() => setHasErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out
            ${shouldPlay && videoReady ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  )
}

function ProjectCard({
  project,
  gridSpan,
  isActivePreview,
  onActivate,
  onDeactivate,
}: {
  project: typeof projects[0]
  gridSpan?: 12 | 7 | 5
  isActivePreview: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  const { lang, t } = useLanguage()
  const isTouch = useIsTouch()
  const legacyVideoRef = useRef<HTMLVideoElement>(null)

  // Poster→video path (projects with a `poster`) skips the legacy
  // overlay/placeholder treatment. The legacy hover-video path (existing
  // projects with only `video`) keeps working as-is.
  const hasPoster = !!project.poster
  // Poster-only projects (poster, no videoPreview) have nothing to play, so
  // they must not claim the single global preview slot — hover/focus still
  // gets its visual response (CSS group-hover/focus-visible), just without
  // touching activePreviewSlug.
  const hasVideoPreview = hasPoster && !!project.videoPreview
  const spanClass =
    gridSpan === 12 ? 'lg:col-span-12' : gridSpan === 7 ? 'lg:col-span-7' : gridSpan === 5 ? 'lg:col-span-5' : ''

  const handleEnter = () => {
    if (hasVideoPreview) {
      onActivate()
    } else if (legacyVideoRef.current) {
      legacyVideoRef.current.play().catch(() => {})
    }
  }
  const handleLeave = () => {
    if (hasVideoPreview) {
      onDeactivate()
    } else if (legacyVideoRef.current) {
      legacyVideoRef.current.pause()
    }
  }

  return (
    <motion.div id={`project-${project.slug}`} variants={cardAnim} className={`scroll-mt-32 ${spanClass} ${project.desktopOrder ? desktopOrderClasses[project.desktopOrder] : ''}`}>
      <Link
        to={`/case/${project.slug}`}
        className="group block"
        onMouseEnter={!isTouch ? handleEnter : undefined}
        onMouseLeave={!isTouch ? handleLeave : undefined}
        onFocus={hasVideoPreview ? handleEnter : undefined}
        onBlur={hasVideoPreview ? handleLeave : undefined}
      >
        {/* Visual container */}
        <div
          className={`relative overflow-hidden rounded-lg bg-[#0a0a0a] border border-white/[0.05]
            transition-all duration-500 group-hover:border-white/[0.10]
            ${project.mediaAspect === '5/4' ? 'aspect-[5/4]' : gridSpan === 12
              ? 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9]'
              : project.mediaAspect === '4/5' ? 'aspect-[4/5]'
              : 'aspect-[16/10]'}`}
        >
          {hasPoster ? (
            <ProjectMedia project={project} isActivePreview={isActivePreview} />
          ) : project.video && !isTouch ? (
            <video
              ref={legacyVideoRef}
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

          {/* Gradient overlay — legacy media path only. The poster/video path
              above stays fully visible on its own; the CTA chip below already
              self-contrasts, so it needs no darkening layer behind it. */}
          {!hasPoster && (
            <>
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
            </>
          )}

          {/* "Ver case" chip — slides in on hover, and on keyboard focus too */}
          <div
            className="absolute bottom-4 right-4 flex items-center gap-2 px-3.5 py-2 rounded-full
              bg-black/70 backdrop-blur-md border border-white/10
              opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100
              translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0
              transition-all duration-400 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
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
            <h3 className="font-sans text-[21px] leading-tight tracking-[-0.025em] text-white/85
              group-hover:text-white transition-colors duration-300">
              {project.title}
            </h3>
            <span className="font-mono text-[11px] text-white/60 shrink-0">{project.year}</span>
          </div>

          {/* Secondary — description */}
          <p className="font-sans text-[13px] text-white/65 leading-relaxed max-w-lg">
            {project.description[lang]}
          </p>
        </div>

      </Link>
    </motion.div>
  )
}

export default function Portfolio() {
  const { t } = useLanguage()
  const { portfolio } = t
  // Arbitrates which single project (if any) is allowed to play its preview.
  const [activePreviewSlug, setActivePreviewSlug] = useState<string | null>(null)

  // Tab hidden → drop whatever preview is active. Coming back never
  // resumes it on its own; that requires a fresh hover/focus.
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) setActivePreviewSlug(null)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return (
    <section
      id="projects"
      aria-label={portfolio.label}
      className="relative z-10 px-6 md:px-20 pt-4 pb-20 md:pb-28 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 60% 40% at 10% 100%, rgba(76,215,246,0.04) 0%, transparent 65%), #000',
      }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)' }}
      />

      <div className="max-w-container-max mx-auto space-y-12 md:space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <h2 className="font-serif text-[36px] md:text-[48px] leading-tight tracking-[-0.02em]">{portfolio.label}</h2>
          <p className="text-[14px] text-white/65 max-w-[22rem]">{portfolio.intro}</p>
        </div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-12"
        >
          {projects
            .filter((project) => project.inGrid !== false)
            .map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                gridSpan={project.gridSpan}
                isActivePreview={activePreviewSlug === project.slug}
                onActivate={() => setActivePreviewSlug(project.slug)}
                onDeactivate={() =>
                  setActivePreviewSlug((current) => (current === project.slug ? null : current))
                }
              />
            ))}
        </motion.div>
      </div>
    </section>
  )
}
