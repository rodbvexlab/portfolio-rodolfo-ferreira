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
      pt: 'Site para uma clínica de psicoterapia, com direção editorial de cinema e identidade visual própria.',
      en: 'Website for a psychotherapy practice, with cinematic editorial direction and its own visual identity.',
    },
    case: {
      challenge: {
        pt: 'Psicoterapia pede um site que acolha sem parecer folheto de clínica. O desafio era passar cuidado e seriedade, fugir da estética genérica da área da saúde e deixar a proposta clara antes do primeiro contato.',
        en: 'Therapy calls for a site that feels welcoming without looking like a clinic brochure. The challenge was to convey care and seriousness, skip the generic healthcare look, and make the approach clear before the first contact.',
      },
      solution: {
        pt: 'Direção editorial cinematográfica e identidade própria: abertura em vídeo com cortes para desktop e mobile, tipografia editorial e uma narrativa em ritmo calmo, que apresenta a clínica e sua abordagem sem pressa.',
        en: 'Cinematic editorial direction and a dedicated identity: a video opening with desktop and mobile cuts, editorial typography, and a calm narrative that introduces the practice and its approach at an unhurried pace.',
      },
      result: {
        pt: 'Um site que traduz o cuidado da prática clínica em linguagem visual e leva o visitante da apresentação ao contato com naturalidade.',
        en: 'A site that translates the care of clinical practice into visual language and walks visitors from introduction to contact naturally.',
      },
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
      pt: 'Site para uma funilaria e pintura automotiva, com caminhos separados para leves e pesados e tudo levando ao orçamento.',
      en: 'Website for an auto body and paint shop, with separate paths for cars and heavy vehicles, all leading to a quote.',
    },
    case: {
      challenge: {
        pt: 'A Bonitos Car atende dois públicos bem diferentes: quem tem carro e quem cuida de caminhão e frota. O site precisava separar essas jornadas sem confundir ninguém — e levar todo mundo até o pedido de orçamento.',
        en: 'Bonitos Car serves two very different audiences: car owners and people who manage trucks and fleets. The site had to split those journeys without confusing anyone — and get everyone to a quote request.',
      },
      solution: {
        pt: 'Páginas próprias para leves e pesados, apresentação dos serviços e um formulário de orçamento que junta categoria do veículo, contato e descrição numa mensagem pronta no WhatsApp.',
        en: 'Dedicated pages for cars and heavy vehicles, a clear services overview, and a quote form that bundles vehicle type, contact, and description into a ready-to-send WhatsApp message.',
      },
      result: {
        pt: 'As duas frentes de atendimento organizadas num só lugar, com um caminho direto entre conhecer o serviço e pedir a avaliação.',
        en: 'Both service lines organized in one place, with a direct path from exploring the services to requesting an assessment.',
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
      pt: 'Portfólio digital com tipografia editorial, imagens em movimento e um tour pela abordagem e pelos serviços criativos.',
      en: 'Digital portfolio with editorial typography, moving imagery, and a tour of its creative approach and services.',
    },
    case: {
      challenge: {
        pt: 'Reunir projetos, estudos e soluções digitais num só lugar, com clareza visual, funcionalidade e uma navegação agradável de explorar.',
        en: 'Bring projects, studies, and digital solutions together in one place, with visual clarity, functionality, and browsing that is a pleasure to explore.',
      },
      solution: {
        pt: 'Abertura audiovisual, tipografia serifada, troca de idioma e seções sobre abordagem, estratégia, identidade visual, estrutura e execução.',
        en: 'An audiovisual opening, serif typography, language switching, and sections on approach, strategy, visual identity, structure, and execution.',
      },
      result: {
        pt: 'Um site que já mostra a direção visual e a abordagem criativa da ASME — com o próprio portfólio assumidamente em construção.',
        en: 'A site that already shows ASME’s visual direction and creative approach — with the portfolio itself openly a work in progress.',
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
      pt: 'Landing page para uma barbearia, com identidade forte, agendamento integrado e a experiência do cliente no centro.',
      en: 'Landing page for a barbershop, with a strong identity, built-in booking, and the client experience front and center.',
    },
    case: {
      challenge: {
        pt: 'A barbearia vivia de indicação, mas não tinha um site à altura do serviço. Quem chegava novo não achava a marca online, e o agendamento rolava na base da mensagem manual.',
        en: 'The barbershop ran on referrals but had no site that matched its service. Newcomers couldn’t find the brand online, and bookings happened through manual messages.',
      },
      solution: {
        pt: 'Landing page com identidade premium, galeria de trabalhos, serviços e preços, e agendamento integrado. Exclusiva no visual, simples de usar.',
        en: 'A landing page with a premium identity, work gallery, services and pricing, and built-in booking. Exclusive in look, simple to use.',
      },
      result: {
        pt: 'Uma marca que finalmente aparece online do jeito que é atendida na cadeira, com um caminho bem mais curto até o horário marcado.',
        en: 'A brand that finally shows up online the way it treats people in the chair, with a much shorter path to a booked slot.',
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
      pt: 'Site para uma marca de estética e bem-estar, com clima editorial e tratamentos como Revive e Glow.',
      en: 'Website for a beauty and wellness brand, with an editorial mood and treatments such as Revive and Glow.',
    },
    case: {
      challenge: {
        pt: 'Traduzir a proposta de estética e bem-estar da Aetheria numa experiência que apresente os tratamentos e dê vontade de conhecer o studio.',
        en: 'Translate Aetheria’s beauty and wellness approach into an experience that introduces the treatments and makes people want to visit the studio.',
      },
      solution: {
        pt: 'Direção editorial, apresentação do studio, cards de tratamentos como Revive e Glow e um agendamento com escolha de tratamento, data e horário.',
        en: 'Editorial art direction, a studio introduction, treatment cards such as Revive and Glow, and booking with treatment, date, and time selection.',
      },
      result: {
        pt: 'Identidade da marca, descoberta dos tratamentos e agendamento numa jornada só, sem quebra.',
        en: 'Brand identity, treatment discovery, and booking in one seamless journey.',
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
      pt: 'Convite de aniversário em forma de experiência web mobile, com direção Y2K/disco e identidade própria.',
      en: 'A birthday invitation turned mobile web experience, with Y2K/disco art direction and its own identity.',
    },
    case: {
      challenge: {
        pt: 'Transformar um convite de aniversário em algo que as pessoas quisessem abrir, explorar e mandar pros amigos — direto no celular, sem instalar nada.',
        en: 'Turn a birthday invitation into something people would want to open, explore, and send to friends — right on their phones, nothing to install.',
      },
      solution: {
        pt: 'Experiência mobile-first com direção Y2K/disco, identidade visual própria (incluindo a linha Summer Vibes) e interações desenhadas para o toque.',
        en: 'A mobile-first experience with Y2K/disco art direction, its own visual identity (including the Summer Vibes line), and interactions designed for touch.',
      },
      result: {
        pt: 'Um convite com personalidade, que cabe num link e entra no clima da festa da primeira à última tela.',
        en: 'An invitation with personality that fits in a single link and gets into the party mood from the first screen to the last.',
      },
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
      pt: 'Site para um estúdio criativo, com linguagem editorial e uma identidade sofisticada à altura do posicionamento da marca.',
      en: 'Website for a creative studio, with an editorial voice and a sophisticated identity that matches the brand’s positioning.',
    },
    case: {
      challenge: {
        pt: 'O estúdio tinha um portfólio forte e um site genérico, que não mostrava o nível criativo do trabalho — justo para quem eles mais queriam atrair.',
        en: 'The studio had a strong portfolio and a generic website that didn’t show the creative level of its work — exactly to the clients it most wanted to attract.',
      },
      solution: {
        pt: 'Redesign completo com direção editorial, tipografia expressiva, grid assimétrico e animações refinadas que traduzem o DNA criativo da marca.',
        en: 'A full redesign with editorial direction, expressive typography, an asymmetric grid, and refined animations that translate the brand’s creative DNA.',
      },
      result: {
        pt: 'Um site que finalmente conversa com o nível do estúdio e apresenta o trabalho do jeito que ele merece.',
        en: 'A site that finally matches the studio’s level and presents the work the way it deserves.',
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
      pt: 'Site para uma loja de brinquedos educativos e papelaria afetiva, com catálogo e atendimento pelo WhatsApp.',
      en: 'Website for an educational toy and stationery store, with a product catalog and service through WhatsApp.',
    },
    case: {
      challenge: {
        pt: 'Levar a curadoria de brinquedos educativos e papelaria afetiva da Stefani Amorim para o digital, mostrando os produtos e a história por trás da loja.',
        en: 'Bring Stefani Amorim’s curated educational toys and stationery online, showing the products and the story behind the store.',
      },
      solution: {
        pt: 'Visual lúdico, seções de brinquedos e papelaria, dicas para escolher o presente certo e atendimento personalizado a um toque, pelo WhatsApp.',
        en: 'A playful look, toy and stationery sections, tips for picking the right gift, and personal service one tap away on WhatsApp.',
      },
      result: {
        pt: 'Uma vitrine que junta produtos, curadoria e contato, e transforma a descoberta do catálogo numa conversa com a loja.',
        en: 'A storefront that brings products, curation, and contact together, turning catalog browsing into a conversation with the store.',
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
      pt: 'Site institucional e catálogo para uma loja de ferragens e fixadores, com direção editorial técnica.',
      en: 'Business website and catalog for a hardware and fasteners store, with technical editorial direction.',
    },
    case: {
      challenge: {
        pt: 'Mostrar uma loja de ferragens e fixadores com a mesma clareza técnica do balcão, organizando um mix enorme de produtos de um jeito fácil de consultar.',
        en: 'Present a hardware and fasteners store with the same technical clarity as its counter, organizing a huge product mix in a way that is easy to browse.',
      },
      solution: {
        pt: 'Catálogo com direção editorial técnica: tipografia firme, hierarquia clara entre as linhas de produto e caminhos curtos até o atendimento.',
        en: 'A catalog with technical editorial direction: solid typography, clear hierarchy across product lines, and short paths to customer service.',
      },
      result: {
        pt: 'Uma presença online que reforça a credibilidade da loja e ajuda o cliente a achar o que precisa antes mesmo de chamar.',
        en: 'An online presence that reinforces the store’s credibility and helps customers find what they need before they even reach out.',
      },
    },
  },
]
