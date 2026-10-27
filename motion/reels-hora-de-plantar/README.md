# Reels "Hora de Plantar, Hora de Proteger" (modelo reutilizável)

Reels de 30s em 1080×1920 / 30fps, feito em código (canvas + Playwright + ffmpeg).
Usa as cores do site (`#1A4A1A`, `#2D7A2D`, `#4CAF50`, `#6FCF7C`) e a fonte Inter.
Esta pasta não faz parte do site: o Next.js e a Vercel ignoram ela.

## Roteiro (cortes no ritmo da trilha, 120 BPM)

| Tempo | Cena | Conteúdo |
|---|---|---|
| 0–4s | Gancho | Foto da lavoura molhada + chuva + "CHOVEU. E O TRATOR NÃO ENTRA?" |
| 4–7s | Virada | "O DRONE ENTRA." + 3 benefícios |
| 7–16s | Visão do drone | Painel de voo: rota GPS, faixas sendo aplicadas, leituras (faixa, tanque, área) |
| 16–24s | Números | 4 números contando, sobre foto real do drone |
| 24–30s | Assinatura | Logo, slogan, preço, botão do WhatsApp, @ e site |

## Fazer um vídeo novo

1. Abra `reels.html` e edite **só o bloco `CONFIG`** no topo (textos, números, fotos).
   - Troque fotos colocando o arquivo em `assets/` e mudando o caminho em `CONFIG.fotos`.
   - A foto do gancho fica com a parte de baixo escurecida (o texto fica ali).
   - Mantenha os textos curtos: as frases grandes cabem em ~16 caracteres por linha.
2. Veja uma prévia rápida (6 quadros em `saida/stills/`):
   ```bash
   cd motion/reels-hora-de-plantar
   npm install
   npm run previa
   ```
   Também dá para abrir `reels.html` no navegador e rodar `render(10)` no console para ver o segundo 10.
3. Gere o vídeo final com a trilha (leva ~10 min):
   ```bash
   npm run build
   ```
   Saída: `saida/reels-final.mp4` (com música) e `saida/video_mudo.mp4` (sem música, para usar uma música do Instagram).

A pasta `saida/` não vai para o Git. Guarde os vídeos finais no Drive de marketing.

## Requisitos

- Node 18+ e **ffmpeg** no PATH (no Windows: `winget install ffmpeg`).
- Na primeira vez, se o Playwright pedir navegador: `npx playwright install chromium`.
- Fonte **Inter** instalada no computador (https://rsms.me/inter/). Sem ela, o texto cai para Arial.

## Trilha

`assets/trilha.m4a` é uma trilha original gerada por `trilha.py` (sem direitos autorais de terceiros).
Ela está sincronizada com os cortes: impactos em 0s, 4s, 7s, 16s e 24s, transições em 4s, 7s e 24s.
Se mudar os tempos das cenas, gere de novo com `npm run trilha` (precisa de Python 3 + numpy)
e converta `saida/trilha.wav` para `assets/trilha.m4a`.

## Cuidados com o conteúdo

- Os números (hectares, produtores) precisam bater com o que está no site e no Instagram.
- A área do painel (`CONFIG.hud.areaFinalHa`) é ilustrativa.
- Sem drone gerado por IA: o drone animado é o ícone do logo, e a foto do drone é real.
- O botão do WhatsApp desenhado no vídeo não é clicável. No Instagram, coloque o link
  `https://wa.me/5567996330973` na legenda/bio ou numa figurinha de link no story.
