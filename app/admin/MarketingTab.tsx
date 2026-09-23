'use client'

import { useEffect, useState } from 'react'
import MarketingPlanner from './MarketingPlanner'
import {
  CloudRain, Ruler, Mountain, Timer, Bug, Instagram, Sparkles,
  Bookmark, Share2, MessageCircle, HeartOff, Megaphone, Palette,
  Type, LayoutGrid, Check, AlertTriangle, Sun, Moon, Image as ImageIcon,
} from 'lucide-react'

/* ══════════════════════════════════════════════════════════════════
   Plano de marketing · Instagram @camporiza_
   Fonte: CONTEXT.md do projeto. Este painel é a versão operacional
   do plano — o que fazer nesta semana, não o documento inteiro.
   ══════════════════════════════════════════════════════════════════ */

// Paleta do design system do Instagram (diferente do chrome do admin)
const MKT = {
  deep: '#0F3D24',
  inst: '#2E7D32',
  lima: '#8CC63F',
  palha: '#F5F1E6',
}

const ls = {
  get<T>(k: string, fb: T): T {
    if (typeof window === 'undefined') return fb
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb } catch { return fb }
  },
  set(k: string, v: unknown) {
    try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* quota */ }
  },
}

// ── Fases da safra (MS 2026) ───────────────────────────────────────
interface Fase {
  id: string
  nome: string
  periodo: string
  objetivo: string
  ini: string
  fim: string
}

const FASES: Fase[] = [
  {
    id: 'f1', nome: 'Apresentação', periodo: '01/ago a 15/set',
    objetivo: 'Entrar no radar enquanto a lavoura está vazia e o produtor planeja a safra.',
    ini: '2026-08-01', fim: '2026-09-15',
  },
  {
    id: 'f2', nome: 'Operação', periodo: '16/set a 15/out',
    objetivo: 'Estar presente na urgência da semeadura, quando a janela aperta.',
    ini: '2026-09-16', fim: '2026-10-15',
  },
  {
    id: 'f3', nome: 'Diferencial', periodo: '16/out a 30/nov',
    objetivo: 'Chuva de outubro: o drone entra onde o pulverizador não entra.',
    ini: '2026-10-16', fim: '2026-11-30',
  },
]

const CICLO_INI = '2026-08-01'
const CICLO_FIM = '2026-11-30'

function hoje() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Cuiaba' }).format(new Date()) }

function faseAtual(d: string) { return FASES.find(f => d >= f.ini && d <= f.fim) ?? null }

function progressoCiclo(d: string) {
  const t = (s: string) => new Date(s + 'T12:00:00').getTime()
  const p = (t(d) - t(CICLO_INI)) / (t(CICLO_FIM) - t(CICLO_INI))
  return Math.min(100, Math.max(0, p * 100))
}

// ── Situações de compra (category entry points) ────────────────────
interface Situacao {
  id: string
  nome: string
  gatilho: string
  icon: React.ElementType
}

const SITUACOES: Situacao[] = [
  { id: 'chuva', nome: 'Choveu', gatilho: 'Solo encharcado, a máquina atola', icon: CloudRain },
  { id: 'pequena', nome: 'Área pequena', gatilho: 'Não compensa chamar autopropelido', icon: Ruler },
  { id: 'dificil', nome: 'Terreno difícil', gatilho: 'Barranco, beira de mata, terreno torto', icon: Mountain },
  { id: 'janela', nome: 'Janela apertou', gatilho: 'Falta máquina ou operador na hora certa', icon: Timer },
  { id: 'praga', nome: 'Praga apareceu', gatilho: 'Urgência, precisa aplicar agora', icon: Bug },
]

const META_POR_SITUACAO = 3 // cada situação aparece ~3x nos 90 dias

// ── Grade semanal ──────────────────────────────────────────────────
const GRADE = [
  { dia: 'Seg', tipo: 'stories', label: 'Stories', detalhe: '3 a 5 telas', hora: '6h30 · 18h30' },
  { dia: 'Ter', tipo: 'post', label: 'Arte 1', detalhe: 'Carrossel 3 a 6 telas · 4:5', hora: '11h30' },
  { dia: 'Qua', tipo: 'stories', label: 'Stories', detalhe: '3 a 5 telas', hora: '6h30 · 18h30' },
  { dia: 'Qui', tipo: 'reels', label: 'Reels', detalhe: '15 a 35s vertical', hora: '11h30' },
  { dia: 'Sex', tipo: 'stories', label: 'Stories', detalhe: '3 a 5 telas', hora: '6h30 · 18h30' },
  { dia: 'Sáb', tipo: 'post', label: 'Arte 2', detalhe: 'Post único · 4:5', hora: '11h30' },
  { dia: 'Dom', tipo: 'off', label: '—', detalhe: 'Sem publicação', hora: '' },
]

const TIPO_COR: Record<string, string> = {
  post: 'border-[#8CC63F]/40 bg-[#8CC63F]/10',
  reels: 'border-[#2E7D32]/50 bg-[#2E7D32]/15',
  stories: 'border-white/10 bg-white/[0.03]',
  off: 'border-white/5 bg-transparent',
}

// ── Blocos de stories ──────────────────────────────────────────────
const STORIES = [
  { l: 'A', n: 'Bastidor do dia' },
  { l: 'B', n: 'Caixinha de perguntas' },
  { l: 'C', n: 'Prova social' },
  { l: 'D', n: 'Oferta e agenda' },
  { l: 'E', n: 'Enquete de segmentação' },
  { l: 'F', n: 'Repost do feed' },
  { l: 'G', n: 'Mito ou verdade' },
]

// ── Manchetes sem acento ───────────────────────────────────────────
const MANCHETES = [
  { ruim: 'PULVERIZAÇÃO COM DRONE', bom: 'O QUE MUDA COM O DRONE' },
  { ruim: 'NÃO AMASSA A LAVOURA', bom: 'SEM RASTRO NA LAVOURA' },
  { ruim: 'ENTRA ONDE A MÁQUINA NÃO ENTRA', bom: 'BARRANCO, MATA, SOLO MOLHADO' },
  { ruim: 'VOCÊ RECEBE LAUDO', bom: 'COM MAPA DE COBERTURA' },
  { ruim: 'NÃO PRECISA COMPRAR NADA', bom: 'A PARTIR DE 1 HECTARE' },
]

// ── Distribuição sem verba ─────────────────────────────────────────
const CANAIS = [
  'Compartilhar conteúdos relevantes com clientes que aceitaram recebê-los no WhatsApp',
  'Status de WhatsApp do Omar e do Pedro',
  '@camporiza_ no adesivo da caminhonete, cartão e assinatura',
  'Parceria com 2 a 3 lojas de insumo da região',
  'Comentários técnicos em perfis de agro do MS',
]

/* ══════════════════ Peças visuais ══════════════════ */

function Swatch({ hex, nome, uso }: { hex: string; nome: string; uso: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-11 h-11 rounded-lg border border-white/15 flex-shrink-0"
        style={{ background: hex }}
      />
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#F2F7F2] leading-tight">{nome}</p>
        <p className="text-[11px] font-mono text-[#6B7D6B]">{hex}</p>
        <p className="text-[11px] text-[#6B7D6B] leading-tight mt-0.5">{uso}</p>
      </div>
    </div>
  )
}

/** Mini-mockups reais dos 5 templates do feed. */
function TemplatePreview({ id }: { id: string }) {
  const base = 'w-full aspect-[4/5] rounded-lg overflow-hidden border border-white/10 flex flex-col'
  if (id === 'T1') return (
    <div className={base} style={{ background: `linear-gradient(to top, ${MKT.deep} 42%, #2b4a33 100%)` }}>
      <div className="flex-1" />
      <div className="p-2">
        <div className="h-1.5 w-4/5 rounded-sm mb-1" style={{ background: MKT.palha }} />
        <div className="h-1.5 w-3/5 rounded-sm" style={{ background: MKT.palha }} />
      </div>
    </div>
  )
  if (id === 'T2') return (
    <div className={base} style={{ background: MKT.deep }}>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-3/4 space-y-1">
          <div className="h-2 w-full rounded-sm" style={{ background: MKT.palha }} />
          <div className="h-2 w-2/3 rounded-sm" style={{ background: MKT.palha }} />
          <div className="h-1 w-1/3 rounded-sm mt-2" style={{ background: MKT.lima }} />
        </div>
      </div>
    </div>
  )
  if (id === 'T3') return (
    <div className={base} style={{ background: MKT.deep }}>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-3xl font-black leading-none" style={{ color: MKT.lima }}>+5 mil</span>
      </div>
      <div className="p-2"><div className="h-1.5 w-3/5 rounded-sm" style={{ background: MKT.palha }} /></div>
    </div>
  )
  if (id === 'T4') return (
    <div className={base} style={{ background: 'linear-gradient(140deg,#3d5a41,#20301f)' }}>
      <div className="flex-1" />
      <div className="p-2 flex justify-end">
        <div className="h-1 w-1/3 rounded-sm opacity-70" style={{ background: MKT.palha }} />
      </div>
    </div>
  )
  return (
    <div className={base} style={{ background: MKT.inst }}>
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="w-full space-y-1">
          <div className="h-2 w-full rounded-sm" style={{ background: MKT.palha }} />
          <div className="h-2 w-1/2 rounded-sm" style={{ background: MKT.palha }} />
        </div>
      </div>
      <div className="p-2">
        <div className="h-3 w-2/3 rounded-full" style={{ background: MKT.lima }} />
      </div>
    </div>
  )
}

const TEMPLATES = [
  { id: 'T1', nome: 'Manchete sobre foto', uso: 'Gradiente verde subindo da base' },
  { id: 'T2', nome: 'Capa de carrossel', uso: 'Verde chapado com textura sutil' },
  { id: 'T3', nome: 'Número ou dado', uso: 'Numeral gigante em lima' },
  { id: 'T4', nome: 'Foto pura', uso: 'Sem texto, só a assinatura' },
  { id: 'T5', nome: 'Fechamento e CTA', uso: 'Botão de ação em lima' },
]

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#111811] border border-white/8 rounded-2xl ${className}`}>{children}</div>
  )
}

function SecTitle({ icon: Icon, children, nota }: { icon: React.ElementType; children: React.ReactNode; nota?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <Icon size={17} style={{ color: MKT.lima }} />
      <h3 className="font-black text-[#F2F7F2] text-[15px]">{children}</h3>
      {nota && <span className="sm:ml-auto text-[11px] text-[#A8B9AC]">{nota}</span>}
    </div>
  )
}

/* ══════════════════ Componente principal ══════════════════ */

export default function MarketingTab() {
  const [d, setD] = useState(hoje)
  const fase = faseAtual(d)
  const prog = progressoCiclo(d)
  const diaSemana = new Date(d + 'T12:00:00').getDay() // data de Mato Grosso do Sul

  const [usos, setUsos] = useState<Record<string, number>>(() => ls.get('mkt_situacoes', {}))
  const [canais, setCanais] = useState<Record<string, boolean>>(() => ls.get('mkt_canais', {}))

  useEffect(() => {
    const timer = window.setInterval(() => setD(hoje()), 60000)
    return () => window.clearInterval(timer)
  }, [])

  const bump = (id: string, delta: number) => {
    const next = { ...usos, [id]: Math.max(0, (usos[id] ?? 0) + delta) }
    setUsos(next); ls.set('mkt_situacoes', next)
  }
  const toggleCanal = (i: string) => {
    const next = { ...canais, [i]: !canais[i] }
    setCanais(next); ls.set('mkt_canais', next)
  }

  const totalUsos = SITUACOES.reduce((s, x) => s + (usos[x.id] ?? 0), 0)
  const metaTotal = SITUACOES.length * META_POR_SITUACAO
  // Seg=1 … Sáb=6, Dom=0 → índice na GRADE (que começa na Seg)
  const idxHoje = diaSemana === 0 ? 6 : diaSemana - 1

  return (
    <div className="space-y-8 [&_button]:focus-visible:outline [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-[#8CC63F] [&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-[#8CC63F]">

      {/* ═══ FASE DA SAFRA ═══ */}
      <div
        className="rounded-2xl border p-6 sm:p-7"
        style={{
          borderColor: 'rgba(140,198,63,0.25)',
          background: `linear-gradient(135deg, ${MKT.deep} 0%, #111811 62%)`,
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] font-bold mb-1.5" style={{ color: MKT.lima }}>
              Instagram @camporiza_
            </p>
            {fase ? (
              <>
                <h2 className="text-3xl sm:text-4xl font-black text-[#F2F7F2] leading-none">
                  Fase {FASES.indexOf(fase) + 1} · {fase.nome}
                </h2>
                <p className="text-[#9FB3A3] text-sm mt-2 max-w-lg">{fase.objetivo}</p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-black text-[#F2F7F2] leading-none">Fora do ciclo</h2>
                <p className="text-[#9FB3A3] text-sm mt-2">
                  O calendário cobre 01/ago a 30/nov de 2026.
                </p>
              </>
            )}
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-[#6B7D6B] mb-1">Hoje</p>
            <p className="text-lg font-bold text-[#F2F7F2] capitalize">
              {new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
            {fase && <p className="text-xs text-[#6B7D6B] mt-0.5">{fase.periodo}</p>}
          </div>
        </div>

        {/* Linha do tempo das 3 fases */}
        <div className="relative">
          <div className="flex gap-1 mb-2">
            {FASES.map((f, i) => {
              const ativa = fase?.id === f.id
              const passada = fase ? FASES.indexOf(fase) > i : d > f.fim
              return (
                <div key={f.id} className="min-w-0" style={{ flex: (new Date(f.fim + 'T12:00:00').getTime() - new Date(f.ini + 'T12:00:00').getTime()) / 86400000 + 1 }}>
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      background: ativa ? MKT.lima : passada ? MKT.inst : 'rgba(255,255,255,0.10)',
                    }}
                  />
                  <p
                    className="text-[11px] mt-2 font-semibold leading-tight"
                    style={{ color: ativa ? MKT.lima : passada ? '#7f9a83' : '#5C6660' }}
                  >
                    {f.nome}
                  </p>
                  <p className="text-[10px] text-[#5C6660] leading-tight">{f.periodo}</p>
                </div>
              )
            })}
          </div>
          {fase && (
            <div
              className="absolute -top-1 w-0.5 h-3.5 rounded-full"
              style={{ left: `${prog}%`, background: MKT.palha }}
              aria-hidden
            />
          )}
        </div>
      </div>

      <nav aria-label="Seções do plano de marketing" className="flex flex-wrap gap-2 text-xs">
        {[['producao', 'Produção de conteúdo'], ['calendario', 'Calendário e estratégia'], ['identidade', 'Identidade visual'], ['metricas', 'Métricas e distribuição']].map(([id, title]) => <a key={id} href={`#${id}`} className="rounded-lg border border-white/10 px-3 py-2 text-[#C9D6CB] hover:border-[#8CC63F] hover:text-[#8CC63F]">{title}</a>)}
      </nav>

      <MarketingPlanner />

      {/* ═══ GRADE DA SEMANA ═══ */}
      <div id="calendario" className="scroll-mt-20"><Card className="p-4 sm:p-6">
        <SecTitle icon={LayoutGrid} nota="Publicar 11h30 · Stories 6h30 e 18h30">
          Grade da semana
        </SecTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {GRADE.map((g, i) => {
            const eHoje = i === idxHoje
            return (
              <div
                key={g.dia}
                className={`rounded-xl border p-2.5 min-h-[92px] flex flex-col ${TIPO_COR[g.tipo]} ${
                  eHoje ? 'ring-2 ring-[#8CC63F]/60' : ''
                }`}
              >
                <p className={`text-[11px] font-bold mb-1 ${eHoje ? 'text-[#8CC63F]' : 'text-[#6B7D6B]'}`}>
                  {g.dia}{eHoje && ' · hoje'}
                </p>
                <p className="text-[12px] font-bold text-[#F2F7F2] leading-tight">{g.label}</p>
                <p className="text-[10px] text-[#6B7D6B] leading-tight mt-0.5 flex-1">{g.detalhe}</p>
                {g.hora && <p className="text-[10px] text-[#6B7D6B]/70 mt-1">{g.hora}</p>}
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl border border-yellow-500/25 bg-yellow-500/[0.06]">
          <AlertTriangle size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#C9D6CB] leading-relaxed">
            <span className="font-bold text-yellow-400">Operação real como prova. IA como ilustração.</span>{' '}
            Use os vídeos reais nos bastidores e serviços. O Higgsfield pode complementar peças
            institucionais, com cenas identificadas como ilustrativas. Nunca apresente IA como registro de uma aplicação realizada.
          </p>
        </div>
      </Card></div>

      {/* ═══ SITUAÇÕES DE COMPRA ═══ */}
      <Card className="p-6">
        <SecTitle icon={Sparkles} nota={`${totalUsos} de ${metaTotal} usos no ciclo`}>
          As 5 situações de compra
        </SecTitle>
        <p className="text-xs text-[#6B7D6B] mb-5 max-w-2xl leading-relaxed">
          Ninguém acorda querendo contratar pulverização. A procura nasce de uma situação concreta.
          Cada uma deve aparecer cerca de {META_POR_SITUACAO} vezes neste ciclo, com abordagens diferentes.
          Repetir poucas ideias constrói mais lembrança do que variar muitas.
        </p>

        <div className="space-y-2.5">
          {SITUACOES.map(s => {
            const n = usos[s.id] ?? 0
            const pct = Math.min(100, (n / META_POR_SITUACAO) * 100)
            const completo = n >= META_POR_SITUACAO
            return (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/[0.02]">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: completo ? `${MKT.lima}22` : 'rgba(255,255,255,0.05)' }}
                >
                  <s.icon size={16} style={{ color: completo ? MKT.lima : '#8AA08E' }} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#F2F7F2] leading-tight">{s.nome}</p>
                  <p className="text-[11px] text-[#6B7D6B] leading-tight">{s.gatilho}</p>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-1.5 max-w-[220px]">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, background: completo ? MKT.lima : MKT.inst }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => bump(s.id, -1)}
                    className="w-7 h-7 rounded-lg border border-white/10 text-[#6B7D6B] hover:text-[#F2F7F2] hover:border-white/25 transition-colors text-sm leading-none"
                    aria-label={`Menos um uso de ${s.nome}`}
                  >−</button>
                  <span className="w-10 text-center text-sm font-black tabular-nums text-[#F2F7F2]">
                    {n}<span className="text-[#6B7D6B] font-normal">/{META_POR_SITUACAO}</span>
                  </span>
                  <button
                    onClick={() => bump(s.id, 1)}
                    className="w-7 h-7 rounded-lg text-white transition-colors text-sm leading-none"
                    style={{ background: MKT.inst }}
                    aria-label={`Mais um uso de ${s.nome}`}
                  >+</button>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* ═══ DESIGN SYSTEM ═══ */}
      <div id="identidade" className="grid lg:grid-cols-2 gap-5 scroll-mt-20">
        <Card className="p-6">
          <SecTitle icon={Palette}>Paleta do Instagram</SecTitle>
          <div className="grid grid-cols-2 gap-4">
            <Swatch hex={MKT.deep} nome="Verde profundo" uso="Fundo dominante" />
            <Swatch hex={MKT.inst} nome="Verde institucional" uso="Secundário" />
            <Swatch hex={MKT.lima} nome="Verde-lima" uso="Só destaque · 1 por peça" />
            <Swatch hex={MKT.palha} nome="Palha" uso="Texto sobre verde" />
          </div>

          <div className="mt-5 pt-5 border-t border-white/8">
            <div className="flex items-center gap-2 mb-2">
              <Type size={14} className="text-[#6B7D6B]" />
              <p className="text-xs font-bold text-[#F2F7F2] uppercase tracking-wider">Tipografia</p>
            </div>
            <p className="text-xs text-[#6B7D6B] leading-relaxed">
              Manchete: sans condensada, bold, caixa alta, no máximo 7 palavras.
              Corpo: sans regular. Máximo 2 famílias por peça.
            </p>
          </div>

          <div className="mt-5 pt-5 border-t border-white/8">
            <p className="text-[11px] uppercase tracking-wider text-[#6B7D6B] mb-2 font-bold">Frase fixa</p>
            <p className="text-lg font-black" style={{ color: MKT.lima }}>
              Na hora certa. No lugar certo.
            </p>
            <p className="text-[11px] text-[#6B7D6B] mt-1.5 leading-relaxed">
              Nas peças de fechamento, no adesivo da caminhonete, na assinatura de WhatsApp
              e no rodapé do laudo. A repetição é o mecanismo.
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <SecTitle icon={ImageIcon} nota="Formato 4:5">Templates do feed</SecTitle>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {TEMPLATES.map(t => (
              <div key={t.id}>
                <TemplatePreview id={t.id} />
                <p className="text-[10px] font-bold text-[#F2F7F2] mt-1.5 leading-tight">{t.id}</p>
                <p className="text-[9px] text-[#6B7D6B] leading-tight">{t.nome}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-white/8">
            <p className="text-[11px] uppercase tracking-wider text-[#6B7D6B] mb-2.5 font-bold">
              Ritmo da grade
            </p>
            <p className="text-xs text-[#6B7D6B] leading-relaxed mb-3">
              Em cada linha de 3 posts: pelo menos uma peça escura e uma foto.
              Nunca 3 escuras nem 3 fotos seguidas.
            </p>
            <div className="grid grid-cols-3 gap-1.5 max-w-[190px]">
              {['dark', 'photo', 'dark', 'photo', 'dark', 'photo', 'dark', 'photo', 'dark'].map((k, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] rounded-md border border-white/10 flex items-center justify-center"
                  style={{
                    background: k === 'dark' ? MKT.deep : 'linear-gradient(140deg,#3d5a41,#20301f)',
                  }}
                >
                  {k === 'dark'
                    ? <Sun size={9} style={{ color: MKT.lima, opacity: 0.55 }} />
                    : <Moon size={9} style={{ color: MKT.palha, opacity: 0.4 }} />}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* ═══ MANCHETES SEM ACENTO ═══ */}
      <Card className="p-6">
        <SecTitle icon={Type} nota="Regra crítica de produção">
          Manchetes sem acento
        </SecTitle>
        <p className="text-xs text-[#6B7D6B] mb-4 max-w-2xl leading-relaxed">
          O gerador de imagem erra caracteres acentuados. A solução é reescrever a manchete
          usando só palavras sem acento. Textos de apoio ainda podem ter acento, mas confira
          sempre antes de publicar.
        </p>
        <div className="space-y-2">
          {MANCHETES.map((m, i) => (
            <div key={i} className="grid sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/[0.05]">
                <span className="text-red-400 flex-shrink-0 text-xs font-bold">✕</span>
                <span className="text-xs text-[#9A8F8F] line-through">{m.ruim}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ borderColor: `${MKT.lima}33`, background: `${MKT.lima}0d` }}>
                <Check size={13} style={{ color: MKT.lima }} className="flex-shrink-0" />
                <span className="text-xs font-bold text-[#F2F7F2]">{m.bom}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ═══ MÉTRICAS ═══ */}
      <div id="metricas" className="grid lg:grid-cols-2 gap-5 scroll-mt-20">
        <Card className="p-6">
          <SecTitle icon={MessageCircle}>O que medir</SecTitle>
          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: `${MKT.lima}12`, border: `1px solid ${MKT.lima}33` }}
          >
            <p className="text-[11px] uppercase tracking-wider font-bold mb-1" style={{ color: MKT.lima }}>
              KPI principal
            </p>
            <p className="text-sm font-bold text-[#F2F7F2] leading-snug">
              Conversas iniciadas no WhatsApp vindas do Instagram
            </p>
            <p className="text-[11px] text-[#6B7D6B] mt-1.5 leading-relaxed">
              Pergunte sempre &quot;como você chegou até a gente?&quot; e registre a resposta.
            </p>
          </div>

          <div className="space-y-2">
            {[
              { icon: Bookmark, n: 'Salvamentos', d: 'Sinal de que o conteúdo tem valor prático' },
              { icon: Share2, n: 'Compartilhamentos', d: 'Sinal de que passou para o vizinho' },
              { icon: MessageCircle, n: 'Cliques no WhatsApp', d: 'Intenção real de contratar' },
            ].map(m => (
              <div key={m.n} className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/8">
                <m.icon size={15} style={{ color: MKT.lima }} className="flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#F2F7F2]">{m.n}</p>
                  <p className="text-[11px] text-[#6B7D6B] leading-tight">{m.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl border border-red-500/20 bg-red-500/[0.05]">
            <HeartOff size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-400">Ignorar curtidas e comentários</p>
              <p className="text-[11px] text-[#6B7D6B] leading-relaxed mt-0.5">
                O perfil tem cerca de 200 seguidores, a maioria amigos e família. Curtida e
                comentário virão da rede pessoal, não do público comprador. São métricas
                contaminadas nas primeiras semanas.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <SecTitle icon={Megaphone} nota="Verba de anúncio: zero">
            Distribuição manual
          </SecTitle>
          <p className="text-xs text-[#6B7D6B] mb-4 leading-relaxed">
            Sem tráfego pago, o alcance vem de canais manuais. Marque o que já está rodando.
          </p>
          <div className="space-y-2">
            {CANAIS.map((c, i) => {
              const on = !!canais[String(i)]
              return (
                <button
                  key={i}
                  onClick={() => toggleCanal(String(i))}
                  aria-pressed={on}
                  className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${
                    on ? 'border-[#8CC63F]/35 bg-[#8CC63F]/[0.07]' : 'border-white/8 hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-4.5 h-4.5 mt-0.5 rounded-md border-2 flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 18, height: 18,
                      borderColor: on ? MKT.lima : 'rgba(255,255,255,0.2)',
                      background: on ? MKT.lima : 'transparent',
                    }}
                  >
                    {on && <Check size={11} className="text-[#0A0E0A]" strokeWidth={3} />}
                  </span>
                  <span className={`text-xs leading-snug ${on ? 'text-[#F2F7F2]' : 'text-[#9FB3A3]'}`}>
                    {c}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-5 pt-5 border-t border-white/8">
            <p className="text-[11px] uppercase tracking-wider text-[#6B7D6B] mb-2.5 font-bold">
              Blocos de stories
            </p>
            <div className="flex flex-wrap gap-1.5">
              {STORIES.map(s => (
                <span
                  key={s.l}
                  className="px-2 py-1 rounded-lg border border-white/10 text-[11px] text-[#9FB3A3]"
                >
                  <span className="font-black" style={{ color: MKT.lima }}>{s.l}</span>
                  {' '}{s.n}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#6B7D6B] mt-2.5 leading-relaxed">
              Toda sequência termina com figurinha de link do WhatsApp.
            </p>
          </div>
        </Card>
      </div>

      {/* ═══ POSICIONAMENTO ═══ */}
      <Card className="p-6">
        <SecTitle icon={Instagram}>Por que o perfil existe</SecTitle>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-[#C9D6CB] leading-relaxed">
              O produtor não descobre fornecedor de pulverização rolando o feed. Ele descobre
              por indicação de vizinho, de agrônomo, ou vendo a operação de perto. O Instagram
              entra depois, no momento em que ele confere se a empresa é séria antes de chamar.
            </p>
            <p className="text-sm text-[#6B7D6B] leading-relaxed mt-3">
              Por isso o objetivo do feed não é alcance. É que qualquer pessoa que abra o perfil
              entenda em 8 segundos que ali é empresa estruturada.
            </p>
          </div>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02]">
              <p className="text-[11px] uppercase tracking-wider font-bold mb-1" style={{ color: MKT.lima }}>
                Feed
              </p>
              <p className="text-xs text-[#9FB3A3] leading-relaxed">
                Fala com o grande produtor. Autoridade técnica, laudo, mapa de cobertura.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-white/8 bg-white/[0.02]">
              <p className="text-[11px] uppercase tracking-wider font-bold mb-1" style={{ color: MKT.lima }}>
                Stories
              </p>
              <p className="text-xs text-[#9FB3A3] leading-relaxed">
                Carrega o pequeno produtor. Acessibilidade, &quot;a partir de 1 hectare&quot;, agenda aberta.
              </p>
            </div>
            <div className="p-3.5 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05]">
              <p className="text-[11px] uppercase tracking-wider font-bold text-yellow-400 mb-1">
                Nunca publicar preço em post
              </p>
              <p className="text-xs text-[#9FB3A3] leading-relaxed">
                Preço ancora o teto antes do produtor entender o que está comprando. Valor só na
                conversa. A exceção é &quot;a partir de 1 hectare&quot;, que é critério de atendimento.
              </p>
            </div>
          </div>
        </div>
      </Card>

    </div>
  )
}
