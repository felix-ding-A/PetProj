'use client'

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
      title={`WhatsApp: ${COMPANY.whatsappDisplay}`}
      aria-label={`Chat with NovaPet Nutra on WhatsApp (${COMPANY.whatsappDisplay})`}
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1FB859] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-105"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.35.14 11.92c0 2.1.55 4.15 1.59 5.96L0 24l6.29-1.65a11.88 11.88 0 0 0 5.77 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.47-8.42ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.85 9.85 0 0 1-1.52-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.89 7c0 5.45-4.44 9.87-9.89 9.87Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>
  )
}
