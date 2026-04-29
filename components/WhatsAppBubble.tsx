'use client'

import { motion } from 'framer-motion'

const WA_NUMBER = '556796330973'
const WA_MESSAGE = encodeURIComponent('Olá! Vim pelo site da Camporiza e gostaria de solicitar um orçamento.')

export default function WhatsAppBubble() {
  return (
    <motion.a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
    >
      {/* Tooltip label */}
      <motion.span
        className="hidden sm:block bg-white text-gray-800 text-sm font-semibold px-3 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
      >
        Falar no WhatsApp
      </motion.span>

      {/* Bubble */}
      <motion.div
        className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.5)]"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7 relative z-10"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.26 4.81L2 22l5.42-1.37a9.9 9.9 0 004.62 1.14c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.52 14.15c-.23.64-1.33 1.22-1.84 1.3-.47.07-1.07.1-1.72-.11-.4-.13-.9-.3-1.55-.58-2.73-1.18-4.51-3.95-4.65-4.13-.13-.19-1.1-1.47-1.1-2.8 0-1.32.69-1.97 1-2.27.3-.3.65-.37.87-.37.22 0 .43.01.62.02.2.01.47-.07.74.56.28.65.94 2.3 1.02 2.47.08.17.13.37.03.58-.1.2-.15.33-.3.51-.15.17-.32.38-.45.51-.15.15-.31.31-.13.61.18.3.79 1.31 1.7 2.12 1.17 1.04 2.15 1.36 2.45 1.52.3.15.48.13.66-.08.18-.21.77-.9.98-1.21.2-.3.41-.25.69-.15.28.1 1.79.84 2.1.99.3.15.5.22.57.35.07.12.07.7-.16 1.35z" />
        </svg>
      </motion.div>
    </motion.a>
  )
}
