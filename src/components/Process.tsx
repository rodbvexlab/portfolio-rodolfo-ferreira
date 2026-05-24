const PROCESS_VIDEO_HLS = 'https://cdn.dribbble.com/userupload/11094311/file/original-84df46d0803a71c3972ee3ec8938744f.mp4'
const PROCESS_VIDEO_MP4 =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4'

const steps = [
  {
    num: '01',
    title: 'Diagnóstico',
    description: 'Mergulho no problema, análise de mercado e definição clara de objetivos reais.',
  },
  {
    num: '02',
    title: 'Estrutura',
    description: 'Organização da informação, fluxos de usuário e wireframes funcionais.',
  },
  {
    num: '03',
    title: 'Design',
    description: 'Interface de alto impacto, tipografia refinada e uma estética que comunica valor.',
  },
  {
    num: '04',
    title: 'Desenvolvimento',
    description: 'Transformação do design em código limpo, rápido e focado em performance.',
  },
  {
    num: '05',
    title: 'Entrega e evolução',
    description: 'Lançamento, ajustes baseados no uso real e acompanhamento contínuo.',
  },
]

export default function Process() {
  return (
    <section
      id="process"
      className="relative z-10 px-[24px] md:px-[80px] py-24 md:py-48 bg-black overflow-hidden"
    >
      {/* Video background */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ opacity: 0.9 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          id="processVideo"
          ref={(el) => {
            if (el) el.playbackRate = 0.5
          }}
        >
          <source src={PROCESS_VIDEO_HLS} type="video/mp4" />
          <source src={PROCESS_VIDEO_MP4} type="video/mp4" />
        </video>
        {/* Subtle darkening so text stays readable */}
        <div className="absolute inset-0 bg-black/50" />
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

      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <div className="space-y-6 mb-24 relative z-20">
          <span className="block text-primary font-sans text-label-sm uppercase tracking-[0.2em]">
            Processo
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white max-w-3xl">
            Um fluxo claro para transformar ideias em soluções digitais bem pensadas, funcionais e
            bonitas.
          </h2>
        </div>

        {/* Steps container */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Decorative SVG connector (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 z-0 pointer-events-none">
            <svg
              className="w-full h-24 overflow-visible"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 50 Q 125 50 250 50 Q 375 50 500 50 Q 625 50 750 50 Q 875 50 1000 50"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
              <path
                d="M 0 50 Q 125 50 250 50"
                fill="none"
                stroke="#4cd7f6"
                strokeWidth="1.5"
                className="opacity-40 drop-shadow-[0_0_8px_rgba(76,215,246,0.2)]"
              />
              <path
                d="M 500 50 Q 625 50 750 50"
                fill="none"
                stroke="#4cd7f6"
                strokeWidth="1.5"
                className="opacity-30 drop-shadow-[0_0_8px_rgba(76,215,246,0.2)]"
              />
            </svg>
          </div>

          {/* Step cards */}
          {steps.map(({ num, title, description }) => (
            <div key={num} className="relative z-10 group">
              <div className="liquid-glass bg-white/[0.05] backdrop-blur-xl p-6 lg:p-8 rounded-3xl h-full border border-white/10 hover:border-primary/30 transition-all duration-500">
                <div className="font-serif text-4xl mb-6 text-primary/60">{num}</div>
                <h3 className="font-serif text-xl text-white mb-4">{title}</h3>
                <p className="font-sans text-on-surface-variant/70 text-sm leading-relaxed">
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
