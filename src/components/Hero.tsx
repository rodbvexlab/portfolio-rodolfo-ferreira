import { forwardRef } from 'react'

const Hero = forwardRef<HTMLElement>((_, ref) => {
  return (
    <main
      ref={ref}
      id="hero-section"
      className="flex-grow flex flex-col items-center justify-center relative px-[24px] md:px-[80px] py-32 min-h-screen"
      style={{ opacity: 1, position: 'relative', zIndex: 10 }}
    >
      <div className="text-center max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        {/* Status chip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 liquid-glass rounded-full text-primary font-sans text-label-sm uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Disponível para novos projetos
        </div>

        {/* Headline */}
        <h1 className="font-serif text-display-lg-mobile md:text-display-lg text-on-surface">
          Web Design, Sistemas e IA{' '}
          <br className="hidden md:block" />
          para negócios reais.
        </h1>

        {/* Body copy */}
        <p className="font-sans text-body-lg text-on-surface-variant max-w-2xl">
          Crio sites, landing pages, sistemas internos e soluções digitais com foco em clareza,
          usabilidade e resultado real para empresas, profissionais e marcas.
        </p>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
          <a
            href="https://wa.me/5511924796028?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full px-8 py-4 flex items-center gap-3 text-on-surface hover:text-primary transition-all duration-300 group"
          >
            <span className="font-sans text-label-sm uppercase tracking-widest">
              Falar sobre um projeto
            </span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </a>
          <a
            href="#services"
            className="text-on-surface-variant font-sans text-label-sm uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            Ver serviços
          </a>
        </div>

        {/* Service strip */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {[
            { icon: 'design_services', label: 'Web Design' },
            { icon: 'terminal', label: 'Sistemas Internos' },
            { icon: 'psychology', label: 'IA Aplicada' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="liquid-glass rounded-full px-5 py-3 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>
              <span className="font-sans text-label-sm text-on-surface">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom transition gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[420px] pointer-events-none z-[6] bg-gradient-to-b from-transparent to-black" />
    </main>
  )
})

Hero.displayName = 'Hero'

export default Hero
