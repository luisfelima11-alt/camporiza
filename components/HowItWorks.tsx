'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ClipboardList, Route, FileText } from 'lucide-react'
import DroneIcon from '@/components/DroneIcon'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Diagnóstico da Lavoura',
    description:
      'Realizamos uma avaliação técnica completa da sua propriedade, identificando necessidades específicas de cada talhão e cultura.',
  },
  {
    number: '02',
    icon: Route,
    title: 'Planejamento de Rota',
    description:
      'Nossa equipe planeja rotas otimizadas com software especializado para cobertura total da área com uniformidade máxima na aplicação.',
  },
  {
    number: '03',
    icon: DroneIcon,
    title: 'Execução do Voo',
    description:
      'Operamos drones de alta performance com navegação GPS RTK para aplicação precisa, eficiente e rastreável em qualquer condição.',
  },
  {
    number: '04',
    icon: FileText,
    title: 'Relatório de Resultado',
    description:
      'Entregamos laudo técnico detalhado com mapa de cobertura, volume aplicado e todas as informações para sua gestão agrícola.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="como-funciona" ref={ref} className="py-24 bg-[#F5F9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#4CAF50] font-mono text-xs uppercase tracking-[0.2em]">
            Como Funciona
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0D1A0D] mt-3 mb-4">
            Do diagnóstico ao resultado
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Um processo simples, transparente e eficiente para garantir a máxima qualidade em
            cada operação de pulverização.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+40px)] right-[calc(12.5%+40px)] h-px bg-gradient-to-r from-transparent via-[#4CAF50] to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.14 }}
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-[#0A0E0A] flex items-center justify-center border-4 border-[#F5F9F5] shadow-xl">
                    <step.icon size={32} className="text-[#4CAF50]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-black">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#0D1A0D] mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <motion.a
            href="#contato"
            className="inline-flex items-center gap-2 bg-[#0A0E0A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1A221A] transition-colors duration-200 shadow-lg"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Quero começar agora
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
