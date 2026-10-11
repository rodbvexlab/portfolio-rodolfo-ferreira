# Rodolfo Ferreira — Portfólio

## Posicionamento

Desenvolvedor web freelancer. Sites, sistemas internos, automações e consultoria técnica para empresas e empreendedores.

Copy em primeira pessoa, direta e factual. Descrever o trabalho e o uso da solução. Evitar slogans de transformação, promessas de conversão ou ganhos sem dados, tom de agência e listas de tecnologias como argumento comercial.

A copy vigente em português e inglês está em `src/i18n/translations.ts`. As descrições e estudos de caso estão em `src/data/projects.ts`.

## Estrutura da home

1. Abertura: nome, atuação, descrição curta e acesso aos projetos e contato, sobre o vídeo controlado pelo scroll.
2. Projetos selecionados: imagens existentes, títulos e descrições curtas.
3. Serviços: título e descrição à esquerda, vídeo da ilha abaixo deles, e quatro linhas à direita: sites, sistemas internos, automações e consultoria.
4. Sobre: pausa escura em que a apresentação, em dois momentos sincronizados ao scroll, revela o rosto pontilhado em cores.
5. Contato: única seção clara. Título, descrição e WhatsApp à esquerda, com o vídeo da mão abaixo; formulário à direita.

Não duplicar serviços com uma seção de formatos. O funcionamento da contratação cabe em um parágrafo, sem cards de processo.

## Direção visual

- Preto como fundo principal, inclusive em "Sobre".
- Branco para títulos e texto com opacidade mínima de 60% sobre preto.
- Ciano `#4cd7f6` em rótulos, estados de foco e interação.
- Contato (seção clara): fundo `#F5F7FA` (`paper`), texto `#111317` (`ink`) e teal escuro `#0E7490` (`accent-ink`) no lugar do ciano, que não tem contraste sobre fundo claro. Tokens em `tailwind.config.js`.
- Geist nos títulos principais e interface; Instrument Serif no nome e no título "Projetos selecionados".
- Container máximo de 1440 px; padding de 24 px no celular e 80 px a partir de 768 px.
- Bordas discretas e raio de 8 px nos novos controles; sem cards decorativos nos serviços.
- Cursor nativo. Movimentos reduzidos conforme preferência do sistema.

## Abertura com vídeo

Palco sticky de 100svh dentro de uma hero de 270svh (210svh abaixo de 768 px). O scroll avança e recua o vídeo; parado, o vídeo fica no frame correspondente.

1. Momento 1: rótulo, headline, descrição e CTAs no canto inferior esquerdo, legíveis desde o primeiro carregamento.
2. Momento 2: o texto se recolhe (fade e deslocamento curto), o vídeo ocupa o palco e, no fim, "Projetos selecionados" sobe sobre a parte inferior escurecida.

- Vídeo sem véu uniforme. Leitura garantida por gradientes localizados: topo (navbar), inferior esquerdo (abertura) e inferior (saída).
- Indicador de progresso vertical discreto (01/02) na borda direita.
- Navbar transparente sobre o vídeo; sólida quando Projetos chega até ela.
- CTAs recolhidos ficam `inert`.
- "Reduzir movimento": hero de 100svh com poster, texto completo e sem vídeo.
- Mídia, comandos e estratégia de keyframes: `docs/hero-video.md`.

## Sobre

Seção escura. O rosto de vidro (DitherVeil) começa pontilhado em duotone e abre as cores, a partir do rosto, conforme a apresentação avança. Título em Instrument Serif, frases em Geist, rótulo em ciano.

1. Primeiro momento, à esquerda do rosto: "Sou o Rodolfo." e duas frases. Rosto pontilhado.
2. Segundo momento, à direita do rosto: duas frases e a linha de fechamento. Rosto em cores.

Cada frase entra e sai com fade e deslocamento curto. No desktop com mouse, o cursor também revela as cores. Em telas intermediárias, texto à esquerda e rosto à direita; no celular, rosto em cima e texto abaixo, na mesma área. Com movimento reduzido, foto em cores e toda a copy de uma vez.

## Vídeo de serviços

Ilha flutuante sob "O que eu desenvolvo", sem moldura, borda, raio ou sombra. Integra-se ao preto da seção por máscaras graduais: o halo dourado do arquivo se dissolve antes das bordas e a ilha fica intacta. Acompanha a passagem da seção pela tela, sem alongar a página. No celular, fica entre a descrição e a lista, com o quadro inteiro. Com "reduzir movimento", poster estático.

Movimento fica concentrado na abertura, nos projetos (reveal por card e previews), no vídeo de serviços e na entrada suave das seções seguintes. Sem cards, badges ou elementos decorativos competindo com o vídeo.

## Projetos e navegação

Preservar seleção, URLs, slugs, posters e previews existentes. Descrições na home devem informar o tipo de entrega e funcionalidades. Tags detalhadas ficam nos estudos de caso.

Previews: trechos curtos em `public/portfolio/<projeto>/preview-*.mp4`, nunca as gravações completas de `public/video`. Hover e foco no desktop; botão de reprodução no toque e com "reduzir movimento"; um preview ativo por vez.

A navegação contém Projetos, Serviços, Sobre e Contato. Menu compacto até 1023 px, com estado anunciado e fechamento por Escape.

## Contato

O formulário usa a configuração existente `VITE_WEB3FORMS_KEY`. Sem chave, prepara uma mensagem no WhatsApp. Abrir o WhatsApp não equivale a enviar a mensagem: mostrar que ela está pronta e um link para continuar. Com chave, informar sucesso apenas após resposta positiva do serviço.

Única seção clara da página, com faixas curtas do preto para o claro e de volta ao rodapé. O vídeo da mão, ao lado do formulário, acompanha a chegada à seção e termina com a mão estendida no fim da página. Sem moldura, sombra ou card: máscaras suaves assentam o quadro no fundo. No celular, o formulário vem antes do vídeo. Com movimento reduzido, poster. Detalhes técnicos em `docs/hero-video.md`.

## Stack e verificações

React + TypeScript + Vite, Tailwind CSS, Framer Motion e React Router. Os vídeos usam um controlador próprio (refs + requestAnimationFrame), sem biblioteca extra. O rosto de "Sobre" usa `ogl` (WebGL2), carregado sob demanda.

- `npm ci --no-audit --no-fund`
- `npm run build`
- ESLint dos arquivos alterados
- `git diff --check`
- Conferir responsividade, navegação, idioma, previews e formulário em navegador antes de aprovar o layout final.
- Conferir o scrubbing em Chrome e Safari reais (H.264), incluindo iPhone.

## Compartilhamento

`public/og-image.jpg` (1200×630, ~137 KB): a hero com marca, título e subtítulo, sem menu, botões e controles. As meta tags Open Graph e Twitter em `index.html` usam URLs absolutas em `https://portfolio-rodolfo-ferreira.vercel.app/`; WhatsApp, LinkedIn e Facebook não aceitam caminho relativo. Ao ligar um domínio próprio na Vercel, trocar essas URLs (`og:url`, `og:image`, `og:image:secure_url`, `twitter:image`). Se a hero mudar, gerar a imagem de novo a partir de uma captura 1200×630 da página.

Produção acompanha a branch `main` na Vercel. Revisões devem ser apresentadas em branch e PR.

Atualizado em 10/10/2026.
