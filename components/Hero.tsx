'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0A0E0A] flex items-center overflow-hidden">
      {/* Atmospheric green glow blobs */}
      <div
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(111,207,124,0.06) 0%, transparent 70%)' }}
      />

      {/* Hexagon grid SVG pattern */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
            <polygon
              points="14,2 42,2 56,24 42,46 14,46 0,24"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>

      {/* Thin vertical accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4CAF50]/20 to-transparent hidden lg:block" />

      {/* Content — left-aligned on desktop */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 border border-[#4CAF50]/25 rounded-full px-4 py-1.5 mb-10"
          >
            <span className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full animate-pulse" />
            <span className="text-[#4CAF50] text-xs font-mono tracking-widest uppercase">
              Mato Grosso do Sul
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#F2F7F2] leading-[1.05] tracking-tight mb-0"
          >
            Sua lavoura
            <br />
            protegida com
            <br />
            <span className="bg-gradient-to-r from-[#4CAF50] to-[#6FCF7C] bg-clip-text text-transparent">
              precisão
            </span>{' '}
            <span className="text-[#F2F7F2]">milimétrica</span>
          </motion.h1>

          {/* Editorial rule + subtitle */}
          <motion.div variants={itemVariants} className="mt-8 mb-10">
            <hr className="border-none h-px bg-gradient-to-r from-[#4CAF50]/50 to-transparent mb-6 w-32" />
            <p className="text-lg text-[#6B7D6B] leading-relaxed max-w-xl">
              Pulverização agrícola com drones de alta performance no Mato Grosso do Sul.
              Tecnologia GPS RTK para maximizar a produtividade da sua lavoura.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#contato"
              className="flex items-center justify-center gap-2 bg-[#4CAF50] text-white px-8 py-4 rounded-xl font-bold text-base shadow-[0_8px_32px_rgba(76,175,80,0.4)] hover:bg-[#3d9e42] transition-colors duration-200"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Solicitar Orçamento
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#como-funciona"
              className="flex items-center justify-center gap-2 border border-white/15 text-[#F2F7F2] px-8 py-4 rounded-xl font-bold text-base hover:border-[#4CAF50]/50 hover:text-[#4CAF50] transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Como Funciona
            </motion.a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap gap-6 text-[#6B7D6B] text-xs font-mono uppercase tracking-widest"
          >
            {['ANAC Certificado', 'GPS RTK', 'Cobertura Total MS', 'Suporte 24h'].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#4CAF50] rounded-full" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-8 hidden lg:flex items-center gap-3 text-[#6B7D6B] text-xs font-mono"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={16} />
        <span>scroll</span>
      </motion.div>
    </section>
  )
}
