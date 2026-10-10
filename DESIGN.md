# Rodolfo Ferreira — Portfólio

## Posicionamento

Desenvolvedor web freelancer. Sites, sistemas internos, automações e consultoria técnica para empresas e empreendedores.

Copy em primeira pessoa, direta e factual. Descrever o trabalho e o uso da solução. Evitar slogans de transformação, promessas de conversão ou ganhos sem dados, tom de agência e listas de tecnologias como argumento comercial.

A copy vigente em português e inglês está em `src/i18n/translations.ts`. As descrições e estudos de caso estão em `src/data/projects.ts`.

## Estrutura da home

1. Abertura: nome, atuação, descrição curta e acesso aos projetos e contato.
2. Projetos selecionados: imagens existentes, títulos e descrições curtas.
3. Serviços: quatro linhas — sites, sistemas internos, automações e consultoria.
4. Sobre: retrato existente e experiência em desenvolvimento web e TI.
5. Contato: WhatsApp e formulário.

Não duplicar serviços com uma seção de formatos. O funcionamento da contratação cabe em um parágrafo, sem cards de processo.

## Direção visual

- Preto como fundo principal; `#080808` na apresentação pessoal.
- Branco para títulos e texto com opacidade mínima de 60% sobre preto.
- Ciano `#4cd7f6` em rótulos, estados de foco e interação.
- Geist nos títulos principais e interface; Instrument Serif no nome e título do portfólio.
- Container máximo de 1440 px; padding de 24 px no celular e 80 px a partir de 768 px.
- Bordas discretas e raio de 8 px nos novos controles; sem cards decorativos nos serviços.
- Abertura com grade CSS discreta. Sem quadro de código, canvas ou vídeos de fundo.
- Cursor nativo. Movimentos reduzidos conforme preferência do sistema.

## Projetos e navegação

Preservar seleção, URLs, slugs, posters e previews existentes. Descrições na home devem informar o tipo de entrega e funcionalidades. Tags detalhadas ficam nos estudos de caso.

A navegação contém Projetos, Serviços, Sobre e Contato. Menu compacto até 1023 px, com estado anunciado e fechamento por Escape.

## Contato

O formulário usa a configuração existente `VITE_WEB3FORMS_KEY`. Sem chave, prepara uma mensagem no WhatsApp. Abrir o WhatsApp não equivale a enviar a mensagem: mostrar que ela está pronta e um link para continuar. Com chave, informar sucesso apenas após resposta positiva do serviço.

## Stack e verificações

React + TypeScript + Vite, Tailwind CSS e React Router. Motion permanece nos projetos e cases.

- `npm ci --no-audit --no-fund`
- `npm run build`
- ESLint dos arquivos alterados
- `git diff --check`
- Conferir responsividade, navegação, idioma, previews e formulário em navegador antes de aprovar o layout final.

Produção acompanha a branch `main` na Vercel. Revisões devem ser apresentadas em branch e PR.

Atualizado em 09/10/2026.
