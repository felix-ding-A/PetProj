'use client'

import { MessageCircle } from 'lucide-react'
import { COMPANY } from '@/lib/company'

export function FloatingContactButton() {
  const waUrl = `https://wa.me/${COMPANY.whatsappDigits}?text=${encodeURIComponent(
    'Hi NovaPet Nutra, I would like to inquire about private label / OEM pet supplement manufacturing.'
  )}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with NovaPet Nutra on WhatsApp (${COMPANY.whatsappDisplay})`}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1FB859] text-white text-xs font-extrabold shadow-xl transition-transform hover:scale-105"
    >
      <MessageCircle className="w-4 h-4" />
      <span className="hidden sm:inline">WhatsApp: {COMPANY.whatsappDisplay}</span>
    </a>
  )
}
