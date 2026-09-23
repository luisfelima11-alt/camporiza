'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, ArrowUpRight, Check, Copy, Film, LayoutGrid, ListChecks, ChevronRight, Instagram, Images, Send } from 'lucide-react'
import { CHECKS, CONTENT, defaultPlanner, STATUS_LABELS, statusFor, validatePlanner, type PieceProgress, type PlannerState, type ProductionStatus } from './marketing-content'
import styles from './marketing.module.css'

const STORAGE_KEY = 'camporiza_marketing_planner_v1'
export default function MarketingPlanner() {
  const [progress, setProgress] = useState<PlannerState>(defaultPlanner)
  const [ready, setReady] = useState(false)
  const [storageError, setStorageError] = useState('')
  const [notice, setNotice] = useState('')
  const [selectedId, setSelectedId] = useState(CONTENT[0].id)
  const [filter, setFilter] = useState('todos')
  const [detailTab, setDetailTab] = useState('briefing')
  const fileInput = useRef<HTMLInputElement>(null)
  const detail = useRef<HTMLElement>(null)
  const current = CONTENT.find(p => p.id === selectedId) ?? CONTENT[0]
  const state = progress[current.id]
  const visible = CONTENT.filter(p => filter === 'todos' || statusFor(p, progress[p.id]) === filter)
  const feedPieces = visible
    .filter(piece => !piece.format.includes('Stories'))
    .sort((a, b) => Number(statusFor(a, progress[a.id]) === 'publicado') - Number(statusFor(b, progress[b.id]) === 'publicado'))
  const storyPieces = visible.filter(piece => piece.format.includes('Stories'))

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const valid = validatePlanner(JSON.parse(saved))
        if (valid) setProgress(valid)
        else setStorageError('O arquivo local não pôde ser lido. Exporte um backup antes de substituir os dados.')
      }
    } catch { setStorageError('O armazenamento não está disponível. Exporte seu progresso antes de sair.') }
    setReady(true)
  }, [])

  function commit(next: PlannerState) {
    setProgress(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setStorageError('') }
    catch { setStorageError('Não foi possível salvar neste navegador. Exporte seu progresso antes de sair.') }
  }
  function update(patch: Partial<PieceProgress>) { commit({ ...progress, [current.id]: { ...state, ...patch } }) }
  function updatePiece(id: string, patch: Partial<PieceProgress>) {
    commit({ ...progress, [id]: { ...progress[id], ...patch } })
  }
  function localDate() {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${now.getFullYear()}-${month}-${day}`
  }
  function toggleApproval(id: string) {
    const approved = !progress[id].approved
    updatePiece(id, { approved })
    setSelectedId(id)
    setNotice(approved ? 'Conteúdo aprovado. A etapa de produção foi mantida.' : 'Aprovação removida. O conteúdo voltou para conferência.')
  }
  function markPosted(id: string) {
    updatePiece(id, { approved: true, status: 'publicado', date: localDate() })
    setSelectedId(id)
    setNotice('Post marcado como feito e movido para as publicações.')
  }
  function openPiece(id: string) {
    setSelectedId(id); setDetailTab('briefing'); setNotice('')
    detail.current?.focus({ preventScroll: true })
    if (window.matchMedia('(max-width: 900px)').matches) detail.current?.scrollIntoView({ block: 'start', behavior: 'auto' })
  }
  async function copyCaption() {
    try { await navigator.clipboard.writeText(current.caption); setNotice('Legenda copiada.') }
    catch { setNotice('Não foi possível copiar automaticamente. Selecione o texto da legenda e copie.') }
  }
  function exportProgress() {
    const blob = new Blob([JSON.stringify({ version: 2, progress }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a'); link.href = url; link.download = 'camporiza-marketing.json'; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setNotice('Backup exportado. Guarde o arquivo para abrir em outro dispositivo.')
  }
  async function importProgress(file?: File) {
    if (!file) return
    if (file.size > 200000) { setNotice('Arquivo muito grande. Use o backup JSON exportado por este painel.'); return }
    try {
      const parsed = JSON.parse(await file.text())
      const valid = parsed.version === 1 || parsed.version === 2 ? validatePlanner(parsed.progress) : null
      if (!valid) throw new Error('invalid')
      if (!window.confirm('Importar este backup substituirá os status, datas, notas e checklists deste navegador. Continuar?')) return
      commit(valid); setNotice('Backup importado. Confira os status das peças.'); setFilter('todos')
    } catch { setNotice('Backup inválido. Selecione um arquivo JSON exportado por este painel.') }
    finally { if (fileInput.current) fileInput.current.value = '' }
  }

  return (
    <section id="producao" className={styles.planner} aria-labelledby="production-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>PLANO EM AÇÃO / @CAMPORIZA_</p>
          <h2 id="production-title">Sua próxima publicação<br /><span>começa aqui.</span></h2>
          <p className={styles.intro}>Escolha uma peça, confira o briefing e acompanhe a produção.</p>
        </div>
        <div className={styles.summary}>
          <span>{CONTENT.filter(p => statusFor(p, progress[p.id]) === 'publicado').length}<small>/{CONTENT.length}</small></span>
          <p>peças publicadas<br /><small>prints + registros manuais</small></p>
        </div>
      </div>

      <p className={styles.historyNote}><Check size={15} />Publicações confirmadas pelo material enviado e pelos registros manuais. Conteúdos futuros podem ser aprovados diretamente na grade.</p>

      <div className={styles.toolbar} aria-label="Filtrar por status">
        {[['todos', 'Todas'], ...Object.entries(STATUS_LABELS)].map(([id, label]) => (
          <button type="button" key={id} className={styles.filter} aria-pressed={filter === id} onClick={() => setFilter(id)}>
            {label}<span>{id === 'todos' ? CONTENT.length : CONTENT.filter(p => statusFor(p, progress[p.id]) === id).length}</span>
          </button>
        ))}
      </div>

      <div className={styles.workspace}>
        <div className={styles.feedPanel}>
          <header className={styles.profileHeader}>
            <img src="/logo.png" alt="Logo da Camporiza" />
            <div className={styles.profileIdentity}>
              <span><Instagram size={15} />@camporiza_</span>
              <strong>Prévia do feed</strong>
              <small>Planejados primeiro · publicados depois</small>
            </div>
            <div className={styles.profileStats}>
              <strong>{CONTENT.filter(piece => !piece.format.includes('Stories')).length}</strong>
              <span>posts no plano</span>
            </div>
          </header>

          {visible.length === 0 && <div className={styles.empty}><ListChecks size={30} /><h3>Nenhuma peça nesta etapa</h3><p>Mude o filtro para visualizar a grade.</p><button onClick={() => setFilter('todos')}>Ver todo o feed</button></div>}

          {feedPieces.length > 0 && <div className={styles.feedGrid} aria-label="Prévia da grade do Instagram">
            {feedPieces.map(piece => {
              const pieceStatus = statusFor(piece, progress[piece.id])
              const published = pieceStatus === 'publicado'
              const dateLabel = piece.publication
                ? piece.publication.dateLabel
                : progress[piece.id].date
                  ? `${published ? 'Publicado' : 'Planejado'} em ${progress[piece.id].date.split('-').reverse().join('/')}`
                  : piece.scheduled
                    ? `Feed ${piece.scheduled.feedDate}`
                    : 'Data a definir'
              return <article key={piece.id} className={styles.feedItem} data-selected={piece.id === selectedId} data-published={published}>
                <button type="button" className={styles.feedOpen} aria-label={`Abrir briefing de ${piece.title}`} onClick={() => openPiece(piece.id)}>
                  <div className={`${styles.feedVisual} ${styles[piece.cover]}`}>
                    {piece.publication
                      ? <img src={piece.publication.screenshot} alt={`Publicação ${piece.title}`} loading="lazy" />
                      : piece.scheduled
                        ? <img src={piece.scheduled.assets[0].src} alt={`Arte planejada: ${piece.title}`} loading="lazy" />
                        : <><span className={styles.feedFormat}>{piece.format.includes('Reels') ? <Film size={11} /> : <LayoutGrid size={11} />}{piece.format}</span><strong>{piece.headline}</strong><small>{piece.pillar}</small></>}
                    <span className={styles.feedState} data-status={pieceStatus}>{published ? 'NO AR' : progress[piece.id].approved ? 'APROVADO' : 'PLANEJADO'}</span>
                    <span className={styles.feedKind}>{piece.format.includes('Reels') ? <Film size={14} /> : <Images size={14} />}</span>
                  </div>
                </button>
                <div className={styles.feedCopy}>
                  <button type="button" onClick={() => openPiece(piece.id)}>{piece.title}<ChevronRight size={13} /></button>
                  <span>{dateLabel}</span>
                </div>
                {!published ? <div className={styles.feedActions}>
                  <button type="button" aria-pressed={progress[piece.id].approved} onClick={() => toggleApproval(piece.id)}><Check size={13} />{progress[piece.id].approved ? 'Aprovado' : 'Aprovar'}</button>
                  <button type="button" onClick={() => markPosted(piece.id)}><Send size={12} />Post feito</button>
                </div> : <p className={styles.publishedLine}><Check size={12} />{piece.publication ? 'Confirmado por print' : 'Registro manual'}</p>}
              </article>
            })}
          </div>}

          {storyPieces.length > 0 && <section className={styles.storyLane} aria-labelledby="stories-plan-title">
            <div className={styles.storyHeading}><span><Images size={14} />Stories fora da grade</span><small>continuam no plano</small></div>
            {storyPieces.map(piece => {
              const published = statusFor(piece, progress[piece.id]) === 'publicado'
              return <article key={piece.id} className={styles.storyItem}>
                <button type="button" className={styles.storyOpen} onClick={() => openPiece(piece.id)}>
                  <span className={`${styles.storyCover} ${styles[piece.cover]}`}>{piece.headline.slice(0, 1)}</span>
                  <span><strong id="stories-plan-title">{piece.title}</strong><small>{piece.format} · {STATUS_LABELS[statusFor(piece, progress[piece.id])]}</small></span>
                  <ChevronRight size={15} />
                </button>
                {!published && <div className={styles.storyActions}>
                  <button type="button" aria-pressed={progress[piece.id].approved} onClick={() => toggleApproval(piece.id)}><Check size={12} />{progress[piece.id].approved ? 'Aprovado' : 'Aprovar'}</button>
                  <button type="button" onClick={() => markPosted(piece.id)}><Send size={11} />Post feito</button>
                </div>}
              </article>
            })}
          </section>}
        </div>

        <aside ref={detail} tabIndex={-1} className={styles.detail} aria-labelledby="piece-title">
          <p className={styles.eyebrow}>MESA DE PRODUÇÃO</p>
          <h3 id="piece-title">{current.title}</h3>
          <p className={styles.detailDescription}>{current.format} · {current.pillar}</p>
          {current.publication && <div className={styles.publicationEvidence}><span>Publicação confirmada pelo print</span><a href={current.publication.screenshot} target="_blank" rel="noreferrer">Ver print completo <ArrowUpRight size={14} /></a><p>{current.publication.dateLabel}. Registro do material enviado, não consulta ao Instagram em tempo real.</p></div>}
          {current.scheduled && <section className={styles.scheduleEvidence} aria-label="Programação da publicação">
            <div className={styles.scheduleHeading}><span>{statusFor(current, state) === 'publicado' ? 'CONTEÚDO PUBLICADO / REGISTRO MANUAL' : 'CONTEÚDO PRONTO / AGENDADO'}</span><a href={current.scheduled.driveUrl} target="_blank" rel="noreferrer">Abrir no Drive <ArrowUpRight size={14} /></a></div>
            <div className={styles.scheduleDates}>
              <div><small>FEED · CARROSSEL</small><strong>{current.scheduled.feedDate}</strong><span>4 telas · 4:5</span></div>
              <div><small>STORIES · CTA</small><strong>{current.scheduled.storiesDate}</strong><span>3 telas · 9:16</span></div>
            </div>
            <a className={styles.packageLink} href={current.scheduled.packageUrl} target="_blank" rel="noreferrer">Baixar pacote completo <ArrowDownToLine size={14} /></a>
          </section>}
          {current.publication?.reviewNote && <p className={styles.warning}>{current.publication.reviewNote}</p>}
          <fieldset disabled={!ready} className={styles.fields}>
            <label>Status<select disabled={!!current.publication} value={statusFor(current, state)} onChange={e => update({ status: e.target.value as ProductionStatus })}>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label>{current.publication ? 'Data planejada (registro)' : 'Data planejada'}<input aria-label="Data planejada" type="date" value={state.date} onChange={e => update({ date: e.target.value })} onInput={e => update({ date: e.currentTarget.value })} onBlur={e => { if (e.currentTarget.value !== state.date) update({ date: e.currentTarget.value }) }} /></label>
          </fieldset>
          <p className={styles.hint}>{current.publication ? 'A data planejada preserva o registro interno; não comprova quando o post foi publicado.' : 'Organização interna. Não agenda nem publica no Instagram.'}</p>
          {current.scheduled && <div className={styles.assetGallery}>
            <div className={styles.assetGalleryHeading}><h4>Artes prontas</h4><span>{current.scheduled.assets.length} arquivos</span></div>
            <div className={styles.assetGrid}>{current.scheduled.assets.map(asset => <a key={asset.src} href={asset.src} target="_blank" rel="noreferrer" aria-label={`Abrir ${asset.label}`}>
              <img src={asset.src} alt={asset.label} loading="lazy" />
              <span>{asset.format}</span><strong>{asset.label}</strong>
            </a>)}</div>
          </div>}
          <div className={styles.detailTabs} aria-label="Detalhes da peça">
            {[['briefing', 'Briefing'], ['legenda', 'Legenda'], ['roteiro', 'Roteiro']].map(([id, label]) => <button type="button" key={id} aria-pressed={detailTab === id} onClick={() => { setDetailTab(id); setNotice('') }}>{label}</button>)}
          </div>
          <div className={styles.detailContent}>
            {detailTab === 'briefing' && <><h4>O que esta peça precisa fazer</h4><p>{current.objective}</p><h4>Direção de produção</h4><p>{current.direction}</p>{current.assetUrl && <a className={styles.assetLink} href={current.assetUrl} target="_blank" rel="noreferrer">{current.assetLabel}<ArrowUpRight size={16} /></a>}</>}
            {detailTab === 'legenda' && <>{current.publication && <p className={styles.hint}>Sugestão para revisão ou reutilização. Não é uma transcrição da legenda publicada.</p>}<p className={styles.caption}>{current.caption}</p><button type="button" className={styles.copy} onClick={copyCaption}><Copy size={14} />Copiar legenda</button></>}
            {detailTab === 'roteiro' && <ol className={styles.script}>{current.script.map((line, i) => <li key={line}><span>{String(i + 1).padStart(2, '0')}</span><p>{line}</p></li>)}</ol>}
          </div>
          <fieldset className={styles.checklist} disabled={!ready}>
            <legend>{current.publication ? 'Revisão registrada no painel' : 'Antes de publicar'} <span>{state.checks.length}/{CHECKS.length}</span></legend>
            {CHECKS.map(item => <label key={item}><input type="checkbox" checked={state.checks.includes(item)} onChange={e => update({ checks: e.target.checked ? [...state.checks, item] : state.checks.filter(c => c !== item) })} /><span>{item}</span></label>)}
          </fieldset>
          {!current.publication && state.status === 'publicado' && state.checks.length < CHECKS.length && <p className={styles.warning}>Peça marcada como publicada com revisão incompleta. Confira o checklist.</p>}
          <label className={styles.notes}>Notas da produção<textarea disabled={!ready} rows={3} maxLength={5000} value={state.notes} onChange={e => update({ notes: e.target.value })} placeholder="Ajustes pedidos, link do arquivo final, próxima ação…" /></label>
        </aside>
      </div>
      <div className={styles.storage}>
        <p><Check size={14} />{storageError ? 'Salvamento local precisa de atenção' : ready ? 'Progresso salvo neste navegador' : 'Carregando progresso…'}<span>Sem sincronização entre celular e computador. O backup inclui as peças deste quadro.</span></p>
        <div><button type="button" disabled={!ready} onClick={exportProgress}><ArrowDownToLine size={14} />Exportar</button><button type="button" disabled={!ready} onClick={() => fileInput.current?.click()}><ArrowUpFromLine size={14} />Importar</button></div>
        <input ref={fileInput} type="file" accept="application/json,.json" hidden aria-label="Importar backup do marketing" onChange={e => void importProgress(e.target.files?.[0])} />
      </div>
      {storageError && <p role="alert" className={styles.warning}>{storageError}</p>}
      <p role="status" aria-live="polite" className={styles.notice}>{notice}</p>
    </section>
  )
}
