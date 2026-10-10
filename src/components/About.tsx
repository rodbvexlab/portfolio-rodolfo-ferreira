import { useLanguage } from '../context/LanguageContext'
import portrait from '../assets/rodolfo-ferreira.jpg'
import Reveal from './Reveal'

export default function About() {
  const { t } = useLanguage()
  const { about } = t
  return (
    <section id="about" aria-labelledby="about-title" className="px-6 md:px-20 py-20 md:py-28 border-t border-white/10 bg-[#080808]">
      <div className="max-w-container-max mx-auto grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 md:gap-20 items-center">
        <Reveal><img src={portrait} alt="Rodolfo Ferreira" loading="lazy" decoding="async" className="w-full max-w-[360px] aspect-[4/5] object-cover rounded-lg grayscale" /></Reveal>
        <Reveal delay={0.08}>
          <p className="section-label mb-6">{about.label}</p>
          <h2 id="about-title" className="section-title">{about.headline}</h2>
          <div className="mt-6 space-y-5 max-w-xl text-[17px] leading-relaxed text-white/70">
            {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="mt-8 pt-6 border-t border-white/15 max-w-xl text-[14px] leading-relaxed text-white/65">{about.working}</p>
        </Reveal>
      </div>
    </section>
  )
}
