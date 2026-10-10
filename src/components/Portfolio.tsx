import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { ease } from '../lib/motion'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { projects, type Project } from '../data/projects'
import { useIsMobile, useIsTouch, usePrefersReducedMotion } from '../hooks/useMediaQuery'

// Each card reveals on its own as it enters the viewport.
const cardReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
}
// The image settles inside its frame while the card fades in.
const mediaReveal = {
  hidden: { scale: 1.06 },
  show: { scale: 1, transition: { duration: 1.4, ease } },
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
 * ProjectMedia — poster first, preview video on demand.
 * The poster is always rendered and is all a card needs. The <video> element
 * (and its download) only exists once the card has been activated; after
 * that it stays mounted, paused, so a second hover doesn't refetch.
 * Playback stops whenever the card stops being the active preview: pointer or
 * focus leaves, another card starts, the tab hides, or the card scrolls away.
 */
function ProjectMedia({
  project,
  active,
  onDeactivate,
  onFail,
}: {
  project: Project
  active: boolean
  onDeactivate: () => void
  onFail: () => void
}) {
  const isTouch = useIsTouch()
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)

  const src = isTouch || isMobile ? project.videoPreviewMobile ?? project.videoPreview : project.videoPreview

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active) {
      video.play().catch((error: DOMException) => {
        // Blocked (e.g. low-power mode): give the control back to the visitor.
        if (error.name === 'NotAllowedError') onDeactivate()
      })
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [active, onDeactivate])

  // Scrolling the active card out of view ends its preview. Only a visible →
  // hidden transition counts: keyboard focus may activate a card that the
  // browser is still smooth-scrolling into view.
  useEffect(() => {
    const el = containerRef.current
    if (!active || !el) return
    let seen = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) seen = true
        else if (seen) onDeactivate()
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [active, onDeactivate])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <motion.div variants={mediaReveal} className="absolute inset-0">
        <img
          src={project.poster}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out
            ${active ? 'scale-[1.02]' : 'scale-100 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]'}`}
        />
        {src && (active || started) && (
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden="true"
            onPlaying={() => { setStarted(true); setPlaying(true) }}
            onPause={() => setPlaying(false)}
            onError={onFail}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out
              ${active && playing ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </motion.div>
    </div>
  )
}

function PreviewIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="w-3.5 h-3.5 fill-current"><path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" /></svg>
  ) : (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="w-3.5 h-3.5 fill-current"><path d="M4.5 2.2v11.6L13.6 8z" /></svg>
  )
}

function ProjectCard({
  project,
  gridSpan,
  active,
  setActiveSlug,
}: {
  project: Project
  gridSpan?: 12 | 7 | 5
  active: boolean
  setActiveSlug: Dispatch<SetStateAction<string | null>>
}) {
  const { slug } = project
  const onActivate = useCallback(() => setActiveSlug(slug), [setActiveSlug, slug])
  const onDeactivate = useCallback(
    () => setActiveSlug((current) => (current === slug ? null : current)),
    [setActiveSlug, slug],
  )
  const { lang, t } = useLanguage()
  const isTouch = useIsTouch()
  const reducedMotion = usePrefersReducedMotion()
  const legacyVideoRef = useRef<HTMLVideoElement>(null)
  const [previewFailed, setPreviewFailed] = useState(false)

  // Poster→preview path (projects with a `poster`). Projects with only a
  // full-length `video` keep the legacy hover treatment below.
  const hasPoster = !!project.poster
  const hasPreview = hasPoster && !!project.videoPreview && !previewFailed
  // Touch screens and reduced-motion visitors start previews with an explicit
  // control; everyone else gets them on hover and keyboard focus.
  const tapToPlay = hasPreview && (isTouch || reducedMotion)
  const hoverToPlay = hasPreview && !tapToPlay
  const spanClass =
    gridSpan === 12 ? 'lg:col-span-12' : gridSpan === 7 ? 'lg:col-span-7' : gridSpan === 5 ? 'lg:col-span-5' : ''

  const handleEnter = () => {
    if (hoverToPlay) onActivate()
    else if (!hasPoster) legacyVideoRef.current?.play().catch(() => {})
  }
  const handleLeave = () => {
    if (hoverToPlay) onDeactivate()
    else if (!hasPoster) legacyVideoRef.current?.pause()
  }
  const handleFail = () => {
    setPreviewFailed(true)
    onDeactivate()
  }

  return (
    <motion.div
      id={`project-${project.slug}`}
      variants={cardReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`relative scroll-mt-32 ${spanClass} ${project.desktopOrder ? desktopOrderClasses[project.desktopOrder] : ''}`}
    >
      <Link
        to={`/case/${project.slug}`}
        className="group block"
        onMouseEnter={!isTouch ? handleEnter : undefined}
        onMouseLeave={!isTouch ? handleLeave : undefined}
        onFocus={hoverToPlay ? onActivate : undefined}
        onBlur={hoverToPlay ? onDeactivate : undefined}
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
            <ProjectMedia project={project} active={hasPreview && active} onDeactivate={onDeactivate} onFail={handleFail} />
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

      {/* Sibling of the link (never nested in it): starts/stops the preview without opening the case. */}
      {tapToPlay && (
        <button
          type="button"
          onClick={active ? onDeactivate : onActivate}
          aria-label={`${active ? t.portfolio.pause_preview : t.portfolio.play_preview}: ${project.title}`}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-11 h-11 rounded-full
            bg-black/65 border border-white/15 text-white hover:border-cyan-300/60 hover:text-cyan-300 transition-colors"
        >
          <PreviewIcon playing={active} />
        </button>
      )}
    </motion.div>
  )
}

export default function Portfolio() {
  const { t } = useLanguage()
  const { portfolio } = t
  // Arbitrates which single project (if any) is allowed to play its preview.
  const [activePreviewSlug, setActivePreviewSlug] = useState<string | null>(null)

  // Tab hidden → drop whatever preview is active. Coming back never
  // resumes it on its own; that requires a fresh hover/focus/tap.
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
      aria-labelledby="projects-title"
      className="projects-section relative z-10 px-6 md:px-20 pt-10 md:pt-14 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="max-w-container-max mx-auto space-y-12 md:space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5"
        >
          <h2 id="projects-title" className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">{portfolio.label}</h2>
          <p className="text-[14px] text-white/70 max-w-[22rem] md:pb-2">{portfolio.intro}</p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-12">
          {projects
            .filter((project) => project.inGrid !== false)
            .map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                gridSpan={project.gridSpan}
                active={activePreviewSlug === project.slug}
                setActiveSlug={setActivePreviewSlug}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
