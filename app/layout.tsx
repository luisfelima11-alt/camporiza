import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Camporiza – Pulverização Agrícola com Drones | Mato Grosso do Sul',
  description:
    'Pulverização agrícola com drones de alta performance no Mato Grosso do Sul. Precisão milimétrica, tecnologia GPS RTK e equipe certificada ANAC.',
  keywords: 'pulverização agrícola, drones agrícolas, Mato Grosso do Sul, agro drone, pulverização de precisão',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
