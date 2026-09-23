export type ProductionStatus = 'ideia' | 'producao' | 'revisao' | 'agendado' | 'publicado'
export const STATUS_LABELS: Record<ProductionStatus, string> = {
  ideia: 'Planejado', producao: 'Em produção', revisao: 'Em revisão', agendado: 'Agendado', publicado: 'Publicado',
}
export interface ScheduledContent {
  feedDate: string; storiesDate: string; driveUrl: string; packageUrl: string;
  assets: { src: string; label: string; format: 'Feed 4:5' | 'Story 9:16' }[];
}
export interface ContentPiece {
  id: string; title: string; format: string; pillar: string; cover: string;
  headline: string; objective: string; direction: string; caption: string; script: string[];
  initialStatus: ProductionStatus; assetUrl?: string; assetLabel?: string;
  publication?: { screenshot: string; dateLabel: string; reviewNote?: string };
  scheduled?: ScheduledContent;
}
export const CONTENT: ContentPiece[] = [
  {
    id: 'carrossel-o-que-muda', title: 'O que muda com o drone', format: 'Carrossel 4:5',
    pillar: 'Educação', cover: 'field', headline: 'O que muda com o drone', initialStatus: 'publicado',
    publication: { screenshot: '/marketing/publicados/carrossel-drone.png', dateLabel: '19 de agosto · conforme print', reviewNote: 'A legenda no print ainda menciona 3 mil hectares e mais de 30 produtores. Atualizar o volume para mais de 5 mil hectares; confirmar o número de produtores antes de reutilizar. Mudança no Instagram ainda não realizada.' },
    objective: 'Explicar os diferenciais do serviço e abrir conversa com produtores de diferentes tamanhos de área.',
    direction: 'Publicação confirmada pelo print enviado por Luis. Capa: “O que muda com o drone”, apoio: “5 diferenças que o produtor sente no bolso”. A imagem recebida mostra a capa, não o conteúdo integral das outras telas. Preservar a identidade de lavoura, verde profundo, numeral lima e tipografia condensada.',
    caption: 'Drone é coisa de fazenda grande?\n\nA Camporiza atende a partir de 1 hectare. Cada área pede uma avaliação: acesso, cultura e condições adequadas de aplicação fazem parte dessa conversa.\n\nDesde 2024, já são mais de 5 mil hectares aplicados. Atendemos no Mato Grosso do Sul.\n\nQuer entender como funciona na sua área? Chame no WhatsApp: (67) 9633-0973.\n\nNa hora certa. No lugar certo.\n\n#Camporiza #DroneAgrícola #AgroMS',
    script: ['Capa observada: O que muda com o drone.', 'Subtítulo observado: 5 diferenças que o produtor sente no bolso.', 'Demais telas: não recebidas; revisar os arquivos originais antes de editar o carrossel.', 'Revisão pendente: atualizar a legenda antiga com o número atual de hectares.'],
  },
  {
    id: 'institucional-5mil', title: 'Mais de 5 mil hectares aplicados', format: 'Post 4:5',
    pillar: 'Autoridade', cover: 'number', headline: '+5 mil', initialStatus: 'publicado',
    publication: { screenshot: '/marketing/publicados/post-5mil.png', dateLabel: 'Publicado · data exata a confirmar' },
    objective: 'Apresentar a experiência da Camporiza a quem chegou ao perfil por indicação.',
    direction: 'Publicação confirmada no print. Arte com drone na lavoura, “Mais de 5.000 hectares aplicados” e “Ajudando produtores a cuidar do campo desde 2024”. O print mostra uma data relativa, por isso a data exata não foi presumida.',
    caption: 'Mais de 5 mil hectares aplicados e uma história construída ao lado de quem produz.\n\nDesde 2024, a Camporiza leva tecnologia e precisão ao campo com drones agrícolas.\n\nQuer conversar sobre a sua área? Fale com nossa equipe: (67) 9633-0973.\n\nCamporiza. Na hora certa. No lugar certo.\n\n#Camporiza #DroneAgrícola #AgriculturaDePrecisão #AgroMS',
    script: ['Imagem de lavoura com drone em aplicação.', 'Destaque principal: mais de 5 mil hectares aplicados.', 'Apoio: ajudando produtores desde 2024.', 'Revisar logo, telefone, legibilidade e acentos.'],
  },
  {
    id: 'reels-dia-a-dia', title: 'Planeja. Decola.', format: 'Reels 9:16',
    pillar: 'Operação real', cover: 'photo', headline: 'Planeja. Decola.', initialStatus: 'publicado',
    publication: { screenshot: '/marketing/publicados/reels-planeja-decola.png', dateLabel: 'Publicado · data exata a confirmar' },
    objective: 'Mostrar os serviços e o dia a dia com imagens reais da operação.',
    direction: 'Reels publicado, confirmado pelo print com a cena “Planeja. Decola.”. Usa imagens do dia a dia da operação e a identidade agro-tech. O vídeo completo já produzido está no Drive; o print não permite verificar toda a edição nem inferir a data exata de publicação.',
    assetUrl: 'https://drive.google.com/file/d/1yTKt8LtDLjB-I7rJ9AXLX5dSUoAUS5mM/view', assetLabel: 'Assistir ao Reels no Drive',
    caption: 'Do preparo do equipamento à aplicação, cada etapa faz parte do nosso trabalho no campo.\n\nUm pouco do dia a dia da Camporiza, levando tecnologia para perto do produtor.\n\nPrecisa de aplicação na sua área? Chame nossa equipe: (67) 9633-0973.\n\nNa hora certa. No lugar certo.\n\n#Camporiza #DroneAgrícola #BastidoresDoAgro #AgroMS',
    script: ['Abrir com a melhor cena real do drone em ação.', 'Mostrar preparação e equipe trabalhando.', 'Alternar detalhes do equipamento com o plano aberto da lavoura.', 'Encerrar com a logo e um convite para conversar.'],
  },
  {
    id: 'reels-higgsfield', title: 'Precisão que chega mais longe', format: 'Reels 9:16',
    pillar: 'Institucional com IA', cover: 'route', headline: 'Na hora certa. No lugar certo.', initialStatus: 'ideia',
    objective: 'Desdobrar o estilo agro-tech da vinheta em um vídeo institucional curto.',
    direction: 'Proposta de 20 segundos, ainda sem geração. Higgsfield com referências do equipamento real; verde profundo, luz natural e movimentos suaves. Cenas de IA são ilustrativas: não usar como registro de serviço realizado nem fabricar depoimentos ou resultados.',
    caption: 'Tecnologia a serviço de quem produz.\n\nLeve mais precisão e eficiência para sua lavoura. Fale com a Camporiza: (67) 9633-0973.\n\nNa hora certa. No lugar certo.\n\nVídeo com cenas ilustrativas criadas com IA.\n\n#Camporiza #TecnologiaNoCampo #DroneAgrícola #AgroMS',
    script: ['0–5s · Lavoura ao amanhecer, movimento de câmera suave.', '5–10s · Detalhe do drone, usando referência do modelo real.', '10–15s · Aplicação ilustrativa e linhas discretas de precisão.', '15–20s · Vinheta com a logo e chamada final.'],
  },
  {
    id: 'carrossel-solo', title: 'Choveu. E agora?', format: 'Carrossel 4:5',
    pillar: 'Choveu', cover: 'rain', headline: 'Solo molhado. Decisão técnica.', initialStatus: 'agendado',
    scheduled: {
      feedDate: '02/09/2026', storiesDate: '03/09/2026',
      driveUrl: 'https://drive.google.com/drive/folders/1Fg-dN-vmiXixE4IsabbHyW8fo0esd0Jx',
      packageUrl: 'https://drive.google.com/file/d/11OkjbZ4XCuPVn6SA7Bw0UGBv2WEOpR3d/view',
      assets: [
        { src: '/marketing/planejados/choveu/01-capa-choveu.png', label: 'Capa · Choveu. E agora?', format: 'Feed 4:5' },
        { src: '/marketing/planejados/choveu/02-acesso-limitado.png', label: 'Acesso à área', format: 'Feed 4:5' },
        { src: '/marketing/planejados/choveu/03-avaliacao-tecnica.png', label: 'Avaliação técnica', format: 'Feed 4:5' },
        { src: '/marketing/planejados/choveu/04-cta-orcamento.png', label: 'CTA · Orçamento', format: 'Feed 4:5' },
        { src: '/marketing/planejados/choveu/story-01-choveu.png', label: 'Story · Choveu?', format: 'Story 9:16' },
        { src: '/marketing/planejados/choveu/story-02-avaliacao.png', label: 'Story · Avaliação', format: 'Story 9:16' },
        { src: '/marketing/planejados/choveu/story-03-cta-orcamento.png', label: 'Story · CTA', format: 'Story 9:16' },
      ],
    },
    objective: 'Explicar uma situação de compra sem prometer que o drone pode operar em qualquer condição.',
    direction: 'Pacote finalizado com uma imagem-base realista gerada no Higgsfield e acabamento no design system da Camporiza. O feed terá quatro telas em 4:5 no dia 02/09; a sequência de três stories com CTA para orçamento entra em 03/09. A arte não promete aplicação durante chuva: avaliação técnica e condições adequadas vêm antes da operação.',
    caption: 'Choveu. E agora?\n\nDepois da chuva, o solo encharcado pode dificultar o acesso de máquinas e apertar o planejamento da operação.\n\nMas a decisão não depende apenas do solo. Vento, chuva, cultura e as condições da área precisam ser avaliados antes de cada aplicação.\n\nConte para a Camporiza como está a sua área e converse com nossa equipe sobre as possibilidades de atendimento.\n\n📲 Solicite seu orçamento pelo WhatsApp.\n\nNa hora certa. No lugar certo.\n\n#Camporiza #DroneAgrícola #AgriculturaDePrecisão #AgroMS #TecnologiaNoCampo',
    script: ['Feed · 02/09 · quatro telas: capa, acesso, avaliação e CTA.', 'Stories · 03/09 · três telas: situação, critérios e orçamento.', 'Na última tela, adicionar a figurinha com o link do WhatsApp e o texto “Fazer orçamento”.', 'Conferir o número oficial antes de publicar o link.'],
  },
  {
    id: 'post-area-pequena', title: 'Sua área também entra no plano', format: 'Post 4:5',
    pillar: 'Área pequena', cover: 'field', headline: 'Cada área merece atenção.', initialStatus: 'ideia',
    objective: 'Abrir conversa com o pequeno produtor sem publicar preços nem condições não confirmadas.',
    direction: 'Foto real da equipe ou lavoura. Confirmar com os sócios a área mínima de atendimento e a disponibilidade antes de incluir uma oferta específica.',
    caption: 'Cada propriedade tem uma necessidade.\n\nConte para a Camporiza onde fica a sua área e qual serviço você precisa. Nossa equipe conversa com você sobre as possibilidades de atendimento.\n\nChame no WhatsApp: (67) 9633-0973.\n\n#Camporiza #ProdutorRural #DroneAgrícola #AgroMS',
    script: ['Foto real ou imagem claramente ilustrativa.', 'Manchete curta: cada área merece atenção.', 'CTA para consultar atendimento e disponibilidade.'],
  },
  {
    id: 'stories-perguntas', title: 'Qual é o desafio da sua lavoura?', format: 'Stories 9:16',
    pillar: 'Conversa com o produtor', cover: 'question', headline: 'Vamos falar da sua área?', initialStatus: 'ideia',
    objective: 'Coletar perguntas reais que orientem os próximos conteúdos.',
    direction: 'Três telas, texto grande e uma pergunta por tela. Não inventar respostas de clientes. A última tela usa a figurinha de link para o WhatsApp.',
    caption: 'Qual é o maior desafio da sua área hoje?\n\nMande sua dúvida. A equipe da Camporiza quer entender o que você precisa.\n\nFale com a gente: (67) 9633-0973.',
    script: ['Tela 1 · Qual é o desafio da sua lavoura?', 'Tela 2 · Caixinha para receber dúvidas reais.', 'Tela 3 · Link do WhatsApp e convite para conversar.'],
  },
]

export interface PieceProgress { status: ProductionStatus; date: string; notes: string; checks: string[]; approved: boolean }
export type PlannerState = Record<string, PieceProgress>
/** Evidência de publicação não apaga notas ou status legados do navegador. */
export function statusFor(piece: ContentPiece, progress: PieceProgress): ProductionStatus {
  if (piece.publication) return 'publicado'
  if (progress.status === 'publicado') return 'publicado'
  if (piece.scheduled) return 'agendado'
  return progress.status
}
export const CHECKS = ['Texto e acentos revisados', 'Logo e telefone conferidos', 'Imagem e informações validadas', 'Formato testado no celular']
export function defaultPlanner(): PlannerState {
  return Object.fromEntries(CONTENT.map(p => [p.id, { status: p.initialStatus, date: '', notes: '', checks: [], approved: !!p.publication }]))
}
export function validatePlanner(raw: unknown): PlannerState | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  if (!CONTENT.some(p => Object.prototype.hasOwnProperty.call(raw, p.id))) return null
  const defaults = defaultPlanner()
  for (const piece of CONTENT) {
    const value = (raw as Record<string, unknown>)[piece.id]
    if (value === undefined) continue
    if (!value || typeof value !== 'object') return null
    const v = value as Record<string, unknown>
    if (typeof v.status !== 'string' || !Object.prototype.hasOwnProperty.call(STATUS_LABELS, v.status) ||
      typeof v.date !== 'string' || (v.date !== '' && !/^\d{4}-\d{2}-\d{2}$/.test(v.date)) ||
      typeof v.notes !== 'string' || v.notes.length > 5000 || !Array.isArray(v.checks) ||
      (v.approved !== undefined && typeof v.approved !== 'boolean') ||
      v.checks.some(c => typeof c !== 'string' || !CHECKS.includes(c))) return null
    if (v.date) {
      const parsed = new Date(v.date + 'T12:00:00Z')
      if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== v.date) return null
    }
    defaults[piece.id] = {
      status: v.status as ProductionStatus,
      date: v.date,
      notes: v.notes,
      checks: Array.from(new Set(v.checks as string[])),
      approved: typeof v.approved === 'boolean' ? v.approved : defaults[piece.id].approved,
    }
  }
  return defaults
}
