export default function Navbar() {
  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center px-4 md:px-8 py-3 w-[90%] max-w-container-max mt-6 liquid-glass rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 hover:scale-[0.99]">
      {/* Logo */}
      <div className="flex items-center">
        <span className="font-serif text-xl md:text-2xl tracking-tighter text-on-surface whitespace-nowrap">
          Rodolfo Ferreira
        </span>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#services"
          className="text-primary font-bold border-b border-primary/40 pb-1 font-sans text-body-md"
        >
          Serviços
        </a>
        <a
          href="#projects"
          className="text-on-surface/70 font-sans text-body-md hover:text-primary transition-colors duration-300"
        >
          Projetos
        </a>
        <a
          href="#process"
          className="text-on-surface/70 font-sans text-body-md hover:text-primary transition-colors duration-300"
        >
          Processo
        </a>
        <a
          href="#contato"
          className="text-on-surface/70 font-sans text-body-md hover:text-primary transition-colors duration-300"
        >
          Contato
        </a>
      </div>

      {/* CTA button */}
      <a
        href="https://wa.me/5511924796028?text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 md:px-5 md:py-2 rounded-full bg-white/10 border border-white/10 text-on-surface font-sans text-[10px] md:text-label-sm uppercase tracking-widest hover:bg-white/20 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
      >
        Falar comigo
      </a>
    </nav>
  )
}

