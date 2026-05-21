'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Droplets, Wind, Leaf, Wheat, TreePine, Clock } from 'lucide-react'

const services = [
  {
    icon: Droplets,
    title: 'Pulverização de Defensivos',
    description:
      'Aplicação de herbicidas, fungicidas e inseticidas com drones DJI Agras T40 e T50. Faixa de 7 a 11 metros e capacidade de 40 litros por tanque.',
  },
  {
    icon: Wind,
    title: 'Dispersão de Sólidos',
    description:
      'Distribuição aérea de fertilizantes sólidos, sementes e outros insumos granulados com precisão e eficiência em qualquer tipo de terreno.',
  },
  {
    icon: Wheat,
    title: 'Soja e Milho',
    description:
      'Especialistas nas principais culturas do MS. Controle de pragas, doenças e plantas daninhas com aplicação no momento certo da cultura.',
  },
  {
    icon: Leaf,
    title: 'Cana-de-Açúcar e Pastagem',
    description:
      'Atendimento em canaviais e pastagens com drones que chegam onde máquinas convencionais não conseguem. Foi exatamente para isso que a Camporiza nasceu.',
  },
  {
    icon: TreePine,
    title: 'Eucalipto e Florestas',
    description:
      'Pulverização em plantações florestais com alta produtividade: entre 10 e 20 ha por bateria, economizando tempo e mão de obra.',
  },
  {
    icon: Clock,
    title: 'Atendimento a partir de 1 ha',
    description:
      'Nenhuma área é pequena demais. Atendemos desde 1 hectare com preço justo entre R$75 e R$125 por ha, dependendo do serviço e localização.',
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
            O drone certo para cada lavoura
          </h2>
          <p className="text-gray-500 max-w-xl leading-relaxed">
            Com DJI Agras T40 e T50, a Camporiza atende desde 1 hectare até grandes propriedades
            em todo o Mato Grosso do Sul, com profissionalismo e rapidez.
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
