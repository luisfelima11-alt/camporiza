'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Cpu, MapPin, Clock } from 'lucide-react'

const reasons = [
  {
    icon: Zap,
    title: 'Profissionalismo',
    description:
      'Omar e Pedro trazem dedicação total a cada serviço. Pontualidade, transparência e comprometimento com o resultado do produtor.',
  },
  {
    icon: Clock,
    title: 'Rapidez',
    description:
      'Entre 10 e 20 ha por bateria. Os drones T40 e T50 são os mais produtivos do mercado — sua lavoura tratada no menor tempo possível.',
  },
  {
    icon: Cpu,
    title: 'DJI Agras T40 & T50',
    description:
      'Equipamentos de última geração com tanque de 40 litros, faixa de até 11 metros e tecnologia de atomização ativa.',
  },
  {
    icon: MapPin,
    title: 'Áreas de Difícil Acesso',
    description:
      'A Camporiza nasceu exatamente para isso: chegar onde máquina convencional não consegue — encostas, beiras de mata, terrenos irregulares.',
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
              Fundada em Nova Andradina, voando em todo o MS
            </h2>
            <p className="text-[#6B7D6B] text-lg leading-relaxed mb-4">
              A Camporiza nasceu em 2024 da necessidade de maquinário de pulverização em áreas de
              difícil acesso. Omar e Pedro viram o problema de perto e decidiram resolvê-lo com
              a tecnologia mais avançada disponível.
            </p>
            <p className="text-[#6B7D6B] leading-relaxed mb-10">
              Em dois anos, já são mais de 30 produtores atendidos e 3 mil hectares pulverizados
              em todo o Mato Grosso do Sul. Soja, milho, cana, eucalipto, pastagem — sem restrição de cultura ou tamanho de área.
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
