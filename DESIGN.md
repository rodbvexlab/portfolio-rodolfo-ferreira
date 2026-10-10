# Rodolfo Ferreira — Portfólio

## Posicionamento

Desenvolvedor web freelancer. Sites, sistemas internos, automações e consultoria técnica para empresas e empreendedores.

Copy em primeira pessoa, direta e factual. Descrever o trabalho e o uso da solução. Evitar slogans de transformação, promessas de conversão ou ganhos sem dados, tom de agência e listas de tecnologias como argumento comercial.

A copy vigente em português e inglês está em `src/i18n/translations.ts`. As descrições e estudos de caso estão em `src/data/projects.ts`.

## Estrutura da home

1. Abertura: nome, atuação, descrição curta e acesso aos projetos e contato, sobre o vídeo controlado pelo scroll.
2. Projetos selecionados: imagens existentes, títulos e descrições curtas.
3. Serviços: título e descrição à esquerda, vídeo da ilha abaixo deles, e quatro linhas à direita: sites, sistemas internos, automações e consultoria.
4. Sobre: pausa editorial clara com vídeo de fundo e a apresentação em dois momentos sincronizados ao scroll.
5. Contato: WhatsApp e formulário.

Não duplicar serviços com uma seção de formatos. O funcionamento da contratação cabe em um parágrafo, sem cards de processo.

## Direção visual

- Preto como fundo principal; `#080808` na apresentação pessoal.
- Branco para títulos e texto com opacidade mínima de 60% sobre preto.
- Ciano `#4cd7f6` em rótulos, estados de foco e interação.
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

Única seção clara: fundo do próprio vídeo (#EEF1F5), tipografia escura (#111317), título em Instrument Serif e frases em Geist, rótulo em ciano escuro (#0E7490). O vídeo é o palco inteiro, sem a foto e sem véu sobre a imagem. A leitura vem do posicionamento no terço superior, medido nos frames, e de uma luz suave localizada atrás de cada grupo.

1. Primeiro momento, à esquerda: "Sou o Rodolfo." e duas frases.
2. Segundo momento, à direita (texto alinhado à esquerda): duas frases e a linha de fechamento.

Cada frase entra e sai com fade e deslocamento curto. Faixas curtas fazem a transição do preto para o claro e de volta. Em telas intermediárias, texto à esquerda e vídeo à direita; no celular, vídeo em cima e texto abaixo, na mesma área. Com movimento reduzido ou falha, poster e toda a copy de uma vez.

## Vídeo de serviços

Ilha flutuante sob "O que eu desenvolvo", sem moldura, borda, raio ou sombra. Integra-se ao preto da seção por máscaras graduais: o halo dourado do arquivo se dissolve antes das bordas e a ilha fica intacta. Acompanha a passagem da seção pela tela, sem alongar a página. No celular, fica entre a descrição e a lista, com o quadro inteiro. Com "reduzir movimento", poster estático.

Movimento fica concentrado na abertura, nos projetos (reveal por card e previews), no vídeo de serviços e na entrada suave das seções seguintes. Sem cards, badges ou elementos decorativos competindo com o vídeo.

## Projetos e navegação

Preservar seleção, URLs, slugs, posters e previews existentes. Descrições na home devem informar o tipo de entrega e funcionalidades. Tags detalhadas ficam nos estudos de caso.

Previews: trechos curtos em `public/portfolio/<projeto>/preview-*.mp4`, nunca as gravações completas de `public/video`. Hover e foco no desktop; botão de reprodução no toque e com "reduzir movimento"; um preview ativo por vez.

A navegação contém Projetos, Serviços, Sobre e Contato. Menu compacto até 1023 px, com estado anunciado e fechamento por Escape.

## Contato

O formulário usa a configuração existente `VITE_WEB3FORMS_KEY`. Sem chave, prepara uma mensagem no WhatsApp. Abrir o WhatsApp não equivale a enviar a mensagem: mostrar que ela está pronta e um link para continuar. Com chave, informar sucesso apenas após resposta positiva do serviço.

## Stack e verificações

React + TypeScript + Vite, Tailwind CSS, Framer Motion e React Router. A hero usa um controlador próprio (refs + requestAnimationFrame), sem biblioteca extra.

- `npm ci --no-audit --no-fund`
- `npm run build`
- ESLint dos arquivos alterados
- `git diff --check`
- Conferir responsividade, navegação, idioma, previews e formulário em navegador antes de aprovar o layout final.
- Conferir o scrubbing em Chrome e Safari reais (H.264), incluindo iPhone.

Produção acompanha a branch `main` na Vercel. Revisões devem ser apresentadas em branch e PR.

Atualizado em 10/10/2026.
