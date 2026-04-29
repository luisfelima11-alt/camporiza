'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Plane, Eye, Map, BarChart3, Shield, Clock } from 'lucide-react'

const services = [
  {
    icon: Plane,
    title: 'Pulverização de Precisão',
    description:
      'Aplicação de defensivos e fertilizantes com precisão milimétrica, reduzindo desperdício e maximizando a eficiência do produto em cada metro da lavoura.',
  },
  {
    icon: Map,
    title: 'Mapeamento Aéreo',
    description:
      'Levantamento topográfico e mapeamento completo da sua propriedade com imagens em alta resolução e precisão centimétrica.',
  },
  {
    icon: Eye,
    title: 'Monitoramento de Lavouras',
    description:
      'Supervisão periódica com análise de imagens multiespectrais para detecção precoce de pragas, doenças e deficiências nutricionais.',
  },
  {
    icon: BarChart3,
    title: 'Relatórios e Análises',
    description:
      'Laudos técnicos detalhados com dados precisos sobre cada operação, auxiliando no planejamento e tomada de decisão agrícola.',
  },
  {
    icon: Shield,
    title: 'Aplicação Segura',
    description:
      'Operações realizadas com total segurança, seguindo todas as normas da ANAC e MAPA para voos agrícolas com drones.',
  },
  {
    icon: Clock,
    title: 'Atendimento Ágil',
    description:
      'Resposta rápida e programação eficiente para atender sua lavoura no momento certo, sem atrasos que comprometam sua produção.',
  },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="servicos" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#4CAF50] font-mono text-xs uppercase tracking-[0.2em]">
            Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0D1A0D] mt-3 mb-4">
            Soluções completas para sua lavoura
          </h2>
          <p className="text-gray-500 max-w-xl leading-relaxed">
            Tecnologia de ponta e equipe especializada para garantir máxima produtividade e
            segurança em cada operação.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-[#4CAF50]/40 hover:shadow-[0_4px_24px_rgba(76,175,80,0.08)] transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Top accent line on hover */}
              <div className="w-0 group-hover:w-8 h-0.5 bg-[#4CAF50] mb-5 transition-all duration-300" />

              <div className="w-12 h-12 rounded-xl bg-[#F0F9F0] flex items-center justify-center mb-5">
                <service.icon size={22} className="text-[#1A4A1A]" />
              </div>
              <h3 className="text-lg font-bold text-[#0D1A0D] mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
