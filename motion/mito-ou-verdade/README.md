# Reels "Mito ou verdade?" (modelo reutilizável)

Reels de 40s em 1080×1920 / 30fps, feito em código (canvas + Playwright + ffmpeg).
Cores do site + terra (`#C4572E`) só para o carimbo MITO. Fonte Inter.
Esta pasta não faz parte do site: o Next.js e a Vercel ignoram ela.

## Roteiro

| Tempo | Cena | Conteúdo |
|---|---|---|
| 0–1,2s | Gancho | "MITO?" / "VERDADE?" piscando em tela cheia |
| 1,2–4s | Abertura | "Você já ouviu isso sobre drone agrícola?" + "Conta quantas você acerta" |
| 4–34s | 5 afirmações (6s cada) | Frase → "pensa aí" com contagem → carimbo MITO / VERDADE / DEPENDE → explicação |
| 34–40s | Final | "Quantas você acertou?", placar com as respostas, logo, WhatsApp, @ e site |

Dentro de cada afirmação: frase em 0–0,6s, contagem até 2,2s, carimbo em 2,4s, explicação de 2,9s até 5,6s.
A trilha acompanha: durante a contagem a batida cai e entra um tique-taque; no carimbo volta tudo com impacto.

## Fazer um vídeo novo

1. Edite **só o bloco `CONFIG`** no topo de `reels.html`.
   - `resposta` aceita `'MITO'`, `'VERDADE'` ou `'DEPENDE'`.
   - Frase: até ~40 caracteres (3 linhas). Explicação: até ~90 caracteres (3 linhas).
   - O número de afirmações pode mudar: a duração do vídeo se ajusta sozinha (6s por item).
     Nesse caso, ajuste `N_ITENS` em `trilha.py` e gere a trilha de novo (veja abaixo).
2. Prévia rápida (quadros em `saida/stills/`):
   ```bash
   cd motion/mito-ou-verdade
   npm install
   npm run previa
   ```
3. Vídeo final com trilha (~13 min): `npm run build` → `saida/reels-final.mp4` e `saida/video_mudo.mp4`.

A pasta `saida/` não vai para o Git. Guarde os vídeos finais no Drive de marketing.

## Requisitos

- Node 18+ e **ffmpeg** no PATH (Windows: `winget install ffmpeg`).
- Se o Playwright pedir navegador: `npx playwright install chromium`.
- Fonte **Inter** instalada (https://rsms.me/inter/).

## Trilha

`assets/trilha.m4a` é original, gerada por `trilha.py` (sem direitos de terceiros).
Para gerar de novo: `npm run trilha` (Python 3 + numpy) e converta:
`ffmpeg -i saida/trilha.wav -c:a aac -b:a 192k assets/trilha.m4a`.

## Conteúdo técnico validado pela equipe (out/2026)

- Atendimento a partir de 1 ha.
- Calda: 10 a 15 L/ha no drone, contra 100 L/ha ou mais no pulverizador terrestre.
- Deriva e aplicação após chuva: resposta "DEPENDE", com os fatores que entram na decisão.

Qualquer afirmação nova precisa ser validada pela equipe técnica antes de publicar.
