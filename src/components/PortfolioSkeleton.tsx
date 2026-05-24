// Portfolio skeleton — no real projects. Placeholders preserved exactly as in prototype.

interface ProjectCard {
  title: string
  year: string
  tags: string[]
  icon: string
  wide?: boolean
  decoration?: React.ReactNode
}

const projects: ProjectCard[] = [
  {
    title: 'Projeto em breve',
    year: '2024',
    tags: ['Experimental', 'Design'],
    icon: 'visibility',
    decoration: (
      <div className="w-1/2 h-[1px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    ),
  },
  {
    title: 'Estudo visual',
    year: 'Em seleção',
    tags: ['Branding', 'Art'],
    icon: 'brush',
    decoration: (
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    ),
  },
  {
    title: 'Sistema interno',
    year: '2024',
    tags: ['Dashboard', 'UX'],
    icon: 'database',
    decoration: (
      <div className="grid grid-cols-3 gap-2 w-1/3 opacity-20">
        <div className="h-2 bg-white/40 rounded-full" />
        <div className="h-2 bg-white/40 rounded-full" />
        <div className="h-2 bg-white/40 rounded-full" />
      </div>
    ),
  },
  {
    title: 'Landing page',
    year: '2024',
    tags: ['Marketing', 'CRO'],
    icon: 'web',
    decoration: (
      <div className="w-full h-full flex flex-col p-8 space-y-4 opacity-5">
        <div className="h-4 w-3/4 bg-white rounded-full" />
        <div className="h-4 w-1/2 bg-white rounded-full" />
        <div className="h-32 w-full border border-white rounded-xl" />
      </div>
    ),
  },
]

function ProjectCardRegular({ project }: { project: ProjectCard }) {
  return (
    <div className="group cursor-pointer flex flex-col space-y-6">
      <div className="overflow-hidden aspect-[16/10] bg-white/[0.02] border border-white/5 rounded-2xl liquid-glass flex items-center justify-center transition-all duration-700 group-hover:border-primary/20 relative">
        {project.decoration}
        <span className="material-symbols-outlined absolute text-white/5 text-6xl group-hover:text-primary/10 transition-colors">
          {project.icon}
        </span>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="font-sans text-label-sm uppercase tracking-[0.2em] text-white">
            {project.title}
          </h3>
          <span className="font-sans text-label-sm text-white/50">{project.year}</span>
        </div>
        <div className="flex gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCardWide() {
  return (
    <div className="group cursor-pointer flex flex-col space-y-6 md:col-span-2">
      <div className="overflow-hidden aspect-[16/10] md:aspect-[21/9] bg-white/[0.02] border border-white/5 rounded-2xl liquid-glass flex items-center justify-center transition-all duration-700 group-hover:border-primary/20 relative">
        <div className="relative">
          <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <span className="material-symbols-outlined text-white/5 text-8xl group-hover:text-primary/10 transition-colors">
            psychology
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="font-sans text-label-sm uppercase tracking-[0.2em] text-white">
            Automação com IA
          </h3>
          <span className="font-sans text-label-sm text-white/50">Em desenvolvimento</span>
        </div>
        <div className="flex gap-3">
          {['AI Solution', 'Automation'].map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioSkeleton() {
  return (
    <section
      id="projects"
      className="relative z-10 px-[24px] md:px-[80px] py-24 md:py-32 bg-black pb-48"
    >
      <div className="max-w-container-max mx-auto space-y-24">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-3">
            <span className="block text-white/50 font-sans text-label-sm uppercase tracking-[0.2em]">
              PROJETOS SELECIONADOS
            </span>
          </div>
          <div className="md:col-span-9 space-y-8">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-white max-w-4xl leading-tight font-light">
              Alguns projetos criados para unir design, tecnologia, clareza operacional e resultado
              real para negócios.
            </h2>
            <div className="text-white/50 font-sans text-label-sm uppercase tracking-[0.2em]">
              ● DISPONÍVEL PARA NOVOS PROJETOS
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[32px] gap-y-16 md:gap-y-24 mt-16">
          {projects.map((project) => (
            <ProjectCardRegular key={project.title} project={project} />
          ))}
          <ProjectCardWide />
        </div>
      </div>
    </section>
  )
}
