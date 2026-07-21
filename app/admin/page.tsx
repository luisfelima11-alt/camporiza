'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, Phone, ChevronDown, X, TrendingUp, TrendingDown, DollarSign, Users, Target, CheckSquare, Edit2, CalendarClock, AlertTriangle } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────
type Tab = 'home' | 'prospects' | 'clientes' | 'financeiro'

type Status = 'novo' | 'contato' | 'proposta' | 'negociacao' | 'fechado' | 'perdido'

interface Lead {
  id: string
  nome: string
  cidade: string
  hectares: string
  cultura: string
  whatsapp: string
  status: Status
  notas: string
  criadoEm: string
}

interface Todo {
  id: string
  texto: string
  feito: boolean
}

interface Meta {
  id: string
  texto: string
  progresso: number
  meta: number
}

interface Lancamento {
  id: string
  descricao: string
  valor: number
  tipo: 'receita' | 'custo'
  categoria: string
  data: string
}

interface Conta {
  id: string
  descricao: string
  valor: number
  tipo: 'pagar' | 'receber'
  categoria: string
  vencimento: string
  status: 'pendente' | 'pago'
}

// ── Helpers ────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2)
const waLink = (n: string) => `https://wa.me/55${n.replace(/\D/g, '')}`

const STATUS_LABEL: Record<Status, string> = {
  novo: 'Novo', contato: 'Contato feito', proposta: 'Proposta enviada',
  negociacao: 'Negociação', fechado: 'Fechado', perdido: 'Perdido',
}
const STATUS_COLOR: Record<Status, string> = {
  novo: 'bg-blue-500/20 text-blue-400',
  contato: 'bg-yellow-500/20 text-yellow-400',
  proposta: 'bg-purple-500/20 text-purple-400',
  negociacao: 'bg-orange-500/20 text-orange-400',
  fechado: 'bg-green-500/20 text-green-400',
  perdido: 'bg-red-500/20 text-red-400',
}

// ── Input styles ───────────────────────────────────────────────────
const inp = 'w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-[#F2F7F2] placeholder:text-[#6B7D6B] focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]/30 outline-none text-sm transition-all'
const lbl = 'block text-xs font-semibold text-[#6B7D6B] mb-1 uppercase tracking-wider'

// ── PIN Gate ───────────────────────────────────────────────────────
function PinGate({ onAuth }: { onAuth: () => void }) {
  const [pin, setPin] = useState('')
  const [erro, setErro] = useState(false)
  const CORRECT = '1234'

  const check = () => {
    if (pin === CORRECT) { onAuth() }
    else { setErro(true); setPin(''); setTimeout(() => setErro(false), 1500) }
  }

  return (
    <div className="min-h-screen bg-[#0A0E0A] flex items-center justify-center px-4">
      <div className="bg-[#111811] border border-white/8 rounded-2xl p-8 w-full max-w-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#4CAF50]/10 border border-[#4CAF50]/20 flex items-center justify-center mx-auto mb-5">
          <Target size={24} className="text-[#4CAF50]" />
        </div>
        <h1 className="text-xl font-black text-[#F2F7F2] mb-1">Admin Camporiza</h1>
        <p className="text-[#6B7D6B] text-sm mb-6">Digite o PIN de acesso</p>
        <input
          type="password"
          maxLength={4}
          value={pin}
          onChange={e => setPin(e.target.value.replace(/\D/g,''))}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="••••"
          className={`${inp} text-center text-2xl tracking-[0.5em] mb-3 ${erro ? 'border-red-500' : ''}`}
          autoFocus
        />
        {erro && <p className="text-red-400 text-xs mb-2">PIN incorreto</p>}
        <button onClick={check} className="w-full py-3 rounded-xl bg-[#4CAF50] text-white font-bold hover:bg-[#3d9e42] transition-colors">
          Entrar
        </button>
        <p className="text-[#6B7D6B]/40 text-xs mt-4">PIN padrão: 1234</p>
      </div>
    </div>
  )
}

// ── HOME ───────────────────────────────────────────────────────────
function HomeTab() {
  const [todos, setTodos] = useState<Todo[]>(() => JSON.parse(localStorage.getItem('todos') || '[]'))
  const [metas, setMetas] = useState<Meta[]>(() => JSON.parse(localStorage.getItem('metas') || '[]'))
  const [novoTodo, setNovoTodo] = useState('')
  const [novaMeta, setNovaMeta] = useState({ texto: '', meta: '' })

  const save = (key: string, val: unknown) => localStorage.setItem(key, JSON.stringify(val))

  const addTodo = () => {
    if (!novoTodo.trim()) return
    const next = [...todos, { id: uid(), texto: novoTodo, feito: false }]
    setTodos(next); save('todos', next); setNovoTodo('')
  }
  const toggleTodo = (id: string) => {
    const next = todos.map(t => t.id === id ? { ...t, feito: !t.feito } : t)
    setTodos(next); save('todos', next)
  }
  const delTodo = (id: string) => {
    const next = todos.filter(t => t.id !== id)
    setTodos(next); save('todos', next)
  }
  const addMeta = () => {
    if (!novaMeta.texto.trim() || !novaMeta.meta) return
    const next = [...metas, { id: uid(), texto: novaMeta.texto, progresso: 0, meta: Number(novaMeta.meta) }]
    setMetas(next); save('metas', next); setNovaMeta({ texto: '', meta: '' })
  }
  const updProgress = (id: string, v: number) => {
    const next = metas.map(m => m.id === id ? { ...m, progresso: v } : m)
    setMetas(next); save('metas', next)
  }
  const delMeta = (id: string) => {
    const next = metas.filter(m => m.id !== id)
    setMetas(next); save('metas', next)
  }

  const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* To-do */}
      <div className="bg-[#111811] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <CheckSquare size={18} className="text-[#4CAF50]" />
          <h2 className="font-black text-[#F2F7F2]">To-do do dia</h2>
          <span className="ml-auto text-[#6B7D6B] text-xs capitalize">{hoje}</span>
        </div>
        <div className="flex gap-2 mb-4">
          <input value={novoTodo} onChange={e => setNovoTodo(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder="Nova tarefa..." className={inp} />
          <button onClick={addTodo} className="p-2 rounded-lg bg-[#4CAF50] text-white hover:bg-[#3d9e42] transition-colors flex-shrink-0">
            <Plus size={18} />
          </button>
        </div>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {todos.length === 0 && <li className="text-[#6B7D6B] text-sm text-center py-4">Nenhuma tarefa por enquanto</li>}
          {todos.map(t => (
            <li key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${t.feito ? 'border-white/5 opacity-50' : 'border-white/8 bg-white/3'}`}>
              <button onClick={() => toggleTodo(t.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${t.feito ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-white/20'}`}>
                {t.feito && <Check size={12} className="text-white" />}
              </button>
              <span className={`flex-1 text-sm ${t.feito ? 'line-through text-[#6B7D6B]' : 'text-[#F2F7F2]'}`}>{t.texto}</span>
              <button onClick={() => delTodo(t.id)} className="text-[#6B7D6B] hover:text-red-400 transition-colors">
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Metas */}
      <div className="bg-[#111811] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Target size={18} className="text-[#4CAF50]" />
          <h2 className="font-black text-[#F2F7F2]">Metas do mês</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <input value={novaMeta.texto} onChange={e => setNovaMeta(p => ({ ...p, texto: e.target.value }))}
            placeholder="Ex: Hectares pulverizados" className={inp} />
          <input type="number" value={novaMeta.meta} onChange={e => setNovaMeta(p => ({ ...p, meta: e.target.value }))}
            placeholder="Meta (ex: 500)" className={inp} />
        </div>
        <button onClick={addMeta} className="w-full py-2 rounded-xl border border-[#4CAF50]/40 text-[#4CAF50] text-sm font-bold hover:bg-[#4CAF50]/10 transition-colors mb-5">
          + Adicionar meta
        </button>
        <ul className="space-y-4 max-h-72 overflow-y-auto">
          {metas.length === 0 && <li className="text-[#6B7D6B] text-sm text-center py-4">Nenhuma meta cadastrada</li>}
          {metas.map(m => {
            const pct = Math.min(100, Math.round((m.progresso / m.meta) * 100))
            return (
              <li key={m.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#F2F7F2] font-medium">{m.texto}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B7D6B]">{m.progresso}/{m.meta}</span>
                    <button onClick={() => delMeta(m.id)} className="text-[#6B7D6B] hover:text-red-400 transition-colors">
                      <X size={12} />
                    </button>
                  </div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#4CAF50] to-[#6FCF7C] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <input type="range" min={0} max={m.meta} value={m.progresso}
                  onChange={e => updProgress(m.id, Number(e.target.value))}
                  className="w-full accent-[#4CAF50]" />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

// ── CRM FORM ───────────────────────────────────────────────────────
const EMPTY_LEAD: Omit<Lead, 'id' | 'criadoEm'> = { nome: '', cidade: '', hectares: '', cultura: '', whatsapp: '', status: 'novo', notas: '' }

function LeadForm({ inicial, onSave, onClose }: { inicial?: Lead, onSave: (l: Lead) => void, onClose: () => void }) {
  const [f, setF] = useState<Omit<Lead, 'id' | 'criadoEm'>>(inicial ? { nome: inicial.nome, cidade: inicial.cidade, hectares: inicial.hectares, cultura: inicial.cultura, whatsapp: inicial.whatsapp, status: inicial.status, notas: inicial.notas } : { ...EMPTY_LEAD })
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(p => ({ ...p, [k]: e.target.value }))

  const submit = () => {
    if (!f.nome.trim()) return
    onSave({ ...f, id: inicial?.id ?? uid(), criadoEm: inicial?.criadoEm ?? new Date().toISOString() })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#111811] border border-white/10 rounded-2xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-black text-[#F2F7F2]">{inicial ? 'Editar' : 'Novo'} contato</h3>
          <button onClick={onClose} className="text-[#6B7D6B] hover:text-[#F2F7F2]"><X size={20} /></button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>Nome *</label><input value={f.nome} onChange={set('nome')} placeholder="João da Silva" className={inp} /></div>
            <div><label className={lbl}>Cidade</label><input value={f.cidade} onChange={set('cidade')} placeholder="Dourados, MS" className={inp} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>WhatsApp *</label><input value={f.whatsapp} onChange={set('whatsapp')} placeholder="(67) 99999-9999" className={inp} /></div>
            <div><label className={lbl}>Hectares estimados</label><input value={f.hectares} onChange={set('hectares')} placeholder="Ex: 200 ha" className={inp} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>Cultura</label><input value={f.cultura} onChange={set('cultura')} placeholder="Soja, milho..." className={inp} /></div>
            <div>
              <label className={lbl}>Status</label>
              <select value={f.status} onChange={set('status')} className={inp}>
                {(Object.keys(STATUS_LABEL) as Status[]).map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
              </select>
            </div>
          </div>
          <div><label className={lbl}>Notas</label><textarea value={f.notas} onChange={set('notas')} rows={2} placeholder="Observações, histórico..." className={`${inp} resize-none`} /></div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-[#6B7D6B] hover:border-white/20 transition-colors text-sm">Cancelar</button>
          <button onClick={submit} className="flex-1 py-2.5 rounded-xl bg-[#4CAF50] text-white font-bold hover:bg-[#3d9e42] transition-colors text-sm">Salvar</button>
        </div>
      </div>
    </div>
  )
}

// ── CRM TAB ────────────────────────────────────────────────────────
function CrmTab({ storageKey, titulo }: { storageKey: string, titulo: string }) {
  const [leads, setLeads] = useState<Lead[]>(() => JSON.parse(localStorage.getItem(storageKey) || '[]'))
  const [form, setForm] = useState<{ open: boolean, lead?: Lead }>({ open: false })
  const [filtroStatus, setFiltroStatus] = useState<Status | 'todos'>('todos')

  const save = (next: Lead[]) => { setLeads(next); localStorage.setItem(storageKey, JSON.stringify(next)) }
  const saveLead = (l: Lead) => leads.find(x => x.id === l.id) ? save(leads.map(x => x.id === l.id ? l : x)) : save([...leads, l])
  const del = (id: string) => { if (confirm('Remover?')) save(leads.filter(l => l.id !== id)) }

  const filtrados = filtroStatus === 'todos' ? leads : leads.filter(l => l.status === filtroStatus)

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <button onClick={() => setForm({ open: true })} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4CAF50] text-white font-bold text-sm hover:bg-[#3d9e42] transition-colors">
          <Plus size={16} /> Novo contato
        </button>
        <div className="flex gap-2 flex-wrap">
          {(['todos', ...Object.keys(STATUS_LABEL)] as (Status | 'todos')[]).map(s => (
            <button key={s} onClick={() => setFiltroStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filtroStatus === s ? 'bg-[#4CAF50] text-white' : 'border border-white/10 text-[#6B7D6B] hover:border-white/20'}`}>
              {s === 'todos' ? 'Todos' : STATUS_LABEL[s]}
            </button>
          ))}
        </div>
        <span className="ml-auto text-[#6B7D6B] text-sm">{filtrados.length} contatos</span>
      </div>

      {filtrados.length === 0 ? (
        <div className="bg-[#111811] border border-white/8 rounded-2xl p-12 text-center">
          <Users size={40} className="text-[#6B7D6B] mx-auto mb-3" />
          <p className="text-[#6B7D6B]">Nenhum contato ainda. Adicione o primeiro!</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtrados.map(l => (
            <div key={l.id} className="bg-[#111811] border border-white/8 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-bold text-[#F2F7F2]">{l.nome}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLOR[l.status]}`}>{STATUS_LABEL[l.status]}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-[#6B7D6B]">
                  {l.cidade && <span>📍 {l.cidade}</span>}
                  {l.hectares && <span>🌾 {l.hectares}</span>}
                  {l.cultura && <span>🌱 {l.cultura}</span>}
                  {l.whatsapp && <span>📱 {l.whatsapp}</span>}
                </div>
                {l.notas && <p className="text-xs text-[#6B7D6B]/70 mt-1 truncate">{l.notas}</p>}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {l.whatsapp && (
                  <a href={waLink(l.whatsapp)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366]/15 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/25 transition-colors">
                    <Phone size={13} /> WhatsApp
                  </a>
                )}
                <button onClick={() => setForm({ open: true, lead: l })} className="p-2 rounded-xl border border-white/10 text-[#6B7D6B] hover:text-[#F2F7F2] hover:border-white/20 transition-colors">
                  <Edit2 size={14} />
                </button>
                <button onClick={() => del(l.id)} className="p-2 rounded-xl border border-white/10 text-[#6B7D6B] hover:text-red-400 hover:border-red-500/30 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {form.open && <LeadForm inicial={form.lead} onSave={saveLead} onClose={() => setForm({ open: false })} />}
    </div>
  )
}

// ── FINANCEIRO ─────────────────────────────────────────────────────
const CATEGORIAS_RECEITA = ['Pulverização', 'Dispersão de sólidos', 'Consultoria', 'Outro']
const CATEGORIAS_CUSTO = ['Combustível', 'Manutenção', 'Peças/Reposição', 'Transporte', 'Marketing', 'Outros']

function ContasSection({ lancs, saveLancs }: { lancs: Lancamento[], saveLancs: (next: Lancamento[]) => void }) {
  const [contas, setContas] = useState<Conta[]>(() => JSON.parse(localStorage.getItem('contas') || '[]'))
  const [form, setForm] = useState({ descricao: '', valor: '', tipo: 'pagar' as 'pagar' | 'receber', categoria: '', vencimento: new Date().toISOString().slice(0, 10) })

  const save = (next: Conta[]) => { setContas(next); localStorage.setItem('contas', JSON.stringify(next)) }

  const add = () => {
    if (!form.descricao.trim() || !form.valor) return
    save([...contas, { id: uid(), ...form, valor: Number(form.valor), status: 'pendente' }])
    setForm(p => ({ ...p, descricao: '', valor: '', categoria: '' }))
  }

  const del = (id: string) => save(contas.filter(c => c.id !== id))

  const baixar = (c: Conta) => {
    save(contas.map(x => x.id === c.id ? { ...x, status: 'pago' as const } : x))
    saveLancs([...lancs, {
      id: uid(),
      descricao: c.descricao,
      valor: c.valor,
      tipo: c.tipo === 'pagar' ? 'custo' : 'receita',
      categoria: c.categoria || (c.tipo === 'pagar' ? 'Outros' : 'Outro'),
      data: new Date().toISOString().slice(0, 10),
    }])
  }

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const hojeStr = new Date().toISOString().slice(0, 10)
  const cats = form.tipo === 'pagar' ? CATEGORIAS_CUSTO : CATEGORIAS_RECEITA

  const pendentes = contas.filter(c => c.status === 'pendente')
  const pagar = pendentes.filter(c => c.tipo === 'pagar').sort((a, b) => a.vencimento.localeCompare(b.vencimento))
  const receber = pendentes.filter(c => c.tipo === 'receber').sort((a, b) => a.vencimento.localeCompare(b.vencimento))
  const totalPagar = pagar.reduce((s, c) => s + c.valor, 0)
  const totalReceber = receber.reduce((s, c) => s + c.valor, 0)

  const Lista = ({ items, titulo, cor }: { items: Conta[], titulo: string, cor: string }) => (
    <div className="bg-[#111811] border border-white/8 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-bold text-sm flex items-center gap-2 ${cor}`}><CalendarClock size={16} /> {titulo}</h3>
        <span className="text-xs text-[#6B7D6B]">{items.length} pendente{items.length === 1 ? '' : 's'}</span>
      </div>
      <div className="space-y-2 max-h-72 overflow-y-auto">
        {items.length === 0 && <p className="text-[#6B7D6B] text-sm text-center py-4">Nenhuma conta pendente</p>}
        {items.map(c => {
          const vencida = c.vencimento < hojeStr
          return (
            <div key={c.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${vencida ? 'border-red-500/30 bg-red-500/5' : 'border-white/8 bg-white/3'}`}>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#F2F7F2] font-medium truncate">{c.descricao}</p>
                <p className={`text-xs flex items-center gap-1 ${vencida ? 'text-red-400' : 'text-[#6B7D6B]'}`}>
                  {vencida && <AlertTriangle size={11} />}
                  {c.categoria && `${c.categoria} · `}Vence {new Date(c.vencimento + 'T12:00:00').toLocaleDateString('pt-BR')}
                </p>
              </div>
              <span className={`font-black text-sm flex-shrink-0 ${cor}`}>{fmt(c.valor)}</span>
              <button onClick={() => baixar(c)} title={c.tipo === 'pagar' ? 'Marcar como pago' : 'Marcar como recebido'}
                className="p-2 rounded-lg bg-[#4CAF50]/15 text-[#4CAF50] hover:bg-[#4CAF50]/25 transition-colors flex-shrink-0">
                <Check size={14} />
              </button>
              <button onClick={() => del(c.id)} className="text-[#6B7D6B] hover:text-red-400 transition-colors flex-shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#111811] border border-white/8 rounded-2xl p-5">
          <p className="text-[#6B7D6B] text-xs mb-1">Total a pagar</p>
          <p className="text-xl font-black text-red-400">{fmt(totalPagar)}</p>
        </div>
        <div className="bg-[#111811] border border-white/8 rounded-2xl p-5">
          <p className="text-[#6B7D6B] text-xs mb-1">Total a receber</p>
          <p className="text-xl font-black text-green-400">{fmt(totalReceber)}</p>
        </div>
      </div>

      <div className="bg-[#111811] border border-white/8 rounded-2xl p-5">
        <h3 className="font-bold text-[#F2F7F2] mb-4 text-sm">Nova conta a pagar/receber</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          <div className="lg:col-span-2">
            <label className={lbl}>Descrição</label>
            <input value={form.descricao} onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))} placeholder="Ex: Peça de reposição" className={inp} />
          </div>
          <div>
            <label className={lbl}>Tipo</label>
            <select value={form.tipo} onChange={e => setForm(p => ({ ...p, tipo: e.target.value as 'pagar' | 'receber', categoria: '' }))} className={inp}>
              <option value="pagar">A pagar</option>
              <option value="receber">A receber</option>
            </select>
          </div>
          <div>
            <label className={lbl}>Categoria</label>
            <select value={form.categoria} onChange={e => setForm(p => ({ ...p, categoria: e.target.value }))} className={inp}>
              <option value="">Selecione</option>
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Valor (R$)</label>
            <input type="number" value={form.valor} onChange={e => setForm(p => ({ ...p, valor: e.target.value }))} placeholder="0,00" className={inp} />
          </div>
          <div>
            <label className={lbl}>Vencimento</label>
            <input type="date" value={form.vencimento} onChange={e => setForm(p => ({ ...p, vencimento: e.target.value }))} className={inp} />
          </div>
          <div className="lg:col-span-5 sm:col-span-2">
            <button onClick={add} className="w-full py-2.5 rounded-xl bg-[#4CAF50] text-white font-bold text-sm hover:bg-[#3d9e42] transition-colors flex items-center justify-center gap-2">
              <Plus size={16} /> Adicionar conta
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Lista items={pagar} titulo="Contas a pagar" cor="text-red-400" />
        <Lista items={receber} titulo="Contas a receber" cor="text-green-400" />
      </div>
    </div>
  )
}

function FinanceiroTab() {
  const [lancs, setLancs] = useState<Lancamento[]>(() => JSON.parse(localStorage.getItem('lancamentos') || '[]'))
  const [form, setForm] = useState({ descricao: '', valor: '', tipo: 'receita' as 'receita' | 'custo', categoria: '', data: new Date().toISOString().slice(0, 10) })
  const [mesFiltro, setMesFiltro] = useState(new Date().toISOString().slice(0, 7))

  const save = (next: Lancamento[]) => { setLancs(next); localStorage.setItem('lancamentos', JSON.stringify(next)) }

  const add = () => {
    if (!form.descricao.trim() || !form.valor) return
    save([...lancs, { id: uid(), ...form, valor: Number(form.valor) }])
    setForm(p => ({ ...p, descricao: '', valor: '', categoria: '' }))
  }

  const del = (id: string) => save(lancs.filter(l => l.id !== id))

  const filtrados = lancs.filter(l => l.data.startsWith(mesFiltro))
  const receitas = filtrados.filter(l => l.tipo === 'receita').reduce((s, l) => s + l.valor, 0)
  const custos = filtrados.filter(l => l.tipo === 'custo').reduce((s, l) => s + l.valor, 0)
  const lucro = receitas - custos

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const cats = form.tipo === 'receita' ? CATEGORIAS_RECEITA : CATEGORIAS_CUSTO

  return (
    <div className="space-y-5">
      {/* Cards resumo */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Faturamento', valor: receitas, icon: TrendingUp, cor: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Custos', valor: custos, icon: TrendingDown, cor: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'Lucro líquido', valor: lucro, icon: DollarSign, cor: lucro >= 0 ? 'text-[#4CAF50]' : 'text-red-400', bg: lucro >= 0 ? 'bg-[#4CAF50]/10' : 'bg-red-500/10' },
        ].map(c => (
          <div key={c.label} className="bg-[#111811] border border-white/8 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
              <c.icon size={18} className={c.cor} />
            </div>
            <p className="text-[#6B7D6B] text-xs mb-1">{c.label}</p>
            <p className={`text-xl font-black ${c.cor}`}>{fmt(c.valor)}</p>
          </div>
        ))}
      </div>

      {/* Contas a pagar / receber */}
      <ContasSection lancs={lancs} saveLancs={save} />

      {/* Filtro mês */}
      <div className="flex items-center gap-3">
        <label className="text-[#6B7D6B] text-sm">Mês:</label>
        <input type="month" value={mesFiltro} onChange={e => setMesFiltro(e.target.value)} className={`${inp} w-auto`} />
      </div>

      {/* Formulário novo lançamento */}
      <div className="bg-[#111811] border border-white/8 rounded-2xl p-5">
        <h3 className="font-bold text-[#F2F7F2] mb-4 text-sm">Novo lançamento</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          <div className="lg:col-span-2">
            <label className={lbl}>Descrição</label>
            <input value={form.descricao} onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))} placeholder="Ex: Pulverização Fazenda X" className={inp} />
          </div>
          <div>
            <label className={lbl}>Tipo</label>
            <select value={form.tipo} onChange={e => setForm(p => ({ ...p, tipo: e.target.value as 'receita' | 'custo', categoria: '' }))} className={inp}>
              <option value="receita">Receita</option>
              <option value="custo">Custo</option>
            </select>
          </div>
          <div>
            <label className={lbl}>Categoria</label>
            <select value={form.categoria} onChange={e => setForm(p => ({ ...p, categoria: e.target.value }))} className={inp}>
              <option value="">Selecione</option>
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Valor (R$)</label>
            <input type="number" value={form.valor} onChange={e => setForm(p => ({ ...p, valor: e.target.value }))} placeholder="0,00" className={inp} />
          </div>
          <div>
            <label className={lbl}>Data</label>
            <input type="date" value={form.data} onChange={e => setForm(p => ({ ...p, data: e.target.value }))} className={inp} />
          </div>
          <div className="lg:col-span-5 sm:col-span-2">
            <button onClick={add} className="w-full py-2.5 rounded-xl bg-[#4CAF50] text-white font-bold text-sm hover:bg-[#3d9e42] transition-colors flex items-center justify-center gap-2">
              <Plus size={16} /> Adicionar lançamento
            </button>
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {filtrados.length === 0 && (
          <div className="bg-[#111811] border border-white/8 rounded-2xl p-10 text-center">
            <DollarSign size={36} className="text-[#6B7D6B] mx-auto mb-2" />
            <p className="text-[#6B7D6B] text-sm">Nenhum lançamento neste mês</p>
          </div>
        )}
        {filtrados.sort((a, b) => b.data.localeCompare(a.data)).map(l => (
          <div key={l.id} className="bg-[#111811] border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${l.tipo === 'receita' ? 'bg-green-400' : 'bg-red-400'}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#F2F7F2] font-medium">{l.descricao}</p>
              <p className="text-xs text-[#6B7D6B]">{l.categoria} · {new Date(l.data + 'T12:00:00').toLocaleDateString('pt-BR')}</p>
            </div>
            <span className={`font-black text-sm ${l.tipo === 'receita' ? 'text-green-400' : 'text-red-400'}`}>
              {l.tipo === 'receita' ? '+' : '-'}{fmt(l.valor)}
            </span>
            <button onClick={() => del(l.id)} className="text-[#6B7D6B] hover:text-red-400 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── MAIN ───────────────────────────────────────────────────────────
const TABS: { id: Tab, label: string, icon: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'prospects', label: 'Prospects', icon: '🎯' },
  { id: 'clientes', label: 'Clientes', icon: '✅' },
  { id: 'financeiro', label: 'Financeiro', icon: '💰' },
]

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [tab, setTab] = useState<Tab>('home')

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') setAuth(true)
  }, [])

  const handleAuth = () => {
    sessionStorage.setItem('admin_auth', '1')
    setAuth(true)
  }

  if (!auth) return <PinGate onAuth={handleAuth} />

  return (
    <div className="min-h-screen bg-[#0A0E0A]">
      {/* Header */}
      <header className="bg-[#111811] border-b border-white/8 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-4 h-14">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Camporiza" className="w-7 h-7 rounded-full object-contain" />
            <span className="font-black text-[#F2F7F2] text-sm">CAMPO<span className="text-[#4CAF50]">RIZA</span> <span className="text-[#6B7D6B] font-normal">Admin</span></span>
          </div>
          <nav className="flex gap-1 ml-4">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${tab === t.id ? 'bg-[#4CAF50]/15 text-[#4CAF50]' : 'text-[#6B7D6B] hover:text-[#F2F7F2]'}`}>
                <span>{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </nav>
          <button onClick={() => { sessionStorage.removeItem('admin_auth'); setAuth(false) }}
            className="ml-auto text-xs text-[#6B7D6B] hover:text-[#F2F7F2] transition-colors">
            Sair
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'home' && <HomeTab />}
        {tab === 'prospects' && <CrmTab storageKey="prospects" titulo="Prospects" />}
        {tab === 'clientes' && <CrmTab storageKey="clientes" titulo="Clientes" />}
        {tab === 'financeiro' && <FinanceiroTab />}
      </main>
    </div>
  )
}
