interface ProjectCard {
  title: string
  year: string
  tags: string[]
  icon: string
  link: string
}

const projects: ProjectCard[] = [
  {
    title: 'Plataforma ASME',
    year: '2024',
    tags: ['Sistemas', 'Cloud Run', 'UX'],
    icon: 'database',
    link: 'https://asme-714655608194.us-east1.run.app',
  },
  {
    title: 'Bonitos Car',
    year: '2024',
    tags: ['Web Design', 'Landing Page', 'SEO'],
    icon: 'directions_car',
    link: 'https://www.bonitoscar.com.br/',
  },
  {
    title: 'Être Creative',
    year: '2024',
    tags: ['Design', 'Branding', 'Web'],
    icon: 'brush',
    link: 'https://www.etrecreative.com.br/',
  },
  {
    title: 'Aetheria',
    year: '2024',
    tags: ['Web Design', '3D / Art', 'Creative'],
    icon: 'auto_awesome',
    link: 'https://aetheria-3d3l.vercel.app/',
  },
]

function ProjectCardRegular({ project }: { project: ProjectCard }) {
  // Microlink screenshot URL with wait=3 to allow dynamic React SPA content to fully render
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&embed=screenshot.url&wait=3`

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer flex flex-col space-y-6"
    >
      <div className="overflow-hidden aspect-[16/10] bg-white/[0.02] border border-white/5 rounded-2xl liquid-glass flex items-center justify-center transition-all duration-700 group-hover:border-primary/20 relative">
        {/* Screenshot Image */}
        <img
          src={screenshotUrl}
          alt={`Preview de ${project.title}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-40 group-hover:opacity-85 transition-all duration-700 ease-out group-hover:scale-105"
        />
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
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
    </a>
  )
}

function ProjectCardWide() {
  const crmLink = "https://crm-criativos.vercel.app/login"
  // Microlink screenshot URL with wait=3 to allow dynamic React SPA content to fully render
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(crmLink)}&screenshot=true&embed=screenshot.url&wait=3`

  return (
    <a
      href={crmLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer flex flex-col space-y-6 md:col-span-2"
    >
      <div className="overflow-hidden aspect-[16/10] md:aspect-[21/9] bg-white/[0.02] border border-white/5 rounded-2xl liquid-glass flex items-center justify-center transition-all duration-700 group-hover:border-primary/20 relative">
        {/* Screenshot Image */}
        <img
          src={screenshotUrl}
          alt="Preview de CRM Criativos"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-40 group-hover:opacity-85 transition-all duration-700 ease-out group-hover:scale-[1.02]"
        />
        {/* Glow backlight on hover */}
        <div className="absolute -inset-8 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="font-sans text-label-sm uppercase tracking-[0.2em] text-white">
            CRM Criativos
          </h3>
          <span className="font-sans text-label-sm text-white/50">2024</span>
        </div>
        <div className="flex gap-3">
          {['CRM', 'Next.js', 'Dashboard'].map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
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
