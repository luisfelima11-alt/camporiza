'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Leaf, Award, Headphones } from 'lucide-react'

const reasons = [
  {
    icon: Zap,
    title: 'Tecnologia de Ponta',
    description:
      'Drones da mais alta geração com sistema GPS RTK centimétrico, garantindo precisão incomparável a cada voo.',
  },
  {
    icon: Leaf,
    title: 'Agricultura Sustentável',
    description:
      'Redução de até 60% no uso de água e defensivos comparado à pulverização convencional.',
  },
  {
    icon: Award,
    title: 'Certificados e Regulamentados',
    description:
      'Equipe habilitada pela ANAC e MAPA com todas as certificações exigidas para operação segura e legal.',
  },
  {
    icon: Headphones,
    title: 'Suporte Especializado',
    description:
      'Acompanhamento técnico antes, durante e após cada serviço com engenheiros agrônomos parceiros.',
  },
]

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="sobre" ref={ref} className="py-24 bg-[#111811] relative overflow-hidden">
      {/* Glow blobs */}
      <div
        className="absolute -right-48 -top-48 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.07) 0%, transparent 65%)' }}
      />
      <div
        className="absolute -left-48 -bottom-48 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(111,207,124,0.05) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#4CAF50] font-mono text-xs uppercase tracking-[0.2em]">
              Por que a Camporiza?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F2F7F2] mt-3 mb-6 leading-tight">
              Liderança em drones agrícolas no Mato Grosso do Sul
            </h2>
            <p className="text-[#6B7D6B] text-lg leading-relaxed mb-4">
              A Camporiza nasceu da paixão pela agricultura e pela inovação tecnológica.
              Combinamos expertise agronômica com equipamentos de última geração para oferecer
              serviços que realmente fazem diferença no campo.
            </p>
            <p className="text-[#6B7D6B] leading-relaxed mb-10">
              Atendemos produtores rurais em todo o Mato Grosso do Sul, desde pequenas
              propriedades familiares até grandes fazendas de produção em escala industrial.
            </p>
            <motion.a
              href="#contato"
              className="inline-flex items-center gap-2 bg-[#4CAF50] text-white px-8 py-4 rounded-xl font-bold shadow-[0_8px_32px_rgba(76,175,80,0.3)] hover:bg-[#3d9e42] transition-colors duration-200"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Fale com um especialista
            </motion.a>
          </motion.div>

          {/* Right grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={i}
                className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/8 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#4CAF50] flex items-center justify-center mb-4">
                  <reason.icon size={20} className="text-white" />
                </div>
                <h3 className="text-[#F2F7F2] font-bold text-base mb-2">{reason.title}</h3>
                <p className="text-[#6B7D6B] text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
