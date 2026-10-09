# Curadoria ASME

Poliana está com `inGrid: false`. Dados, rota /case/poliana, conteúdo e assets preservados; a rota foi verificada no navegador.

Mobile: Ori.gens → Bonitos Car → ASME → Barbearia Marques → Aetheria → LARIS30 → Être Creative → Stefani Amorim.

Desktop: Ori.gens 12 / Bonitos 7 + LARIS30 5 / ASME 12 / Aetheria 7 + Être 5 / Marques 5 + Stefani 7. A capa ASME mantém 5:4, inclusive no destaque de 12 colunas.

## Capa

`public/portfolio/asme/asme-poster.webp`: 1500 × 1200, 194062 bytes, WebP qualidade 95.

Site inspecionado: https://asme-714655608194.us-east1.run.app/.

Foram comparados o hero/primeira dobra, Sobre nós, Nossa abordagem e Clareza × Experiência. A composição escolhida usa a imagem e o painel real de Nossa abordagem, com o título real de Sobre nós e a navegação da ASME. Recorte e recomposição determinísticos de screenshots; nenhum texto, fonte, marca, UI ou imagem foi gerado. Os arquivos-fonte ficam na pasta de visualizações desta tarefa.

ASME é um portfólio criativo em construção, conforme o site atual. A antiga descrição de sistema de associação, roles, relatórios e economia de tempo foi substituída por conteúdo verificável. O ano 2024 foi mantido do cadastro anterior, sem confirmação independente.

## Validação enxuta

- Build: aprovado; aviso existente do chunk Three.js acima de 500 kB.
- Lint global: dois erros preexistentes em LanguageContext.tsx (react-refresh/only-export-components) e useMediaQuery.ts (react-hooks/set-state-in-effect).
- Lint de Portfolio.tsx e projects.ts: aprovado.
- git diff --check: aprovado.
- Desktop: screenshot em 1440 × 1500 com ASME 12/12, mídia visível sem hover.
- Mobile: screenshot do grid em 390 px com a ordem solicitada, sem Poliana e sem overflow horizontal.
- Nenhum push, commit ou deploy.

## Git — acumulado, incluindo mudanças anteriores desta tarefa

```text
src/components/ContactCTA.tsx |   4 +-
 src/components/Hero.tsx       |   2 +-
 src/components/Portfolio.tsx  |  35 ++++--
 src/data/projects.ts          | 272 +++++++++++++++++++++++++-----------------
 src/i18n/translations.ts      |  48 ++++----
 src/index.css                 |   9 ++
 src/pages/CaseStudy.tsx       |   6 +-
 7 files changed, 225 insertions(+), 151 deletions(-)
 M src/components/ContactCTA.tsx
 M src/components/Hero.tsx
 M src/components/Portfolio.tsx
 M src/data/projects.ts
 M src/i18n/translations.ts
 M src/index.css
 M src/pages/CaseStudy.tsx
?? docs/
?? public/portfolio-work/
?? public/portfolio/aetheria/
?? public/portfolio/asme/
?? public/portfolio/bonitos/
?? public/portfolio/laris30/poster-editorial.webp
?? public/portfolio/marques/
?? public/portfolio/stefani-amorim/
```

