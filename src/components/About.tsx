import rodolfoImg from '../assets/rodolfo-ferreira.jpg'

export default function About() {
  return (
    <section id="about" className="relative z-10 px-[24px] md:px-[80px] py-24 md:py-32 bg-black">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
        {/* Left Column: Elegant Photo Card */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-[32px] overflow-hidden liquid-glass border border-white/10 p-3 group shadow-[0_0_50px_rgba(255,255,255,0.02)] hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all duration-700">
            {/* Ambient backlight blur */}
            <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* The Image container */}
            <div className="w-full h-full rounded-[24px] overflow-hidden relative bg-neutral-900 border border-white/5">
              <img
                src={rodolfoImg}
                alt="Rodolfo Ferreira"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />
              {/* Subtle glass overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Column: Text & Content */}
        <div className="md:col-span-7 space-y-8 text-left">
          <div className="space-y-4">
            <span className="block text-primary font-sans text-label-sm uppercase tracking-[0.2em]">
              Sobre mim
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">
              Webdesign, sistemas e IA aplicados a problemas reais.
            </h2>
          </div>

          <p className="font-sans text-body-lg text-on-surface-variant/90 leading-relaxed max-w-2xl">
            Sou Rodolfo Ferreira, webdesigner, desenvolvedor e profissional de tecnologia. Crio
            experiências digitais que unem estética, clareza e função: sites que apresentam
            melhor uma marca, sistemas que organizam processos e automações que reduzem trabalho
            manual.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 pt-4">
            {[
              'Web Design',
              'Sistemas Web',
              'IA Aplicada',
              'Automação e Processos',
            ].map((tag) => (
              <span
                key={tag}
                className="font-sans text-label-sm text-on-surface/80 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full hover:border-primary/30 hover:bg-white/[0.05] transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
