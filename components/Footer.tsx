'use client'

import { Instagram, Facebook } from 'lucide-react'
import LogoCamporiza from '@/components/LogoCamporiza'

const navLinks = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#contato', label: 'Contato' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0E0A] pt-14 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Camporiza" className="w-10 h-10 object-contain rounded-full" />
              <div className="font-black text-xl text-[#F2F7F2]">
                CAMPO<span className="text-[#4CAF50]">RIZA</span>
              </div>
            </div>
            <p className="text-[#6B7D6B] text-sm leading-relaxed max-w-xs">
              Pulverização agrícola com drones de alta performance no Mato Grosso do Sul.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#F2F7F2] font-bold text-xs uppercase tracking-widest mb-5">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#6B7D6B] hover:text-[#4CAF50] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#F2F7F2] font-bold text-xs uppercase tracking-widest mb-5">
              Redes Sociais
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center hover:bg-[#4CAF50] hover:border-[#4CAF50] transition-all duration-200"
                >
                  <Icon size={16} className="text-[#6B7D6B]" />
                </a>
              ))}
            </div>
            <p className="text-[#6B7D6B] text-sm">(67) 9633-0973</p>
            <p className="text-[#6B7D6B] text-sm">contato@camporiza.com.br</p>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#6B7D6B]/50 text-xs">
            © {new Date().getFullYear()} Camporiza. Todos os direitos reservados.
          </p>
          <p className="text-[#6B7D6B]/50 text-xs">ANAC Homologado · Mato Grosso do Sul, Brasil</p>
        </div>
      </div>
    </footer>
  )
}
