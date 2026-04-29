'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, CheckCircle } from 'lucide-react'

const WA_NUMBER = '556796330973'
const WA_MESSAGE = encodeURIComponent('Olá! Vim pelo site da Camporiza e gostaria de solicitar um orçamento.')

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none transition-all text-gray-800 placeholder:text-gray-400 bg-white text-sm'

const produtos = [
  'Pulverização agrícola (drone)',
  'Mapeamento aéreo',
  'Monitoramento de lavouras',
  'Análise e relatórios',
  'Outro serviço',
]

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.26 4.81L2 22l5.42-1.37a9.9 9.9 0 004.62 1.14c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.52 14.15c-.23.64-1.33 1.22-1.84 1.3-.47.07-1.07.1-1.72-.11-.4-.13-.9-.3-1.55-.58-2.73-1.18-4.51-3.95-4.65-4.13-.13-.19-1.1-1.47-1.1-2.8 0-1.32.69-1.97 1-2.27.3-.3.65-.37.87-.37.22 0 .43.01.62.02.2.01.47-.07.74.56.28.65.94 2.3 1.02 2.47.08.17.13.37.03.58-.1.2-.15.33-.3.51-.15.17-.32.38-.45.51-.15.15-.31.31-.13.61.18.3.79 1.31 1.7 2.12 1.17 1.04 2.15 1.36 2.45 1.52.3.15.48.13.66-.08.18-.21.77-.9.98-1.21.2-.3.41-.25.69-.15.28.1 1.79.84 2.1.99.3.15.5.22.57.35.07.12.07.7-.16 1.35z" />
    </svg>
  )
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', empresa: '', produto: '' })

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Olá! Me chamo ${form.name}.\nWhatsApp: ${form.phone}\nE-mail: ${form.email}${form.empresa ? `\nEmpresa: ${form.empresa}` : ''}${form.produto ? `\nInteresse: ${form.produto}` : ''}\n\nGostaria de solicitar um orçamento.`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank')
    setSubmitted(true)
  }

  return (
    <section id="contato" ref={ref} className="py-24 bg-[#F5F9F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#4CAF50] font-mono text-xs uppercase tracking-[0.2em]">Contato</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0D1A0D] mt-3 mb-4">
            Fale com um especialista
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Preencha o formulário ou entre em contato diretamente pelo WhatsApp — respondemos em minutos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* ── Left: Form card ── */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={64} className="text-[#4CAF50] mb-5" />
                <h3 className="text-2xl font-black text-[#0D1A0D] mb-2">Mensagem enviada!</h3>
                <p className="text-gray-500">Abrimos o WhatsApp com sua mensagem. Em breve retornaremos.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Nome completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Seu nome"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="(67) 99999-9999"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="seu@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Empresa</label>
                    <input
                      type="text"
                      value={form.empresa}
                      onChange={set('empresa')}
                      placeholder="Nome da empresa"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Select */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Qual produto te interessa? <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.produto}
                    onChange={set('produto')}
                    className={`${inputClass} cursor-pointer appearance-none`}
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                  >
                    <option value="" disabled>Selecione uma opção</option>
                    {produtos.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* CTA */}
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#0D1A0D] text-white px-8 py-4 rounded-xl font-bold text-base mt-2 hover:bg-[#1A4A1A] transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={18} />
                  Quero falar com um especialista
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* ── Right: WhatsApp card ── */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-5"
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* WA icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-md shadow-green-200">
              <WhatsAppIcon size={30} />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0D1A0D] mb-2">Prefere pelo WhatsApp?</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Fale diretamente com um especialista agora.{' '}
                <span className="text-[#4CAF50] font-semibold">Respondemos rapidamente.</span>
              </p>
            </div>

            {/* Main WA CTA */}
            <motion.a
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white py-4 rounded-xl font-bold text-base shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:bg-[#1da851] transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsAppIcon size={20} />
              Fale agora no WhatsApp
            </motion.a>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-400 text-xs whitespace-nowrap">ou ligue para nós</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Phone buttons */}
            <div className="flex flex-col gap-3">
              {['(67) 9633-0973'].map((number) => (
                <motion.a
                  key={number}
                  href={`tel:+55${number.replace(/\D/g, '')}`}
                  className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-3.5 rounded-xl font-bold text-sm hover:border-[#4CAF50]/50 hover:text-[#4CAF50] transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={15} />
                  {number}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
