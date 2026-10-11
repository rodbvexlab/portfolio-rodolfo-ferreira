import { useCallback, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { createScrollScrub, stickyProgress } from '../lib/scrollScrub'
import AboutPortrait from './AboutPortrait'

/**
 * Local progress windows for each line: [enter from, enter to, leave from, leave to].
 * Moment 1 (headline and intro) reads first; moment 2 (experience and the
 * closing line) follows and holds until the stage releases.
 */
type Window = [number, number, number, number]
const MOMENT_1: Window[] = [
  [-1, 0, 0.33, 0.41], // label + "Sou o Rodolfo." — already in place when the stage pins
  [0.03, 0.1, 0.33, 0.41],
  [0.08, 0.15, 0.34, 0.42],
]
const MOMENT_2: Window[] = [
  [0.44, 0.51, 0.9, 0.97],
  [0.49, 0.56, 0.9, 0.97],
  [0.54, 0.61, 0.91, 0.98],
]
/** The face stays dotted through moment 1 and is in full colour once moment 2 is in. */
const REVEAL: [number, number] = [0.36, 0.62]

const segment = (p: number, start: number, end: number) => Math.min(1, Math.max(0, (p - start) / (end - start)))
const smooth = (t: number) => t * t * (3 - 2 * t)

/**
 * "Sobre": a dark pause where the presentation reveals the face. The copy
 * stays in semantic order and fully in the DOM; the portrait is decorative.
 * With reduced motion the section is a static composition: the photo in
 * colour plus all of the copy, no scroll needed.
 */
export default function About() {
  const { t } = useLanguage()
  const { about } = t
  const isStatic = usePrefersReducedMotion()

  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const moment1Ref = useRef<HTMLDivElement>(null)
  const moment2Ref = useRef<HTMLDivElement>(null)

  // Read by the portrait on scroll: the same progress that drives the copy.
  const reveal = useCallback(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return 0
    const range = Math.max(1, track.offsetHeight - stage.offsetHeight)
    return smooth(segment(-track.getBoundingClientRect().top / range, REVEAL[0], REVEAL[1]))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const moment1 = moment1Ref.current
    const moment2 = moment2Ref.current
    if (!track || !stage || !moment1 || !moment2) return

    const parts1 = [...moment1.querySelectorAll<HTMLElement>('[data-part]')]
    const parts2 = [...moment2.querySelectorAll<HTMLElement>('[data-part]')]
    if (isStatic) {
      ;[...parts1, ...parts2].forEach((el) => el.removeAttribute('style'))
      return
    }

    const place = (parts: HTMLElement[], windows: Window[], p: number) => {
      parts.forEach((el, i) => {
        const [a, b, c, d] = windows[Math.min(i, windows.length - 1)]
        const enter = a < 0 ? 1 : segment(p, a, b)
        const leave = segment(p, c, d)
        el.style.opacity = (enter * (1 - leave)).toFixed(3)
        el.style.transform = `translate3d(0, ${((1 - enter) * 14 - leave * 12).toFixed(2)}px, 0)`
      })
    }

    // The scrub controller without a video: progress only, in rAF, while in view.
    const scrub = createScrollScrub({
      target: track,
      progress: stickyProgress(track, stage),
      observe: [track, stage],
      fps: 24,
      onProgress: (p) => {
        place(parts1, MOMENT_1, p)
        place(parts2, MOMENT_2, p)
      },
    })
    return () => scrub.destroy()
  }, [isStatic])

  return (
    <section aria-labelledby="about-title" className="about-section" data-mode={isStatic ? 'static' : 'scrub'}>
      <div id="about" ref={trackRef} className="about-track">
        <div ref={stageRef} className="about-stage">
          <div className="about-media">
            <AboutPortrait reveal={reveal} />
          </div>

          <div className="about-copy">
            <div ref={moment1Ref} className="about-moment about-moment--1">
              <div data-part>
                <p className="about-label">{about.label}</p>
                <h2 id="about-title" className="about-title">{about.headline}</h2>
              </div>
              {about.intro.map((line, i) => <p key={i} data-part className="about-line">{line}</p>)}
            </div>
            <div ref={moment2Ref} className="about-moment about-moment--2">
              {about.experience.map((line, i) => <p key={i} data-part className="about-line">{line}</p>)}
              <p data-part className="about-closing">{about.working}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
