'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 15000, prefix: '', suffix: '+', label: 'Hectares Pulverizados' },
  { value: 250, prefix: '', suffix: '+', label: 'Clientes Atendidos' },
  { value: 98, prefix: '', suffix: '%', label: 'Eficiência Operacional' },
  { value: 5, prefix: '+', suffix: ' anos', label: 'de Experiência' },
]

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2200
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-4xl sm:text-5xl font-black tabular-nums bg-gradient-to-r from-[#4CAF50] to-[#6FCF7C] bg-clip-text text-transparent">
      {prefix}
      {count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="bg-[#111811] py-16 border-t border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {inView && (
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              )}
              <p className="text-[#6B7D6B] mt-2 text-sm font-medium">{stat.label}</p>
              <div className="w-8 h-px bg-[#4CAF50]/40 mx-auto mt-4" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
