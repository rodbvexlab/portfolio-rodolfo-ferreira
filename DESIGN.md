# Rodolfo Ferreira — Design System

> Documento de referência para criação de posts, materiais, artefatos e extensões visuais do portfólio.  
> Use este arquivo como contexto ao promtar Claude para novos designs.

---

## 01 · Ponto de Vista

**Direção:** Dark-tech premium — estética de produto de software de alto nível, não de agência criativa.  
**Referências visuais:** Vercel, Linear, Raycast — dark, limpo, tipografia forte, sem decoração desnecessária.  
**Princípio:** Cada elemento existe por uma razão. Espaço vazio é intencional. Cor é escassa e significativa.

### Posicionamento
- **Tagline:** *"Não crio sites bonitos. Crio ferramentas que trabalham pelo seu negócio."*
- **Filosofia:** *"Design com propósito. Código com precisão. Resultado que permanece."*
- **Headline principal:** *"Web Design, Sistemas & IA para negócios reais."*
- **Público-alvo:** Agências que terceirizam + marcas pessoais premium + PMEs com operação consolidada
- **Serviços:** Web Design · Sistemas Internos · IA Aplicada · Automação

---

## 02 · Sistema de Cor

```
Primária (fundo)     #000000   rgb(0, 0, 0)
Superfície           #0a0a0a   rgb(10, 10, 10)      — cards, glass
Texto principal      #e8e6e3   rgb(232, 230, 227)   — branco quente
Texto secundário     rgba(255,255,255,0.60)           — body copy
Texto terciário      rgba(255,255,255,0.35)           — labels, meta
Decorativo           rgba(255,255,255,0.15)           — borders, separators
Accent / Cyan        #4cd7f6   rgb(76, 215, 246)    — o único acento de cor
Cyan tint            rgba(76, 215, 246, 0.10)         — fundos glass com acento
Cyan glow            rgba(76, 215, 246, 0.05)         — ambient light
Borda padrão         rgba(255,255,255,0.07–0.10)
```

### Regras de uso de cor
- Nunca use mais de **1 cor de acento** por seção
- O ciano aparece em: ícones, labels ativos, CTAs hover, bordas de foco, blomm do hero
- Verde (`#a3e635`) e âmbar (`#f59e0b`) só aparecem no tech mockup como dados de métricas
- Vermelho: apenas para estados de erro
- Nenhum gradiente colorido — apenas gradientes de preto para transparente

### Escala de contraste (WCAG AA)
| Opacidade | Hex aprox.  | Contraste | Uso |
|-----------|-------------|-----------|-----|
| white     | #ffffff     | 21:1      | Headlines, CTA text |
| white/85  | #d9d6d3     | 13:1      | Títulos de projeto |
| white/70  | #b3b0ae     | 8.5:1     | Subtítulos |
| white/60  | #999795     | 6.5:1     | Body copy |
| white/55  | #8c8a88     | **5.5:1** | Mínimo para texto corrido |
| white/35  | #595757     | 3:1       | Apenas decorativo/icons |

---

## 03 · Tipografia

### Famílias
| Papel | Fonte | Fallback |
|---|---|---|
| **Display / Serif** | Instrument Serif | Georgia, serif |
| **Sans / Interface** | Geist | system-ui, -apple-system, sans-serif |
| **Mono / Code** | Geist Mono (via `font-mono`) | monospace |

### Escala tipográfica
```
Display grande   80px  / lh 1.0  / tracking -0.02em  → Headlines de seção hero
Display médio    56–72px / lh 1.05              → h1 das seções principais
Headline         40–52px / lh 1.1               → h2 de seções
Subtítulo        22–28px / lh 1.2               → Títulos de cards e projetos
Body large       18px    / lh 1.6  / weight 300  → Parágrafos em destaque
Body regular     16px    / lh 1.5  / weight 400  → Corpo de texto padrão
Body small       14–15px / lh 1.5               → Texto de cards
Label            12px    / lh 1.0  / tracking 0.1em / weight 600 / uppercase → Labels de seção
Caption          11px    / tracking 0.15–0.2em / uppercase → Meta, tags, badges
Mono/Code        12–13px / font-mono              → Tech mockup, preços, anos

```

### Padrão de hierarquia por seção
```
1. Label      — 11px, uppercase, tracking largo, ciano 80%, font-mono
2. Headline   — serif, grande, white
3. Body       — sans, white/60, leading-relaxed
4. Meta       — 11–12px, uppercase, white/30–35
```

---

## 04 · Espaçamento e Grid

```
Container máximo    1440px
Padding desktop     80px  (md:px-20)
Padding mobile      24px  (px-6)
Seção padding       py-24 md:py-32 (96px / 128px)
Gap cards           gap-4 (16px) a gap-8 (32px)
Gap seção           gap-16 md:gap-24
```

### Grid de conteúdo
- **Desktop:** `grid-cols-2` para cards, `grid-cols-[1fr_380px]` para hero, `grid-cols-12` para layouts assimétricos
- **Mobile:** sempre `grid-cols-1` (exceto process: `grid-cols-2`)
- Breakpoints: `md:` = 768px, `lg:` = 1024px

---

## 05 · Componentes e Padrões Visuais

### Glass / Liquid glass
```css
background: rgba(255, 255, 255, 0.02)
border: 1px solid rgba(255, 255, 255, 0.07–0.10)
backdrop-filter: blur(20px)            /* desktop only */
box-shadow: inset 0 1px 0 rgba(255,255,255,0.10)  /* top highlight */
border-radius: 1.5rem (24px) a 2rem (32px)
```

**Em mobile:** `backdrop-filter` desabilitado por CSS (`pointer: coarse`), substituído por `background: rgba(10,10,10,0.88)`.

### Cards de projeto
```
Aspecto: 16/10 (regular) ou 21/9 (wide)
Border-radius: rounded-2xl (16px)
Video: opacity 40% base → 85% no hover
Overlay: gradient-to-top from-black/92 → transparent
Hover chip: "Ver case" com seta ciano
```

### CTAs (botões)
```
Primário:   bg-white text-black rounded-full → hover:bg-cyan-300
Secundário: border border-white/10 bg-white/[0.05] → hover:border-cyan-400/30 hover:bg-cyan-400/05
Ghost:      border-b border-white/10 text-white/40 → hover:text-white/80 hover:border-white/30
Todos: font-sans text-[12px] uppercase tracking-widest
```

### Badges / Tags / Pills
```css
font-sans text-[10–12px] uppercase tracking-widest
text-white/30–35  border border-white/[0.07–0.10]
px-2.5–4 py-1–2 rounded-full
hover: border-cyan-400/20 text-white/45
```

### Separadores de seção
```css
/* Linha com fade nas bordas */
height: 1px
background: linear-gradient(to right, transparent, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.07) 60%, transparent)
```

---

## 06 · Efeitos de Fundo por Seção

| Seção | Efeito de fundo |
|---|---|
| **Hero** | Three.js dot wave (desktop) + CSS dot grid (mobile) + Cyan bloom layers + scroll fade |
| **Services** | Radial gradient top-right ciano + video background (desktop) |
| **Portfolio** | Radial gradient bottom-left ciano |
| **Process** | Video background (desktop) + gradient mobile |
| **About** | FluidParticlesBackground (canvas) + vinheta radial |
| **Contact** | Radial gradient central ciano duplo |
| **404** | Dot grid + radial glow central |

### Cyan Bloom (Hero)
```
Layer 1: ellipse 85% 55% at 50% 38% → rgba(76,215,246, 0.055)  [ambient]
Layer 2: ellipse blur:32px           → rgba(76,215,246, 0.09)   [source]
Layer 3: circle blur:18px animated   → rgba(180,240,255, 0.18)  [hot core, breathing 5s]
Layer 4: bottom bounce               → rgba(76,215,246, 0.025)  [bounce-back]
Flare:   1px line at 28%             → rgba(180,240,255, 0.10) peak center
```

---

## 07 · Motion / Animações

### Easing padrão
```ts
ease = [0.16, 1, 0.3, 1]  // cubic-bezier — "premium ease out"
```

### Padrões de entrada
```ts
// Fade + slide up (todos os elementos de seção)
initial: { opacity: 0, y: 24 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.7, ease }

// Stagger de filhos
staggerChildren: 0.1
delayChildren: 0.1–0.15

// Reveal de palavras no hero (palavra a palavra)
initial: { opacity: 0, y: 30, filter: 'blur(8px)' }
animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
transition: { duration: 0.7 }
```

### Micro-interações
| Componente | Comportamento |
|---|---|
| **MagneticButton** | Deriva 28% em direção ao cursor, spring `stiffness:180 damping:18` |
| **ScrambleText** | Scramble → resolve left-to-right no viewport enter, 28ms/frame |
| **TiltCard** | `perspective(900px) rotateX/Y ±7°` no mousemove, spring-back |
| **Portfolio video** | `play()` no mouseenter, `pause()` no mouseleave |
| **Cyan bloom core** | `scale 0.95↔1.05` over 5s `easeInOut` loop |
| **Fluid particles** | Perlin noise wave, 1000 partículas desktop / 400 mobile |
| **Custom cursor** | Dot 6px + ring 32px, spring physics, expande para 48px em links |

### Scroll
```ts
// Hero dot fade
useScroll target: hero section
scrollYProgress [0, 0.65] → opacity [1, 0]
scrollYProgress [0, 1]    → y ['0%', '-18%']  (parallax)
```

---

## 08 · Projetos no Portfólio

| Projeto | Tags | Vídeo | Link |
|---|---|---|---|
| Bonitos Car | Web Design, Landing Page, SEO | ✅ | bonitoscar.com.br |
| Être Creative | Design, Branding, Web | ✅ | etrecreative.com.br |
| Barbearia Marques | Web Design, Landing Page, Branding | ✅ | barber-marques.vercel.app |
| Aetheria | Web Design, 3D / Art, Creative | ✅ | aetheria-3d3l.vercel.app |
| Plataforma ASME | Sistema, Cloud Run, UX | ❌ placeholder | asme-714655608194.us-east1.run.app |
| CRM Criativos | CRM, Next.js, Dashboard | ❌ placeholder | crm-criativos.vercel.app |

---

## 09 · Tabela de Preços

| Serviço | Preço |
|---|---|
| Landing Page | A partir de R$ 1.200 |
| Site Institucional | A partir de R$ 3.500 |
| Sistema Interno | A partir de R$ 8.000 |
| IA Aplicada / Automação | A partir de R$ 5.000 |
| E-commerce | A consultar |
| Projeto Personalizado | A consultar |

---

## 10 · Copy Master (PT)

```
Hero headline:   "Web Design, Sistemas & IA para negócios reais."
Hero body:       "Crio sites, sistemas internos e automações com foco em clareza,
                  usabilidade e resultado real — unindo design, tecnologia e visão
                  prática de operação."

About headline:  "Não crio sites bonitos. Crio ferramentas que trabalham pelo seu negócio."
About body:      "Sou Rodolfo Ferreira, webdesigner, desenvolvedor e profissional de
                  tecnologia. Crio experiências digitais que unem estética, clareza e função."
Filosofia:       "Design com propósito. Código com precisão. Resultado que permanece."

Services:        "Soluções digitais para negócios que precisam sair do improviso."
Portfolio:       "Design, tecnologia e resultado real — em cada projeto."
Process:         "Um fluxo claro para transformar ideias em soluções bem pensadas,
                  funcionais e bonitas."
Contact:         "Vamos transformar sua ideia em algo real?"

Status chip:     "Disponível para novos projetos"
CTA primário:    "Falar sobre um projeto"
Instagram:       @rodbomm
WhatsApp:        +55 11 92479-6028
```

---

## 11 · Stack Técnica

```
Framework:    React 19 + TypeScript + Vite
Styling:      Tailwind CSS v3
Animações:    Framer Motion v12
Roteamento:   React Router v7
3D / Canvas:  Three.js (lazy-loaded, desktop only)
Formulário:   Web3Forms (VITE_WEB3FORMS_KEY)
Deploy:       Vercel (auto-deploy via GitHub main)
Repositório:  github.com/rodbvexlab/portfolio-rodolfo-ferreira
Produção:     portfolio-rodolfo-ferreira.vercel.app
```

---

## 12 · Guia de Uso Para Posts / Claude Design

Ao criar posts, banners, stories ou qualquer material visual usando este design system, inclua este contexto no prompt:

```
Design system: Dark-tech premium
Background: #000 / #0a0a0a
Accent: #4cd7f6 (cyan)
Texto: white, white/85, white/60 (nunca abaixo de white/55 para leitura)
Fontes: Instrument Serif (display/headers) + Geist (body/labels)
Labels: 11px, uppercase, tracking-widest, font-mono, ciano 80%
Headlines: font-serif, branco puro, sem italic exceto na linha de filosofia
Border: rgba(255,255,255,0.07–0.10), radius 16–32px
Espaçamento: generoso, mínimo 24px padding, 32px gap interno
Motion: ease-out suave, nada brusco
Princípio: elegante, restrito, preciso — nunca decorativo por decoração
```

---

*Atualizado em Maio 2025 · Rodolfo Ferreira Portfolio v2*
