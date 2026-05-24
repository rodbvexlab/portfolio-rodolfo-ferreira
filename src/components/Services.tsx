const SERVICES_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4'

const serviceCards = [
  {
    icon: 'dashboard',
    title: 'Web Design',
    description:
      'Sites institucionais e landing pages com estética premium, navegação clara e estrutura pensada para conversão.',
  },
  {
    icon: 'database',
    title: 'Sistemas Internos',
    description:
      'Ferramentas sob medida para organizar processos, reduzir retrabalho e dar mais controle à operação.',
  },
  {
    icon: 'psychology',
    title: 'IA Aplicada',
    description:
      'Uso estratégico de inteligência artificial para acelerar rotinas, criar fluxos inteligentes e melhorar produtividade.',
  },
  {
    icon: 'bolt',
    title: 'Automação',
    description:
      'Integrações, dashboards e soluções práticas para transformar tarefas manuais em fluxos eficientes.',
  },
]

const navItems = ['Web Design', 'Sistemas', 'IA Aplicada', 'Automação']

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 px-[24px] md:px-[80px] py-24 md:py-32 bg-black md:pt-36"
    >
      {/* Video background */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ opacity: 0.8 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src={SERVICES_VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Darkening layer */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Top fade: black → transparent */}
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 100%)' }}
        />
        {/* Bottom fade: transparent → black */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 relative z-10">
        {/* Left column */}
        <div className="space-y-12 flex flex-col">
          <div className="space-y-6">
            <span className="block text-primary font-sans text-label-sm uppercase tracking-[0.2em]">
              Serviços
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-white max-w-lg">
              Soluções digitais para negócios que precisam sair do improviso.
            </h2>
            <p className="font-sans text-lg text-on-surface-variant/70 max-w-md">
              Crio sites, sistemas e automações com foco em clareza, usabilidade e resultado real —
              unindo design, tecnologia e visão prática de operação.
            </p>
          </div>

          {/* Vertical timeline nav */}
          <div className="relative flex flex-col gap-8 pl-6 border-l border-white/10">
            {navItems.map((item, i) => (
              <div key={item} className="relative flex items-center">
                <div
                  className={`absolute -left-[29px] w-2 h-2 rounded-full ${
                    i === 0 ? 'bg-primary' : 'bg-white/20'
                  }`}
                />
                <span
                  className={`font-sans text-label-sm uppercase tracking-widest ${
                    i === 0 ? 'text-on-surface' : 'text-on-surface-variant/60'
                  }`}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {serviceCards.map(({ icon, title, description }) => (
            <div
              key={title}
              className="liquid-glass p-8 space-y-6 rounded-3xl hover:border-primary/30 transition-all duration-500 group border border-white/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-primary">{icon}</span>
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl text-on-surface">{title}</h3>
                <p className="font-sans text-body-md text-on-surface-variant/70 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
