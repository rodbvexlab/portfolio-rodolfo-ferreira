export const pt = {
  nav: {
    services: 'Serviços',
    projects: 'Projetos',
    process: 'Processo',
    contact: 'Contato',
    cta: 'Falar comigo',
  },
  hero: {
    "label": "Rodolfo Ferreira · Designer e dev",
    "headline": [
      "Do design ao código"
    ],
    "body": "Primeiro eu entendo o que o seu projeto precisa. Depois desenho e desenvolvo cada detalhe, com as ferramentas certas, para entregar um resultado à\u00a0altura.",
    "cta_primary": "Ver projetos",
    "cta_secondary": "Falar comigo",
    "proof": [
      "Escopo, prazo e valor por escrito",
      "Responsivo em qualquer tela",
      "Publicado e pronto para usar"
    ],
    "mockup": {
      "filename": "stack.ts",
      "comment1": "// o que uso no dia a dia",
      "rows": [
        { "label": "front-end", "value": "React, Next.js e TypeScript" },
        { "label": "interface", "value": "Tailwind CSS, shadcn/ui e Radix" },
        { "label": "movimento", "value": "Framer Motion, GSAP e Three.js" },
        { "label": "back-end", "value": "Node.js, Express e APIs de IA" },
        { "label": "deploy", "value": "Vercel e Google Cloud" }
      ],
      "status": "disponível para novos projetos"
    }
  },
  services: {
    "label": "Serviços",
    "lead": [
      "Começo pelo que o seu projeto precisa resolver.",
      "Depois escolho o formato e as ferramentas que fazem sentido para ele."
    ] as [string, string],
    "cards": [
      {
        "icon": "dashboard",
        "title": "Web Design",
        "description": "Sites institucionais e landing pages com identidade própria, desenvolvidos em React e Next.js."
      },
      {
        "icon": "database",
        "title": "Sistemas Web",
        "description": "Painéis e ferramentas internas em React, TypeScript e Node.js para organizar a rotina da sua equipe."
      },
      {
        "icon": "bolt",
        "title": "Automação",
        "description": "Integrações entre ferramentas e APIs, incluindo IA, para automatizar tarefas repetitivas."
      },
      {
        "icon": "construction",
        "title": "Soluções sob medida",
        "description": "Quando o projeto pede algo específico, desenho e desenvolvo uma solução do zero."
      }
    ],
    formats: {
      label: 'Formatos',
      headline: 'Tudo combinado\nantes de começar.',
      body: 'Toda proposta começa com uma conversa sobre o seu contexto. Depois você recebe por escrito o que será entregue, o prazo e o investimento.',
      steps: [
        { title: 'Conversa', description: 'Você conta o que precisa resolver.' },
        { title: 'Proposta', description: 'Escopo, prazo e valor definidos por escrito.' },
        { title: 'Execução', description: 'O projeto começa com tudo combinado.' },
      ],
      cta: 'Pedir orçamento',
      note: 'Valores sob consulta, sempre com proposta por escrito.',
      ask: 'Olá, Rodolfo! Quero conversar sobre um projeto de',
      ask_generic: 'Olá, Rodolfo! Quero pedir um orçamento.',
      items: [
        { title: 'Landing Page', fit: 'Para lançar uma oferta, campanha ou serviço com uma página focada em conversão.', includes: ['Estrutura e conteúdo', 'Design sob medida', 'Publicação'] },
        { title: 'Site Institucional', fit: 'Para apresentar a sua marca com o mesmo nível do seu trabalho.', includes: ['Várias páginas', 'Identidade aplicada', 'SEO técnico'] },
        { title: 'Sistema Interno', fit: 'Para tirar processos de planilhas e grupos de WhatsApp.', includes: ['Painel e permissões', 'Banco de dados', 'Fluxos sob medida'] },
        { title: 'IA Aplicada & Automação', fit: 'Para automatizar o que é repetitivo e liberar o tempo da equipe.', includes: ['Integrações', 'Fluxos automáticos', 'Assistentes com IA'] },
        { title: 'E-commerce', fit: 'Para vender online com catálogo, carrinho e pagamento integrados.', includes: ['Catálogo', 'Checkout', 'Gestão de pedidos'] },
        { title: 'Projeto sob medida', fit: 'Para quando o problema não se encaixa em nenhum formato pronto.', includes: ['Diagnóstico', 'Escopo próprio'] },
      ],
    },
  },
  portfolio: {
    label: 'Projetos selecionados',
    available: 'Disponível para novos projetos',
    view_case: 'Ver case',
    back: '← Voltar',
  },
  process: {
    "label": "Processo",
    "lead": [
      "Cinco etapas, do primeiro briefing ao site no ar.",
      "Em cada uma você sabe o que está sendo feito e o que vem a seguir."
    ] as [string, string],
    "steps": [
      {
        "num": "01",
        "title": "Diagnóstico",
        "description": "Entender o negócio, o público e o que o projeto precisa resolver."
      },
      {
        "num": "02",
        "title": "Direção",
        "description": "Definir estrutura, conteúdo e referências visuais."
      },
      {
        "num": "03",
        "title": "Design",
        "description": "Transformar a direção em interface, com identidade e interação."
      },
      {
        "num": "04",
        "title": "Desenvolvimento",
        "description": "Levar o design para o código com React e TypeScript: rápido, responsivo e fiel ao layout."
      },
      {
        "num": "05",
        "title": "Entrega",
        "description": "Publicar, testar e deixar tudo pronto para você usar."
      }
    ]
  },
  contact: {
    label: 'Contato',
    headline: 'O que vamos construir?',
    body: 'Conte um pouco sobre a ideia: site, landing page, sistema, automação ou IA. Eu retorno com os próximos passos.',
    name: 'Seu nome',
    contact_field: 'WhatsApp ou e-mail',
    project_type: 'Tipo de projeto',
    message: 'Conte um pouco sobre o projeto',
    submit: 'Enviar mensagem',
    sending: 'Enviando...',
    success: 'Tudo certo! Em breve eu retorno com os próximos passos.',
    error: 'Algo deu errado no envio. Se preferir, me chame pelo WhatsApp.',
    whatsapp: 'Chamar no WhatsApp',
  },
  case: {
    challenge: 'Desafio',
    solution: 'Solução',
    result: 'Resultado',
    visit: 'Ver projeto ao vivo',
    back: 'Todos os projetos',
    next: 'Próximo projeto',
    previous: 'Projeto anterior',
    year: 'Ano',
    scope: 'Escopo',
    pending: 'O estudo de caso completo está em produção. Enquanto isso, veja o projeto no ar.',
    cta_title: 'Gostou? Vamos construir o seu.',
    cta_body: 'Conte o seu contexto e eu proponho o melhor caminho.',
    cta: 'Falar sobre meu projeto',
  },
  footer: {
    copy: 'Rodolfo Ferreira',
    tagline: 'Design · Desenvolvimento · Automação',
    social: {
      instagram: 'https://www.instagram.com/rodbomm/',
      whatsapp: 'https://wa.me/5511924796028?text=Oi%2C%20Rodolfo%21%20Vim%20pelo%20site%20e%20quero%20conversar%20sobre%20um%20projeto.',
    },
  },
}

export const en: typeof pt = {
  nav: {
    services: 'Services',
    projects: 'Projects',
    process: 'Process',
    contact: 'Contact',
    cta: 'Talk to me',
  },
  hero: {
    "label": "Rodolfo Ferreira · Designer & dev",
    "headline": [
      "From design to code"
    ],
    "body": "First I understand what your project needs. Then I design and build every detail, with the right tools, to deliver work that lives up to\u00a0it.",
    "cta_primary": "View projects",
    "cta_secondary": "Talk to me",
    "proof": [
      "Scope, timeline, and price in writing",
      "Responsive on any screen",
      "Published and ready to use"
    ],
    "mockup": {
      "filename": "stack.ts",
      "comment1": "// what I use day to day",
      "rows": [
        { "label": "front-end", "value": "React, Next.js & TypeScript" },
        { "label": "interface", "value": "Tailwind CSS, shadcn/ui & Radix" },
        { "label": "motion", "value": "Framer Motion, GSAP & Three.js" },
        { "label": "back-end", "value": "Node.js, Express & AI APIs" },
        { "label": "deploy", "value": "Vercel & Google Cloud" }
      ],
      "status": "available for new projects"
    }
  },
  services: {
    "label": "Services",
    "lead": [
      "I start with what your project needs to solve.",
      "Then I pick the format and the tools that make sense for it."
    ] as [string, string],
    "cards": [
      {
        "icon": "dashboard",
        "title": "Web Design",
        "description": "Business websites and landing pages with their own identity, built with React and Next.js."
      },
      {
        "icon": "database",
        "title": "Web Systems",
        "description": "Dashboards and internal tools in React, TypeScript, and Node.js to organize your team’s routine."
      },
      {
        "icon": "bolt",
        "title": "Automation",
        "description": "Integrations between tools and APIs, including AI, to automate repetitive tasks."
      },
      {
        "icon": "construction",
        "title": "Custom Solutions",
        "description": "When a project needs something specific, I design and build a solution from scratch."
      }
    ],
    formats: {
      label: 'Formats',
      headline: 'Everything agreed\nbefore we start.',
      body: 'Every proposal starts with a conversation about your context. Then you get in writing what will be delivered, the timeline, and the investment.',
      steps: [
        { title: 'Conversation', description: 'You tell me what needs solving.' },
        { title: 'Proposal', description: 'Scope, timeline, and price set in writing.' },
        { title: 'Execution', description: 'The project starts with everything agreed.' },
      ],
      cta: 'Get a quote',
      note: 'Pricing on request, always with a written proposal.',
      ask: 'Hi Rodolfo! I want to talk about a project for',
      ask_generic: 'Hi Rodolfo! I would like to get a quote.',
      items: [
        { title: 'Landing Page', fit: 'To launch an offer, campaign, or service with a page built to convert.', includes: ['Structure and content', 'Custom design', 'Launch'] },
        { title: 'Business Website', fit: 'To present your brand at the same level as your work.', includes: ['Multiple pages', 'Applied identity', 'Technical SEO'] },
        { title: 'Internal System', fit: 'To get processes out of spreadsheets and group chats.', includes: ['Dashboard and permissions', 'Database', 'Custom workflows'] },
        { title: 'Applied AI & Automation', fit: 'To automate repetitive work and free up your team’s time.', includes: ['Integrations', 'Automated workflows', 'AI assistants'] },
        { title: 'E-commerce', fit: 'To sell online with an integrated catalog, cart, and checkout.', includes: ['Catalog', 'Checkout', 'Order management'] },
        { title: 'Custom Project', fit: 'For when the problem doesn’t fit any ready-made format.', includes: ['Diagnosis', 'Dedicated scope'] },
      ],
    },
  },
  portfolio: {
    label: 'Selected work',
    available: 'Available for new projects',
    view_case: 'View case',
    back: '← Back',
  },
  process: {
    "label": "Process",
    "lead": [
      "Five steps, from the first briefing to a live site.",
      "At each one you know what is being done and what comes next."
    ] as [string, string],
    "steps": [
      {
        "num": "01",
        "title": "Diagnosis",
        "description": "Understand the business, the audience, and what the project needs to solve."
      },
      {
        "num": "02",
        "title": "Direction",
        "description": "Define the structure, content, and visual references."
      },
      {
        "num": "03",
        "title": "Design",
        "description": "Turn the direction into an interface, with identity and interaction."
      },
      {
        "num": "04",
        "title": "Development",
        "description": "Bring the design into code with React and TypeScript: fast, responsive, and true to the layout."
      },
      {
        "num": "05",
        "title": "Delivery",
        "description": "Publish, test, and get everything ready for you to use."
      }
    ]
  },
  contact: {
    label: 'Contact',
    headline: 'What are we building?',
    body: "Tell me a bit about your idea: website, landing page, system, automation, or AI. I'll get back to you with next steps.",
    name: 'Your name',
    contact_field: 'WhatsApp or e-mail',
    project_type: 'Project type',
    message: 'Tell me a bit about the project',
    submit: 'Send message',
    sending: 'Sending...',
    success: "All set! I'll get back to you soon with next steps.",
    error: 'Something went wrong. Feel free to message me on WhatsApp instead.',
    whatsapp: 'Message me on WhatsApp',
  },
  case: {
    challenge: 'Challenge',
    solution: 'Solution',
    result: 'Result',
    visit: 'View live project',
    back: 'All projects',
    next: 'Next project',
    previous: 'Previous project',
    year: 'Year',
    scope: 'Scope',
    pending: 'The full case study is in progress. Meanwhile, see the live project.',
    cta_title: "Like it? Let's build yours.",
    cta_body: "Tell me your context and I'll propose the best path.",
    cta: 'Talk about my project',
  },
  footer: {
    copy: 'Rodolfo Ferreira',
    tagline: 'Design · Development · Automation',
    social: {
      instagram: 'https://www.instagram.com/rodbomm/',
      whatsapp: 'https://wa.me/5511924796028?text=Oi%2C%20Rodolfo%21%20Vim%20pelo%20site%20e%20quero%20conversar%20sobre%20um%20projeto.',
    },
  },
}
