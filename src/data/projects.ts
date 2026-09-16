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
  video?: string          // legacy hover-video field — consumed by the current ProjectCard when there's no `poster`
  wide?: boolean          // legacy flagship flag, superseded by `gridSpan` — no longer consumed by Portfolio.tsx
  inGrid?: boolean        // false hides the project from the Portfolio grid while keeping its /case/:slug route. Omitted = true.
  gridSpan?: 12 | 7 | 5   // desktop (lg:) bento column span out of 12. Omitted = default 1-col mobile / balanced 2-col tablet.
  desktopOrder?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  mediaAspect?: '21/9' | '4/3' | '4/5' | '5/4'  // desktop aspect for non-flagship (gridSpan !== 12) poster cards
  poster?: string         // key-visual image, desktop — path relative to /public
  posterMobile?: string   // optional mobile-specific poster/crop
  videoPreview?: string   // preview video, desktop — path relative to /public
  videoPreviewMobile?: string  // optional mobile-specific preview cut
  description: { pt: string; en: string }
  case: CaseStudy
}

export const projects: Project[] = [
  // Array order is the mobile reading order; desktopOrder preserves the bento pairs.
  {
    slug: 'origens',
    desktopOrder: 1,
    title: 'Ori.gens',
    year: '2026',
    tags: ['Web Design', 'Branding', 'Editorial'],
    link: 'https://origens-six.vercel.app/',
    inGrid: true,
    gridSpan: 12,
    mediaAspect: '21/9',
    poster: '/portfolio/origens/origens-transicao-urbana.webp',
    videoPreview: '/portfolio/origens/hero-desktop.mp4',
    videoPreviewMobile: '/portfolio/origens/hero-mobile.mp4',
    description: {
      pt: 'Site institucional para clínica de psicoterapia, com direção editorial cinematográfica e identidade visual própria.',
      en: 'Institutional website for a psychotherapy practice, with cinematic editorial direction and a dedicated visual identity.',
    },
    case: {
      challenge: { pt: '[PENDENTE — case study ainda não escrito]', en: '[PENDING — case study copy not written yet]' },
      solution: { pt: '[PENDENTE — case study ainda não escrito]', en: '[PENDING — case study copy not written yet]' },
      result: { pt: '[PENDENTE — case study ainda não escrito]', en: '[PENDING — case study copy not written yet]' },
    },
  },
  {
    slug: 'bonitos-car',
    desktopOrder: 2,
    title: 'Bonitos Car',
    year: '2025',
    tags: ['Web Design', 'Automotivo', 'Institucional'],
    link: 'https://www.bonitoscar.com.br/',
    video: '/video/bonitos-car.mp4', // preserved for a future videoPreview — not wired yet
    inGrid: true,
    gridSpan: 7,
    poster: '/portfolio/bonitos/poster-editorial.webp',
    description: {
      pt: 'Site institucional para funilaria e pintura automotiva, com jornadas separadas para veículos leves e pesados e foco em orçamento.',
      en: 'Institutional website for an auto body and paint shop, with separate journeys for light and heavy vehicles and a focus on quote requests.',
    },
    case: {
      challenge: {
        pt: 'Apresentar os serviços de funilaria e pintura da Bonitos Car para dois públicos: proprietários de veículos leves e responsáveis por caminhões e frotas. A navegação precisava distinguir essas necessidades e conduzir à solicitação de orçamento.',
        en: 'Present the auto body and paint services of Bonitos Car to two audiences: light vehicle owners and those responsible for trucks and fleets. Navigation needed to distinguish their needs and guide visitors to a quote request.',
      },
      solution: {
        pt: 'Site institucional com páginas próprias para leves e pesados, apresentação dos serviços e formulário de orçamento. A solicitação reúne categoria do veículo, contato e descrição do serviço em uma mensagem enviada pelo WhatsApp.',
        en: 'An institutional website with dedicated pages for light and heavy vehicles, service information, and a quote form. Requests collect the vehicle category, contact details, and service description into a message sent through WhatsApp.',
      },
      result: {
        pt: 'Uma presença digital que organiza as duas frentes de atendimento e oferece um caminho direto entre a consulta aos serviços e o pedido de avaliação.',
        en: 'A digital presence that organizes both service areas and offers a direct path from exploring services to requesting an assessment.',
      },
    },
  },
  {
    slug: 'plataforma-asme',
    desktopOrder: 4,
    title: 'ASME',
    year: '2024',
    tags: ['Web Design', 'Portfólio', 'Experiência'],
    link: 'https://asme-714655608194.us-east1.run.app',
    inGrid: true,
    gridSpan: 12,
    mediaAspect: '5/4',
    poster: '/portfolio/asme/asme-poster.webp',
    description: {
      pt: 'Portfólio digital com tipografia editorial, imagens em movimento e apresentação de abordagem e serviços criativos.',
      en: 'Digital portfolio with editorial typography, moving imagery, and an introduction to its creative approach and services.',
    },
    case: {
      challenge: {
        pt: 'A proposta apresentada no site é reunir projetos, estudos e soluções digitais com atenção à clareza visual, à funcionalidade e à experiência de navegação.',
        en: 'The website presents a proposal to bring together projects, studies, and digital solutions with attention to visual clarity, functionality, and the browsing experience.',
      },
      solution: {
        pt: 'Interface com abertura audiovisual, tipografia serifada, alternância de idioma e seções sobre abordagem, estratégia, identidade visual, estrutura e execução.',
        en: 'An interface with an audiovisual opening, serif typography, language switching, and sections covering approach, strategy, visual identity, structure, and execution.',
      },
      result: {
        pt: 'O site publicado apresenta a direção visual e a abordagem criativa da ASME. O próprio conteúdo identifica o portfólio como em construção.',
        en: 'The published website presents the visual direction and creative approach of ASME. Its own content describes the portfolio as under construction.',
      },
    },
  },
  {
    slug: 'barbearia-marques',
    desktopOrder: 7,
    title: 'Barbearia Marques',
    year: '2025',
    tags: ['Web Design', 'Landing Page', 'Branding'],
    link: 'https://barber-marques.vercel.app',
    video: '/video/barbearia-marques.mp4', // preserved for a future videoPreview — not wired yet
    inGrid: true,
    gridSpan: 5,
    mediaAspect: '5/4',
    poster: '/portfolio/marques/poster-editorial.webp',
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
    desktopOrder: 5,
    title: 'Aetheria',
    year: '2025',
    tags: ['Web Design', 'Estética', 'Experiência'],
    link: 'https://aetheria-alpha-five.vercel.app/',
    video: '/video/aetheria.mp4', // preserved for a future videoPreview — not wired yet
    inGrid: true,
    gridSpan: 7,
    mediaAspect: '5/4',
    poster: '/portfolio/aetheria/poster-editorial.webp',
    description: {
      pt: 'Site para marca de estética e bem-estar, com experiência editorial e apresentação de tratamentos como Revive e Glow.',
      en: 'Website for a beauty and wellness brand, with an editorial experience and presentation of treatments such as Revive and Glow.',
    },
    case: {
      challenge: {
        pt: 'Traduzir a proposta de estética e bem-estar da Aetheria em uma experiência digital que apresente os tratamentos e convide a conhecer o studio.',
        en: 'Translate the beauty and wellness approach of Aetheria into a digital experience that introduces its treatments and invites visitors to explore the studio.',
      },
      solution: {
        pt: 'Site com direção editorial, apresentação do studio, cards de tratamentos como Revive e Glow e um fluxo de agendamento com escolha de tratamento, data e horário.',
        en: 'A website with editorial art direction, a studio introduction, treatment cards such as Revive and Glow, and a booking flow with treatment, date, and time selection.',
      },
      result: {
        pt: 'Uma experiência que reúne a identidade da marca, a descoberta dos tratamentos e o acesso ao agendamento em uma mesma jornada.',
        en: 'An experience that brings together the brand identity, treatment discovery, and access to booking in one journey.',
      },
    },
  },
  {
    slug: 'laris30',
    desktopOrder: 3,
    title: 'LARIS30',
    year: '2026',
    tags: ['Web Design', 'Mobile', 'Interativo'],
    link: 'https://laris-30.vercel.app/',
    inGrid: true,
    gridSpan: 5,
    mediaAspect: '5/4',
    // SUMMER VIBES confirmed as part of LARIS30 by the project owner.
    poster: '/portfolio/laris30/poster-editorial.webp',
    description: {
      pt: 'Experiência web mobile para convite de aniversário, com direção Y2K/disco e identidade visual própria.',
      en: 'Mobile web experience for a birthday invitation, with Y2K/disco art direction and a dedicated visual identity.',
    },
    case: {
      challenge: { pt: '[PENDENTE — case study ainda não escrito]', en: '[PENDING — case study copy not written yet]' },
      solution: { pt: '[PENDENTE — case study ainda não escrito]', en: '[PENDING — case study copy not written yet]' },
      result: { pt: '[PENDENTE — case study ainda não escrito]', en: '[PENDING — case study copy not written yet]' },
    },
  },
  {
    slug: 'etre-creative',
    desktopOrder: 6,
    title: 'Être Creative',
    year: '2025',
    tags: ['Design', 'Branding', 'Web'],
    link: 'https://www.etrecreative.com.br/',
    video: '/video/etre-creative.mp4',
    inGrid: true,
    gridSpan: 5,
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
    slug: 'stefani-amorim',
    desktopOrder: 8,
    title: 'Stefani Amorim',
    year: '2026',
    tags: ['Web Design', 'Catálogo', 'Varejo'],
    link: 'https://www.stefanipapelaria.com.br/',
    inGrid: true,
    gridSpan: 7,
    mediaAspect: '5/4',
    poster: '/portfolio/stefani-amorim/poster-editorial.webp',
    description: {
      pt: 'Site para loja de brinquedos educativos e papelaria afetiva, com catálogo e atendimento pelo WhatsApp.',
      en: 'Website for an educational toy and stationery store, with a product catalog and service through WhatsApp.',
    },
    case: {
      challenge: {
        pt: 'Levar a curadoria de brinquedos educativos e papelaria afetiva da Stefani Amorim para uma experiência digital que apresente os produtos e a história da loja.',
        en: 'Bring the educational toy and stationery selection of Stefani Amorim into a digital experience that presents the products and the story behind the store.',
      },
      solution: {
        pt: 'Site com linguagem visual lúdica, seções de brinquedos e papelaria, orientações de escolha e acesso ao atendimento personalizado pelo WhatsApp.',
        en: 'A website with a playful visual identity, toy and stationery sections, selection guidance, and access to personalized service through WhatsApp.',
      },
      result: {
        pt: 'Uma vitrine digital que reúne produtos, curadoria e informações de contato, conectando a descoberta do catálogo à conversa com a loja.',
        en: 'A digital storefront that brings together products, curation, and contact information, connecting catalog discovery to a conversation with the store.',
      },
    },
  },
  {
    slug: 'poliana',
    title: 'Casa de Parafusos Poliana',
    year: '2026',
    tags: ['Web Design', 'Institucional', 'Catálogo'],
    link: 'https://poliana-parafusos-site.vercel.app/',
    inGrid: false,
    gridSpan: 7,
    mediaAspect: '4/3',
    poster: '/portfolio/poliana/universo-poliana-editorial.webp',
    description: {
      pt: 'Site institucional e catálogo para loja de ferragens e fixadores, com direção editorial técnica.',
      en: 'Institutional website and catalog for a hardware and fasteners store, with technical editorial direction.',
    },
    case: {
      challenge: { pt: '[PENDENTE — case study ainda não escrito]', en: '[PENDING — case study copy not written yet]' },
      solution: { pt: '[PENDENTE — case study ainda não escrito]', en: '[PENDING — case study copy not written yet]' },
      result: { pt: '[PENDENTE — case study ainda não escrito]', en: '[PENDING — case study copy not written yet]' },
    },
  },
]
