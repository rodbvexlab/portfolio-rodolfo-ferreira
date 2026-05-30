export interface CaseStudy {
  challenge: { pt: string; en: string }
  solution: { pt: string; en: string }
  result: { pt: string; en: string }
}

export interface Project {
  slug: string
  title: string
  year: string
  tags: string[]
  link: string
  video?: string          // path relative to /public — e.g. "/video/bonitos-car.mp4"
  wide?: boolean
  description: { pt: string; en: string }
  case: CaseStudy
}

export const projects: Project[] = [
  {
    slug: 'bonitos-car',
    title: 'Bonitos Car',
    year: '2025',
    tags: ['Web Design', 'Landing Page', 'SEO'],
    link: 'https://www.bonitoscar.com.br/',
    video: '/video/bonitos-car.mp4',
    description: {
      pt: 'Site institucional para revendedora de veículos, com estética premium e foco em conversão de leads qualificados.',
      en: 'Institutional website for a car dealership, with a premium aesthetic and focus on qualified lead conversion.',
    },
    case: {
      challenge: {
        pt: 'A Bonitos Car não tinha presença digital própria e dependia de marketplaces para geração de leads, pagando comissões altas e perdendo o controle sobre a experiência do cliente.',
        en: 'Bonitos Car had no owned digital presence and relied on marketplaces for leads, paying high commissions and losing control over the customer experience.',
      },
      solution: {
        pt: 'Criação de site institucional com identidade visual refinada, galeria de veículos, integração com WhatsApp para contato direto, SEO on-page e estrutura de landing page pensada para conversão.',
        en: 'Institutional website with refined visual identity, vehicle gallery, WhatsApp integration for direct contact, on-page SEO, and a landing page structure built for conversion.',
      },
      result: {
        pt: 'Canal próprio de captação de leads, redução de dependência dos marketplaces e melhora significativa na percepção de profissionalismo da marca junto aos clientes.',
        en: 'Owned lead generation channel, reduced dependency on marketplaces, and a significant improvement in brand professionalism perception among clients.',
      },
    },
  },
  {
    slug: 'etre-creative',
    title: 'Être Creative',
    year: '2025',
    tags: ['Design', 'Branding', 'Web'],
    link: 'https://www.etrecreative.com.br/',
    video: '/video/etre-creative.mp4',
    description: {
      pt: 'Site institucional para estúdio criativo, com linguagem editorial e identidade visual sofisticada alinhada ao posicionamento premium da marca.',
      en: 'Institutional website for a creative studio, with an editorial tone and sophisticated visual identity aligned with the brand\'s premium positioning.',
    },
    case: {
      challenge: {
        pt: 'O estúdio tinha um portfólio forte mas um site genérico que não refletia o nível criativo do trabalho, dificultando a atração de clientes no segmento premium.',
        en: 'The studio had a strong portfolio but a generic website that didn\'t reflect the creative level of their work, making it harder to attract premium-segment clients.',
      },
      solution: {
        pt: 'Redesign completo com direção editorial, tipografia expressiva, grid assimétrico e animações refinadas que traduzem o DNA criativo da marca.',
        en: 'Complete redesign with editorial direction, expressive typography, asymmetric grid, and refined animations that translate the brand\'s creative DNA.',
      },
      result: {
        pt: 'Site reconhecido pela equipe e clientes como verdadeiramente representativo do nível do estúdio, com aumento direto na qualidade dos projetos recebidos via contato digital.',
        en: 'Website recognized by the team and clients as truly representative of the studio\'s level, with a direct increase in the quality of projects received via digital contact.',
      },
    },
  },
  {
    slug: 'barbearia-marques',
    title: 'Barbearia Marques',
    year: '2025',
    tags: ['Web Design', 'Landing Page', 'Branding'],
    link: '#',
    video: '/video/barbearia-marques.mp4',
    description: {
      pt: 'Landing page premium para barbearia, com identidade visual forte, agendamento integrado e foco em experiência do cliente.',
      en: 'Premium landing page for a barbershop, with a strong visual identity, integrated booking, and a focus on client experience.',
    },
    case: {
      challenge: {
        pt: 'A barbearia atendia por indicação mas não tinha presença digital que refletisse o padrão do serviço. Clientes novos não encontravam a marca online e o processo de agendamento era feito por mensagem manual.',
        en: 'The barbershop relied on referrals but lacked a digital presence that reflected its service quality. New clients couldn\'t find the brand online and bookings were handled manually via messages.',
      },
      solution: {
        pt: 'Landing page com identidade visual premium, galeria de trabalhos, seção de serviços e preços, e integração de agendamento. Design que comunica exclusividade sem perder a acessibilidade.',
        en: 'Premium landing page with strong visual identity, work gallery, services and pricing section, and booking integration. Design that communicates exclusivity without losing accessibility.',
      },
      result: {
        pt: 'Presença digital que eleva a percepção de valor da marca, reduz atrito no processo de agendamento e atrai novos clientes alinhados ao posicionamento premium do espaço.',
        en: 'Digital presence that elevates the brand\'s perceived value, reduces friction in the booking process, and attracts new clients aligned with the space\'s premium positioning.',
      },
    },
  },
  {
    slug: 'aetheria',
    title: 'Aetheria',
    year: '2025',
    tags: ['Web Design', '3D / Art', 'Creative'],
    link: 'https://aetheria-3d3l.vercel.app/',
    video: '/video/aetheria.mp4',
    wide: true,
    description: {
      pt: 'Projeto criativo experimental unindo web design, arte 3D e experiências digitais imersivas.',
      en: 'Experimental creative project combining web design, 3D art, and immersive digital experiences.',
    },
    case: {
      challenge: {
        pt: 'Criar uma experiência digital que vai além do convencional, explorando o limite entre arte, tecnologia e web — funcionando como showcase de capacidades técnicas e criativas.',
        en: 'Create a digital experience that goes beyond the conventional, exploring the boundary between art, technology, and the web — as a showcase of technical and creative capabilities.',
      },
      solution: {
        pt: 'Desenvolvimento de um ambiente web imersivo com elementos 3D, animações cinematográficas, interações baseadas em scroll e uma estética que mistura o orgânico com o tecnológico.',
        en: 'Development of an immersive web environment with 3D elements, cinematic animations, scroll-based interactions, and an aesthetic that blends the organic with the technological.',
      },
      result: {
        pt: 'Projeto que demonstra a capacidade de criar experiências digitais de alto impacto, servindo como referência para apresentação de capacidades criativas e técnicas a novos clientes.',
        en: 'A project that demonstrates the ability to create high-impact digital experiences, serving as a reference for presenting creative and technical capabilities to new clients.',
      },
    },
  },
  {
    slug: 'plataforma-asme',
    title: 'Plataforma ASME',
    year: '2024',
    tags: ['Sistema', 'Cloud Run', 'UX'],
    link: 'https://asme-714655608194.us-east1.run.app',
    description: {
      pt: 'Sistema de gestão operacional para associação, com painel administrativo, controle de membros e relatórios em tempo real.',
      en: 'Operational management system for an association, featuring an admin panel, member control, and real-time reports.',
    },
    case: {
      challenge: {
        pt: 'A ASME gerenciava associados e documentos via planilhas e e-mails, gerando retrabalho, erros de dados e dificuldade de acompanhamento em tempo real pela diretoria.',
        en: 'ASME managed members and documents through spreadsheets and emails, leading to rework, data errors, and difficulty for leadership to track operations in real time.',
      },
      solution: {
        pt: 'Plataforma web full-stack com autenticação de roles, painel administrativo responsivo, módulo de membros com histórico, e relatórios exportáveis. Deploy via Google Cloud Run.',
        en: 'Full-stack web platform with role-based authentication, responsive admin panel, member management with history, and exportable reports. Deployed on Google Cloud Run.',
      },
      result: {
        pt: 'Eliminação total de planilhas manuais. Tempo de geração de relatórios reduzido de 4 horas para menos de 2 minutos.',
        en: 'Complete elimination of manual spreadsheets. Report generation time reduced from 4 hours to under 2 minutes.',
      },
    },
  },
  {
    slug: 'crm-criativos',
    title: 'CRM Criativos',
    year: '2024',
    tags: ['CRM', 'Next.js', 'Dashboard'],
    link: 'https://crm-criativos.vercel.app/login',
    description: {
      pt: 'Sistema CRM completo para agências e profissionais criativos, com gestão de clientes, projetos, pipeline e métricas em tempo real.',
      en: 'Complete CRM system for agencies and creative professionals, with client management, project tracking, pipeline, and real-time metrics.',
    },
    case: {
      challenge: {
        pt: 'Agências criativas usavam ferramentas genéricas que não refletiam o fluxo de trabalho criativo, causando desorganização de pipeline, perda de follow-ups e dificuldade de visualizar receita.',
        en: 'Creative agencies used generic tools that didn\'t reflect the creative workflow, causing pipeline disorganization, missed follow-ups, and difficulty visualizing revenue.',
      },
      solution: {
        pt: 'CRM web completo em Next.js com pipeline Kanban customizável, histórico de comunicações por cliente, dashboard de métricas e módulo financeiro — UX pensada para o fluxo criativo.',
        en: 'Full web CRM built in Next.js with customizable Kanban pipeline, per-client communication history, metrics dashboard, and financial module — UX designed for the creative workflow.',
      },
      result: {
        pt: 'Substituição de 4 ferramentas por uma plataforma. Visibilidade total do pipeline em tempo real. Redução de ~3h semanais de trabalho administrativo por usuário.',
        en: 'Replacement of 4 tools with one platform. Full real-time pipeline visibility. Reduction of ~3 weekly hours of administrative work per user.',
      },
    },
  },
]
