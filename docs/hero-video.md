# Vídeos controlados pelo scroll e previews dos projetos

Referência técnica da mídia usada na hero (`src/components/Hero.tsx`), na seção "O que eu desenvolvo" (`src/components/ServicesVideo.tsx`), na seção "Sobre" (`src/components/About.tsx`) e nos previews dos cards (`src/components/Portfolio.tsx`). O controlador comum está em `src/lib/scrollScrub.ts`.

## Original da hero

- Fonte: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_230900_ef8565a6-16eb-4fe9-98e4-4b972d3f436d.mp4`
- SHA-256: `b65e059cc3bf09f7b082e4ea58ae9837bc6832310d0c5a3117e67b2078f2bf3d`
- H.264 High, 1920×1080, 24 fps, 241 frames, 10,04 s, yuv420p, sem áudio, 9,8 MB.
- **Um único keyframe** (o primeiro frame). Buscar um instante no fim do arquivo obriga o decoder a decodificar tudo desde o início, por isso o original não serve para scrubbing.
- O original não é versionado no repositório. As versões abaixo mantêm os 241 frames, a duração, a cor e, no desktop, a resolução original.

## Versões para scrubbing

| Arquivo | Dimensões | Tamanho | Keyframes |
|---|---|---|---|
| `public/hero/hero-scrub-desktop.mp4` | 1920×1080 | 6,4 MB (6.722.585 B) | 41 (a cada 6 frames, 0,25 s) |
| `public/hero/hero-scrub-mobile.mp4` | 608×1080 (recorte central 9:16) | 2,6 MB (2.684.370 B) | 41 (a cada 6 frames) |
| `public/hero/hero-poster-desktop.webp` | 1920×1080 | 170 KB | frame 0 |
| `public/hero/hero-poster-mobile.webp` | 608×1080 | 57 KB | frame 0, mesmo recorte |

Todas em H.264 High, `yuv420p`, `+faststart` (moov antes do mdat), sem B-frames e sem áudio.

### Estratégia de keyframes

All-intra foi testado e descartado. O vídeo tem flores com muito detalhe, que comprimem mal sem predição entre frames:

| Teste (1920×1080 salvo indicação) | Tamanho | SSIM vs. original |
|---|---|---|
| all-intra, CRF 22 | 16,1 MB | 0,986 |
| all-intra, CRF 26 | 11,5 MB | 0,979 |
| all-intra 1280×720, CRF 26 | 6,8 MB | 0,963 |
| **GOP 6, CRF 25, sem B-frames (escolhido)** | **6,4 MB** | **0,990** |
| GOP 12, CRF 21 | 8,6 MB | 0,993 |
| GOP 8 1600×900, CRF 25 | 4,6 MB | 0,987 |

GOP 6 sem B-frames limita qualquer seek a no máximo 5 frames P após o keyframe anterior. Com o arquivo inteiro em memória, isso decodifica rápido e mantém a resolução original com qualidade maior que o all-intra do mesmo tamanho.

### Comandos

```bash
SRC=hero-original.mp4
COMMON="-an -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -preset slow -bf 0 -sc_threshold 0"

# Desktop — resolução original
ffmpeg -i $SRC $COMMON -g 6 -keyint_min 6 -crf 25 public/hero/hero-scrub-desktop.mp4

# Mobile — recorte central 9:16, sem reescala (a figura fica centralizada em todo o vídeo)
ffmpeg -i $SRC $COMMON -vf "crop=608:1080:656:0" -g 6 -keyint_min 6 -crf 25 public/hero/hero-scrub-mobile.mp4

# Posters — frame 0, igual ao primeiro frame do scrubbing
ffmpeg -i $SRC -vf "select=eq(n\,0)" -frames:v 1 -c:v libwebp -quality 74 public/hero/hero-poster-desktop.webp
ffmpeg -i $SRC -vf "select=eq(n\,0),crop=608:1080:656:0" -frames:v 1 -c:v libwebp -quality 76 public/hero/hero-poster-mobile.webp

# Conferência
ffprobe -v error -select_streams v:0 -skip_frame nokey -show_entries frame=pts_time -of csv=p=0 public/hero/hero-scrub-desktop.mp4 | wc -l   # 41
```

## Como a hero usa o vídeo

- O progresso é local à hero: `-track.top / (track.height - stage.height)`. A altura total da página não entra no cálculo.
- Altura da hero: 270svh a partir de 768 px e 210svh abaixo disso. Com "reduzir movimento", a hero ocupa 100svh e não há vídeo.
- O corte vertical é usado quando a tela tem proporção até 7:10 (celular em pé). Tablets em pé (768×1024) usam o 16:9.
- O arquivo é baixado inteiro com `fetch` (prioridade baixa) e vira um object URL. A porcentagem só aparece quando há `Content-Length` sem compressão. Se o `fetch` falhar, o elemento carrega a URL direto.
- O vídeo não é baixado com Save-Data, em conexão 2G ou quando o navegador não decodifica H.264. Nesses casos fica o poster.
- O playhead se aproxima do alvo com suavização. Só um seek fica pendente por vez e o seguinte vai para o alvo mais recente. Sem movimento, o loop para e o vídeo fica pausado no frame correspondente.

## Vídeo de "O que eu desenvolvo"

### Original

- Fonte: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4`
- SHA-256: `5c4e2424b9a8aff6ff44a11fae9fa56a35e1ed3dab741543b9040f903820e0bb`
- H.264 Main, 1572×1316, 24 fps, 289 frames, 12,04 s, yuv420p, sem áudio, 20,7 MB, **um único keyframe**. Não é versionado nem referenciado pelo site.
- Fundo preto puro (0,0,0) à direita, embaixo e nos cantos, exceto um halo dourado estático no canto superior esquerdo que desce pela borda esquerda até ~45% da altura.
- A ilha ocupa, somando todos os frames, x 20–90% e y 19–80% do quadro: nada encosta nas bordas.

### Versões

| Arquivo | Dimensões | Tamanho | Keyframes |
|---|---|---|---|
| `public/services/services-scrub-desktop.mp4` | 1180×988 | 3,8 MB (4.004.022 B) | 49 (a cada 6 frames) |
| `public/services/services-scrub-mobile.mp4` | 786×658 | 2,2 MB (2.281.088 B) | 49 (a cada 6 frames) |
| `public/services/services-poster.webp` | 1180×988 | 61 KB | frame 0 |

Quadro inteiro (sem recorte), H.264 High, yuv420p, `+faststart`, sem B-frames. A coluna exibe no máximo ~620 px de largura, então 1180 px cobre telas 2x. Comparação a 1180×988: GOP 6 CRF 26 = 3,4 MB, SSIM 0,989; all-intra CRF 26 = 8,3 MB, SSIM 0,979.

```bash
SRC=services-original.mp4
COMMON="-an -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -preset slow -bf 0 -sc_threshold 0"
ffmpeg -i $SRC $COMMON -vf scale=1180:988:flags=lanczos -g 6 -keyint_min 6 -crf 25 public/services/services-scrub-desktop.mp4
ffmpeg -i $SRC $COMMON -vf scale=786:658:flags=lanczos -g 6 -keyint_min 6 -crf 25 public/services/services-scrub-mobile.mp4
ffmpeg -i $SRC -vf "select=eq(n\,0),scale=1180:988:flags=lanczos" -frames:v 1 -c:v libwebp -quality 80 public/services/services-poster.webp
```

### Máscara

Seis camadas de `mask-image` intersectadas (o alfa final é o produto), em `.services-media` no `index.css`: elipse suave em torno da ilha, fades no topo, na esquerda, na direita e embaixo, e uma elipse que atenua o núcleo do halo. As rampas usam várias paradas para aproximar uma curva smoothstep e evitar uma "linha" onde o fade começa.

Os parâmetros foram ajustados em Python sobre 37 frames reais:
- a ilha mantém alfa ≥ 0,99 em 99,9% dos seus pixels, em todos os frames;
- o halo dourado vira uma luz difusa junto à ilha e chega a zero antes das bordas. Ele encosta no canto superior esquerdo da ilha, então eliminá-lo por completo escureceria as flores.

No navegador, com só a mídia visível, a faixa de 3 px na borda do vídeo fica em luminância 0–1 (de 255) em todos os frames, nas cinco larguras testadas.

### Comportamento

- Progresso pela passagem do vídeo na viewport (`passageProgress`): 0 quando o topo do vídeo está a 95% da altura da tela, 1 quando a base chega a 5%. A seção mantém a altura natural, sem trilho sticky; os 12 s correspondem a ~1.300 px de rolagem no desktop e ~1.100 px no celular.
- Download só quando a seção está a cerca de uma tela de distância (`IntersectionObserver` com `rootMargin: 100%`). Mesmas regras da hero: fetch em memória com prioridade baixa, sem download com Save-Data, 2G ou sem H.264, poster mantido em caso de erro.
- Pausa fora da viewport e com a aba oculta. "Reduzir movimento": poster estático, sem vídeo.
- Layout: no desktop fica sob título e descrição, avançando sobre a margem da página e um pouco sobre o espaço entre as colunas; no celular ocupa a largura toda, entre descrição e lista, com o quadro completo.

## Vídeo de "Sobre"

### Original

- Fonte: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260802_081931_d0adfc37-7ace-4c83-939e-4a6e0e9d9763.mp4`
- SHA-256: `733d7bc89de5df33716eebc1c966cc943dee1dfdb60aa04d2d0972c618b224de`
- H.264 High, 1920×1080, 24 fps, 121 frames, 5,04 s, yuv420p, sem áudio, 6,4 MB, **um único keyframe**. Não é versionado nem referenciado pelo site.
- Fundo claro e frio (~#EEF1F5 no topo e nas laterais). A figura e a mão ocupam sobretudo x 33–83% do quadro; a mão passa rápido em primeiro plano nos frames 10–35.

### Versões

| Arquivo | Dimensões | Tamanho | Keyframes |
|---|---|---|---|
| `public/about/about-scrub-desktop.mp4` | 1920×1080 | 2,5 MB (2.598.335 B) | 21 (a cada 6 frames) |
| `public/about/about-scrub-mobile.mp4` | 900×900 (recorte central 1:1, x 420–1500) | 1,6 MB (1.703.403 B) | 21 (a cada 6 frames) |
| `public/about/about-poster-desktop.webp` | 1920×1080 | 45 KB | frame 0 |
| `public/about/about-poster-mobile.webp` | 900×900 | 37 KB | frame 0, mesmo recorte |

H.264 High, yuv420p, `+faststart`, sem B-frames. Comparação a 1920×1080: GOP 6 CRF 26 = 1,9 MB, SSIM 0,989; all-intra CRF 26 = 3,8 MB, SSIM 0,989 (mesma qualidade com o dobro do tamanho).

```bash
SRC=about-original.mp4
COMMON="-an -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -preset slow -bf 0 -sc_threshold 0"
ffmpeg -i $SRC $COMMON -g 6 -keyint_min 6 -crf 24 public/about/about-scrub-desktop.mp4
ffmpeg -i $SRC $COMMON -vf "crop=1080:1080:420:0,scale=900:900:flags=lanczos" -g 6 -keyint_min 6 -crf 23 public/about/about-scrub-mobile.mp4
ffmpeg -i $SRC -vf "select=eq(n\,0)" -frames:v 1 -c:v libwebp -quality 78 public/about/about-poster-desktop.webp
ffmpeg -i $SRC -vf "select=eq(n\,0),crop=1080:1080:420:0,scale=900:900:flags=lanczos" -frames:v 1 -c:v libwebp -quality 80 public/about/about-poster-mobile.webp
```

### Composição e leitura

- Posição dos textos medida nos frames de cada momento, já com o recorte de um viewport 1440×900. A faixa superior (y 10–35% do quadro) só tem a malha branca; abaixo dela aparecem dedos e anéis.
- Primeiro momento à esquerda e segundo à direita, ambos no terço superior. O bloco da direita tem 22rem e começa logo abaixo da navbar; isso reduziu a área com mão ou anéis sob o texto de 19% para 11% em média (pico de 39% para 28%) em relação a um bloco de 25rem mais abaixo.
- Uma luz suave localizada atrás de cada grupo entra e sai junto com o texto.
- No navegador, com o texto transparente, o fundo atrás de cada bloco no pior frame tem luminância (percentil 5) 204 no primeiro momento e 183 no segundo, em 1440 px: contraste ≈11,6:1 e ≈9,3:1 com o texto #111317.
- Telas de proporção intermediária (≥900 px de largura e entre 1:1 e 1,45, como 1024×768 e 1280×1024): coluna de texto à esquerda e vídeo à direita.
- Celulares e tablets em retrato: vídeo em cima e os dois momentos na mesma área de texto abaixo, sem alternância lateral. No celular é usado o recorte 1:1.

### Comportamento

- Trilha de 210svh com palco sticky de 100svh. Progresso só pela trilha (`stickyProgress`); a âncora `#about` está na trilha, então a navegação pousa no palco já fixado, com o primeiro momento visível.
- Janelas de progresso: primeiro momento 0–0,42 (o título já aparece fixado); segundo momento entra entre 0,44 e 0,61 e fica até 0,90–0,98.
- Entrada e saída: faixas de 16svh, com curva suavizada, do preto até a cor do fundo do vídeo. No fim, a base do palco clareia até essa cor antes de liberar.
- Download quando a seção está a cerca de uma tela de distância. Pausa fora da seção e com a aba oculta.
- Movimento reduzido, navegador sem H.264, Save-Data/2G ou falha de carregamento: composição estática com poster (frame 0, laterais livres) e toda a copy, sem trilha longa.

## Previews dos projetos

Os vídeos em `public/video/*.mp4` são gravações de tela completas (33–40 MB, ~1908×908, 30 fps, com áudio). Eles continuam no repositório e no campo `video` de `projects.ts`, mas o card nunca os carrega quando existe poster. Os previews são trechos curtos recortados na proporção do card:

| Projeto | Trecho | Recorte (x, largura) | Desktop | Mobile |
|---|---|---|---|---|
| Bonitos Car | 1,9–9,9 s | 100, 1450 (16:10) | 1152×720, 735 KB | 768×480, 300 KB |
| Barbearia Marques | 3,5–11,5 s (pula o loader) | 248, 1140 (5:4) | 900×720, 455 KB | 600×480, 192 KB |
| Aetheria | 0–8,5 s | 300, 1136 (5:4) | 900×720, 443 KB | 600×480, 207 KB |
| Être Creative | 7,2–14,2 s (depois do pop-up) | 222, 1456 (16:10) | 1152×720, 576 KB | 768×480, 258 KB |

O deslocamento horizontal de cada recorte mantém os títulos do site inteiros. Être não tinha poster; `poster-frame.webp` é o frame de 1 s da própria gravação (hero do site), no mesmo recorte do preview.

```bash
COMMON="-an -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart -preset slow -g 48"
# exemplo: Marques
ffmpeg -ss 3.5 -t 8 -i public/video/barbearia-marques.mp4 $COMMON -vf "crop=1140:912:248:0,scale=900:720:flags=lanczos" -crf 26 public/portfolio/marques/preview-desktop.mp4
ffmpeg -ss 3.5 -t 8 -i public/video/barbearia-marques.mp4 $COMMON -vf "crop=1140:912:248:0,scale=600:480:flags=lanczos" -crf 28 public/portfolio/marques/preview-mobile.mp4
# poster do Être
ffmpeg -ss 1 -i public/video/etre-creative.mp4 -frames:v 1 -vf "crop=1456:910:222:0" -c:v libwebp -quality 82 public/portfolio/etre-creative/poster-frame.webp
```

Comportamento: hover e foco de teclado no desktop; botão "Reproduzir prévia" no toque e com "reduzir movimento". Um preview ativo por vez. Pausa ao sair do card, ao rolar o card para fora da tela e ao esconder a aba. O `<video>` só é criado na primeira ativação, então nenhum preview é baixado na abertura da página.

Atualizado em 10/10/2026.
