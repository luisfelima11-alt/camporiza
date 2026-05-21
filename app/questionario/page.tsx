'use client'

import { useState } from 'react'

const STEPS = [
  { id: 'empresa', label: 'Empresa', icon: '🏢' },
  { id: 'numeros', label: 'Números', icon: '📊' },
  { id: 'servicos', label: 'Serviços', icon: '🚁' },
  { id: 'equipamentos', label: 'Equipamentos', icon: '⚙️' },
  { id: 'depoimentos', label: 'Depoimentos', icon: '💬' },
  { id: 'redes', label: 'Redes Sociais', icon: '📱' },
  { id: 'diferenciais', label: 'Diferenciais', icon: '🏆' },
]

type Answers = Record<string, string>

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-[#F2F7F2] placeholder:text-[#6B7D6B] focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none transition-all text-sm'

const labelClass = 'block text-sm font-semibold text-[#F2F7F2] mb-1.5'
const hintClass = 'text-xs text-[#6B7D6B] mt-1'

function Field({
  label,
  hint,
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  multiline = false,
}: {
  label: string
  hint?: string
  name: string
  placeholder: string
  value: string
  onChange: (name: string, val: string) => void
  type?: string
  multiline?: boolean
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  )
}

export default function Questionario() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})

  const set = (name: string, val: string) =>
    setAnswers((prev) => ({ ...prev, [name]: val }))

  const v = (name: string) => answers[name] ?? ''

  const summary = `
===== CAMPORIZA — DADOS REAIS DO SITE =====

🏢 EMPRESA
• Nome completo / Razão social: ${v('razao_social')}
• Cidade sede: ${v('cidade')}
• Ano de fundação: ${v('ano_fundacao')}
• Sócios / fundadores: ${v('socios')}
• História da empresa: ${v('historia')}

📊 NÚMEROS
• Clientes atendidos: ${v('clientes')}
• Hectares pulverizados: ${v('hectares')}
• Anos de experiência: ${v('anos_exp')}
• Drones na frota: ${v('drones_frota')}
• Estados/regiões atendidos: ${v('regioes')}

🚁 SERVIÇOS
• Serviços oferecidos: ${v('servicos_lista')}
• Culturas atendidas: ${v('culturas')}
• Preço médio por hectare: ${v('preco_hectare')}
• Área mínima atendida: ${v('area_minima')}

⚙️ EQUIPAMENTOS
• Modelos de drone: ${v('modelos_drone')}
• Capacidade do tanque: ${v('capacidade_tanque')}
• Autonomia de voo: ${v('autonomia')}
• Largura de faixa: ${v('largura_faixa')}

💬 DEPOIMENTOS
• Cliente 1 — Nome: ${v('dep1_nome')} | Cidade: ${v('dep1_cidade')} | Depoimento: ${v('dep1_texto')}
• Cliente 2 — Nome: ${v('dep2_nome')} | Cidade: ${v('dep2_cidade')} | Depoimento: ${v('dep2_texto')}
• Cliente 3 — Nome: ${v('dep3_nome')} | Cidade: ${v('dep3_cidade')} | Depoimento: ${v('dep3_texto')}

📱 REDES SOCIAIS
• Instagram: ${v('instagram')}
• Facebook: ${v('facebook')}
• YouTube: ${v('youtube')}
• TikTok: ${v('tiktok')}

🏆 DIFERENCIAIS
• Principal diferencial: ${v('diferencial_principal')}
• Certificações (ANAC, etc.): ${v('certificacoes')}
• Área de cobertura (MS): ${v('cobertura')}
• Missão / valores: ${v('missao')}

===========================================
`.trim()

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (done) {
    return (
      <main className="min-h-screen bg-[#0A0E0A] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-3xl font-black text-[#F2F7F2] mb-2">Questionário concluído!</h1>
            <p className="text-[#6B7D6B]">Copie o resumo abaixo e envie para o Claude Code</p>
          </div>

          <div className="bg-[#111811] border border-white/10 rounded-2xl p-6 mb-6">
            <pre className="text-[#6B7D6B] text-xs leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-96">
              {summary}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-4 rounded-xl font-bold text-base bg-[#4CAF50] text-white hover:bg-[#3d9c40] transition-colors duration-200"
            >
              {copied ? '✅ Copiado!' : '📋 Copiar tudo'}
            </button>
            <button
              onClick={() => { setStep(0); setDone(false) }}
              className="flex-1 py-4 rounded-xl font-bold text-base bg-white/5 border border-white/10 text-[#F2F7F2] hover:bg-white/10 transition-colors duration-200"
            >
              ✏️ Editar respostas
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0A0E0A] px-4 py-12">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#4CAF50] font-mono text-xs uppercase tracking-[0.2em]">Camporiza</span>
          <h1 className="text-3xl font-black text-[#F2F7F2] mt-2 mb-2">Dados reais do site</h1>
          <p className="text-[#6B7D6B] text-sm">Preencha com as informações verdadeiras da empresa para deixar o site 100% real</p>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-10">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              className="flex-1 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i <= step ? '#4CAF50' : 'rgba(255,255,255,0.1)' }}
            />
          ))}
        </div>

        {/* Step label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{STEPS[step].icon}</span>
          <div>
            <p className="text-xs text-[#6B7D6B] font-mono uppercase tracking-widest">
              Etapa {step + 1} de {STEPS.length}
            </p>
            <h2 className="text-xl font-black text-[#F2F7F2]">{STEPS[step].label}</h2>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#111811] border border-white/8 rounded-2xl p-6 space-y-5">

          {/* STEP 0 — EMPRESA */}
          {step === 0 && (
            <>
              <Field name="razao_social" label="Nome completo / Razão social" placeholder="Ex: Camporiza Pulverização Agrícola LTDA" value={v('razao_social')} onChange={set} />
              <div className="grid grid-cols-2 gap-4">
                <Field name="cidade" label="Cidade sede" placeholder="Ex: Dourados, MS" value={v('cidade')} onChange={set} />
                <Field name="ano_fundacao" label="Ano de fundação" placeholder="Ex: 2022" value={v('ano_fundacao')} onChange={set} />
              </div>
              <Field name="socios" label="Sócios / fundadores" placeholder="Ex: João Silva e Maria Souza" value={v('socios')} onChange={set} />
              <Field name="historia" label="História da empresa" hint="Como surgiu a ideia? O que motivou criar a Camporiza?" placeholder="Conte em 2-3 frases como a Camporiza nasceu..." value={v('historia')} onChange={set} multiline />
            </>
          )}

          {/* STEP 1 — NÚMEROS */}
          {step === 1 && (
            <>
              <p className="text-xs text-[#4CAF50] font-mono uppercase tracking-widest">Se for estimativa, tudo bem! Chute honesto é melhor que zero.</p>
              <Field name="clientes" label="Quantos clientes/produtores já atenderam?" hint="Ex: 45 produtores, ou 'mais de 30'" placeholder="Ex: 42 produtores" value={v('clientes')} onChange={set} />
              <Field name="hectares" label="Quantos hectares já foram pulverizados?" hint="Soma de todos os trabalhos desde o início" placeholder="Ex: 15.000 ha ou 'mais de 10 mil ha'" value={v('hectares')} onChange={set} />
              <Field name="anos_exp" label="Anos de experiência / operação" placeholder="Ex: 3 anos" value={v('anos_exp')} onChange={set} />
              <Field name="drones_frota" label="Quantos drones na frota?" placeholder="Ex: 3 drones" value={v('drones_frota')} onChange={set} />
              <Field name="regioes" label="Quais cidades/regiões do MS atendem?" placeholder="Ex: Dourados, Ponta Porã, Maracaju, Sidrolândia..." value={v('regioes')} onChange={set} />
            </>
          )}

          {/* STEP 2 — SERVIÇOS */}
          {step === 2 && (
            <>
              <Field name="servicos_lista" label="Quais serviços oferecem?" hint="Liste todos, separados por vírgula" placeholder="Ex: Pulverização agrícola, mapeamento aéreo, monitoramento de lavouras" value={v('servicos_lista')} onChange={set} multiline />
              <Field name="culturas" label="Quais culturas atendem?" hint="Soja, milho, cana, café, algodão..." placeholder="Ex: Soja, milho, cana-de-açúcar, algodão" value={v('culturas')} onChange={set} />
              <Field name="preco_hectare" label="Preço médio por hectare" hint="Pode ser uma faixa (mínimo–máximo)" placeholder="Ex: R$ 12 a R$ 18 por hectare" value={v('preco_hectare')} onChange={set} />
              <Field name="area_minima" label="Área mínima atendida" placeholder="Ex: 50 hectares" value={v('area_minima')} onChange={set} />
            </>
          )}

          {/* STEP 3 — EQUIPAMENTOS */}
          {step === 3 && (
            <>
              <Field name="modelos_drone" label="Modelos de drone que usam" hint="Ex: DJI Agras T40, T30..." placeholder="Ex: DJI Agras T40" value={v('modelos_drone')} onChange={set} />
              <Field name="capacidade_tanque" label="Capacidade do tanque (litros)" placeholder="Ex: 40 litros" value={v('capacidade_tanque')} onChange={set} />
              <Field name="autonomia" label="Autonomia de voo / produtividade" hint="Quantos ha por hora ou por carga?" placeholder="Ex: até 25 ha/hora" value={v('autonomia')} onChange={set} />
              <Field name="largura_faixa" label="Largura de faixa de pulverização" placeholder="Ex: 9 metros" value={v('largura_faixa')} onChange={set} />
            </>
          )}

          {/* STEP 4 — DEPOIMENTOS */}
          {step === 4 && (
            <>
              <p className="text-xs text-[#6B7D6B]">Peça autorização dos clientes antes de publicar no site.</p>
              {[1, 2, 3].map((n) => (
                <div key={n} className="border border-white/8 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-bold text-[#4CAF50] uppercase tracking-widest">Cliente {n}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Field name={`dep${n}_nome`} label="Nome" placeholder="João da Silva" value={v(`dep${n}_nome`)} onChange={set} />
                    <Field name={`dep${n}_cidade`} label="Cidade" placeholder="Dourados, MS" value={v(`dep${n}_cidade`)} onChange={set} />
                  </div>
                  <Field name={`dep${n}_texto`} label="Depoimento" placeholder='Ex: "O serviço foi excelente, drone passou por toda a lavoura em poucas horas..."' value={v(`dep${n}_texto`)} onChange={set} multiline />
                </div>
              ))}
            </>
          )}

          {/* STEP 5 — REDES SOCIAIS */}
          {step === 5 && (
            <>
              <Field name="instagram" label="Instagram" hint="URL completa ou @usuario" placeholder="https://instagram.com/camporiza ou @camporiza" value={v('instagram')} onChange={set} />
              <Field name="facebook" label="Facebook" hint="URL completa da página" placeholder="https://facebook.com/camporiza" value={v('facebook')} onChange={set} />
              <Field name="youtube" label="YouTube (se tiver)" placeholder="https://youtube.com/@camporiza" value={v('youtube')} onChange={set} />
              <Field name="tiktok" label="TikTok (se tiver)" placeholder="https://tiktok.com/@camporiza" value={v('tiktok')} onChange={set} />
            </>
          )}

          {/* STEP 6 — DIFERENCIAIS */}
          {step === 6 && (
            <>
              <Field name="diferencial_principal" label="Principal diferencial da Camporiza" hint="Por que um produtor deve escolher vocês e não o concorrente?" placeholder="Ex: Atendimento rápido, tecnologia de ponta, equipe certificada..." value={v('diferencial_principal')} onChange={set} multiline />
              <Field name="certificacoes" label="Certificações e homologações" hint="ANAC, número do CANR, cursos, etc." placeholder="Ex: ANAC homologado, CANR nº 12345, piloto certificado pela DJI" value={v('certificacoes')} onChange={set} />
              <Field name="cobertura" label="Área de cobertura no MS" hint="Quais municípios/regiões atendem com maior frequência?" placeholder="Ex: Sul do MS — Dourados, Maracaju, Ponta Porã, Naviraí..." value={v('cobertura')} onChange={set} />
              <Field name="missao" label="Missão / valores da empresa" hint="Em uma frase — o que move a Camporiza?" placeholder="Ex: Levar tecnologia de ponta para o produtor rural do MS com agilidade e confiança." value={v('missao')} onChange={set} multiline />
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-6 py-4 rounded-xl font-bold text-sm bg-white/5 border border-white/10 text-[#F2F7F2] hover:bg-white/10 transition-colors duration-200"
            >
              ← Voltar
            </button>
          )}
          <button
            onClick={() => {
              if (step < STEPS.length - 1) setStep((s) => s + 1)
              else setDone(true)
            }}
            className="flex-1 py-4 rounded-xl font-bold text-base bg-[#4CAF50] text-white hover:bg-[#3d9c40] transition-colors duration-200 shadow-[0_4px_20px_rgba(76,175,80,0.3)]"
          >
            {step < STEPS.length - 1 ? 'Próximo →' : '✅ Ver resumo'}
          </button>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-2 mt-6">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{ background: i === step ? '#4CAF50' : 'rgba(255,255,255,0.15)' }}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
