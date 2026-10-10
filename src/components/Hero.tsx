import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t
  return (
    <section id="hero-section" aria-labelledby="hero-title" className="portfolio-hero relative px-6 md:px-20 overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative max-w-container-max mx-auto pt-36 pb-16 md:pt-48 md:pb-20">
        <p className="section-label mb-8 md:mb-10">{hero.label}</p>
        <h1 id="hero-title" className="font-sans font-normal text-[clamp(2.6rem,6.4vw,6.5rem)] leading-[1.04] tracking-[-0.055em] max-w-[1100px]">
          {hero.headline.map((line) => <span key={line} className="block">{line}</span>)}
        </h1>
        <div className="mt-9 md:mt-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
          <p className="text-[17px] md:text-[19px] leading-relaxed text-white/70 max-w-[35rem]">{hero.body}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 shrink-0">
            <a href="#projects" className="primary-link">{hero.cta_primary}<span aria-hidden="true">↗</span></a>
            <a href="#contato" className="text-[14px] text-white/80 hover:text-cyan-300 transition-colors py-3">{hero.cta_secondary}</a>
          </div>
        </div>
        <div className="mt-14 md:mt-20 pt-5 border-t border-white/15 flex items-center justify-between gap-4 text-[12px] text-white/60">
          <span>{hero.note}</span>
          <a href="#projects" aria-label={hero.cta_primary} className="px-3 py-2 hover:text-white transition-colors"><span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}
