'use client'

import Link from 'next/link'
import { MessageCircle, Mail } from 'lucide-react'

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@novapetnutra.com'
const WHATSAPP_RAW = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/[^\d]/g, '')

export function FloatingContactButton() {
  if (WHATSAPP_RAW) {
    const waUrl = `https://wa.me/${WHATSAPP_RAW}?text=${encodeURIComponent(
      'Hi NovaPet Nutra, I would like to inquire about private label / OEM pet supplement manufacturing.'
    )}`
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with NovaPet Nutra on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1FB859] text-white text-xs font-extrabold shadow-xl transition-transform hover:scale-105"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp Desk</span>
      </a>
    )
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <a
        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Pet Supplement OEM / Private Label Inquiry')}`}
        aria-label={`Email ${CONTACT_EMAIL}`}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-brand-ink hover:bg-amber-950 text-brand-goldText border border-brand-gold/40 text-xs font-extrabold shadow-xl transition-transform hover:scale-105"
      >
        <Mail className="w-4 h-4" />
        <span className="hidden sm:inline">{CONTACT_EMAIL}</span>
      </a>
      <Link
        href="/contact-us"
        className="pill-gold-btn px-4 py-3 rounded-full text-xs font-extrabold shadow-xl"
      >
        Get Quote
      </Link>
    </div>
  )
}

