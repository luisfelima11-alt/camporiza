# Reels "O calendário da soja" (modelo reutilizável)

Reels de 40s em 1080×1920 / 30fps, feito em código (canvas + Playwright + ffmpeg).
Cores do site, fonte Inter. Conteúdo para **salvar**: mostra, mês a mês, onde o drone entra na safra.
Esta pasta não faz parte do site: o Next.js e a Vercel ignoram ela.

## Roteiro

| Tempo | Cena | Conteúdo |
|---|---|---|
| 0–5s | Abertura | Foto da lavoura, chip "Salve pra consultar", "O calendário da soja", régua de meses |
| 5–35s | 6 fases (5s cada) | Régua AGO–MAR destaca os meses; a soja cresce; o drone passa aplicando; cartão com fase e explicação |
| 35–40s | Final | "Salva esse vídeo", logo, WhatsApp, @ e site |

Fases (calendário típico, a validar com a equipe técnica antes de publicar):

| Meses | Fase |
|---|---|
| AGO–SET | Dessecação pré-plantio |
| SET–NOV | Pré-emergente (a soja só nasce depois da aplicação) |
| OUT–DEZ | Pós-emergente |
| NOV–JAN | Fungicida (destaque: lavoura fechada, o drone aplica sem amassar) |
| DEZ–FEV | Inseticida |
| JAN–MAR | Colheita |

Aviso fixo na tela: "Épocas variam por região e cultivar. Sempre com recomendação agronômica."

## Fazer outra cultura (milho, cana, pastagem...)

1. Edite **só o bloco `CONFIG`** em `reels.html`:
   - `meses`: até 8 meses na régua.
   - `fases`: `de`/`ate` (índices em `meses`), `titulo`, `texto`, `nota` (opcional),
     `planta` (estágio da planta no fim da fase, de 0 a 1), `drone`, `daninhas`, `cresceDepois`.
   - A duração se ajusta sozinha (5s por fase). Se mudar o número de fases, ajuste
     `N_FASES` e `DRONE` em `trilha.py` e gere a trilha de novo.
   - O desenho da planta é de soja. Para outra cultura, troque a função `soja()`.
2. Prévia: `npm install` e depois `npm run previa` (quadros em `saida/stills/`).
3. Vídeo final (~13 min): `npm run build` → `saida/reels-final.mp4` e `saida/video_mudo.mp4`.

## Requisitos

- Node 18+ e **ffmpeg** no PATH (Windows: `winget install ffmpeg`).
- Se o Playwright pedir navegador: `npx playwright install chromium`.
- Fonte **Inter** instalada (https://rsms.me/inter/).

## Trilha

`assets/trilha.m4a` é original, gerada por `trilha.py` (96 BPM, um compasso = 2,5s, uma fase = 2 compassos).
Tem um "shhh" de pulverização enquanto o drone passa e uma marcação a cada troca de fase.
Para gerar de novo: `npm run trilha` (Python 3 + numpy), depois
`ffmpeg -i saida/trilha.wav -c:a aac -b:a 192k assets/trilha.m4a`.
