import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import ServicesVideo from './ServicesVideo'

export default function Services() {
  const { t } = useLanguage()
  const { services } = t
  return (
    <section id="services" aria-labelledby="services-title" className="px-6 md:px-20 py-20 md:py-28 border-t border-white/10">
      <div className="max-w-container-max mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-24 lg:items-start">
        <div className="min-w-0">
          <Reveal>
            <p className="section-label mb-6">{services.label}</p>
            <h2 id="services-title" className="section-title">{services.headline}</h2>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/65">{services.body}</p>
          </Reveal>
          {/* Bleeds into the page margin (and a little into the column gap on desktop);
              its masked edges make the extra width invisible. */}
          <ServicesVideo className="services-media-layout" />
        </div>
        <dl className="border-t border-white/15">
          {services.cards.map(({ title, description }, i) => (
            <Reveal key={title} delay={i * 0.06} className="grid md:grid-cols-[1fr_1.2fr] gap-x-5 gap-y-3 py-6 md:py-8 border-b border-white/15">
              <dt className="flex gap-5 text-[20px] leading-tight text-white"><span aria-hidden="true" className="text-[12px] font-mono text-cyan-300 pt-1">{String(i + 1).padStart(2, '0')}</span>{title}</dt>
              <dd className="pl-9 md:pl-0 text-[15px] leading-relaxed text-white/65">{description}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
