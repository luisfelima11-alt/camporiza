# Reels "Drone na pastagem" (modelo reutilizável)

Reels de 25s em 1080×1920 / 30fps, feito em código (canvas + Playwright + ffmpeg).
Primeiro vídeo da série "uma cultura por vídeo". Fala com o **pecuarista**: o que o drone faz no pasto.
Cores do site, fonte Inter. Esta pasta não faz parte do site.

## Roteiro

| Tempo | Cena | Conteúdo |
|---|---|---|
| 0–5s | Abertura | Foto de pasto degradado (gerada por IA, sem drone), "Seu pasto perdendo força?", chips dos 3 serviços |
| 5–20s | 3 serviços (5s cada) | Drone de perfil passando sobre o pasto. Cada planta reage quando o drone passa por cima |
| 20–25s | Final | Logo, "Recupere seu pasto sem trator dentro da área", serviços, WhatsApp, @ e site |

Serviços e efeitos na animação (o estado do pasto se acumula de uma cena para a outra):

| Serviço | Aplicação | O que acontece no desenho |
|---|---|---|
| Controle de invasoras | líquido (névoa) | Daninhas de folha larga secam e somem |
| Adubação | sólidos (grânulos) | Capim fica mais alto e mais verde. Destaque: sem trator, não compacta o solo |
| Semeadura | sólidos (sementes) | A falha de solo exposto brota com braquiária |

**Confirmar com a equipe antes de publicar** que os 3 serviços são oferecidos em pastagem.

## Fazer outra cultura ou outros serviços

1. Edite **só o bloco `CONFIG`** em `reels.html`:
   - `servicos`: `chip`, `titulo`, `texto`, `nota` (opcional), `tipo` (`'liquido'` ou `'solido'`)
     e `efeito` (`'invasoras'`, `'adubo'` ou `'semente'`). A duração se ajusta sozinha (5s por serviço).
   - Troque a foto em `assets/` e o caminho em `CONFIG.fotos.abertura`.
   - Se mudar o número ou o tipo dos serviços, ajuste `N_FASES` e `SOLIDO` em `trilha.py` e gere a trilha de novo.
2. Prévia: `npm install` e depois `npm run previa` (quadros em `saida/stills/`).
3. Vídeo final (~8 min): `npm run build` → `saida/reels-final.mp4` e `saida/video_mudo.mp4`.

## Requisitos

- Node 18+ e **ffmpeg** no PATH (Windows: `winget install ffmpeg`).
- Se o Playwright pedir navegador: `npx playwright install chromium`.
- Fonte **Inter** instalada (https://rsms.me/inter/).

## Trilha

`assets/trilha.m4a` é original, gerada por `trilha.py` (96 BPM, um serviço = 2 compassos).
Tem névoa de pulverização nos serviços líquidos e um "chuvisco" de grânulos nos sólidos.
Para gerar de novo: `npm run trilha` (Python 3 + numpy), depois
`ffmpeg -i saida/trilha.wav -c:a aac -b:a 192k assets/trilha.m4a`.
