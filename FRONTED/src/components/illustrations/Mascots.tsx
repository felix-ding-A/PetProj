import React from 'react'
import type { DosageShortSlug } from '@/lib/data/types'

export function PawLogoSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="7" cy="8" r="2.2" />
      <circle cx="12" cy="6" r="2.2" />
      <circle cx="17" cy="8" r="2.2" />
      <path d="M12 11c-3.2 0-6 2.1-6 4.8 0 1.6 1.3 2.7 3 2.7 1.1 0 2-.4 3-.4s1.9.4 3 .4c1.7 0 3-1.1 3-2.7 0-2.7-2.8-4.8-6-4.8z" />
    </svg>
  )
}

export function BoneAccentSvg({ className = 'w-9 h-9 text-white drop-shadow' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 24" fill="currentColor" aria-hidden="true">
      <path d="M9 5a4.5 4.5 0 0 0-3.5 7.3A4.5 4.5 0 1 0 11.8 17h24.4a4.5 4.5 0 1 0 6.3-4.7A4.5 4.5 0 1 0 36.2 7H11.8A4.5 4.5 0 0 0 9 5z" />
    </svg>
  )
}

export function BiscuitMascotSvg({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 440"
      className={`${className} drop-shadow-[0_24px_32px_rgba(45,32,10,0.35)]`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Biscuit the Border Collie — Pawsome Labs R&D Mascot"
    >
      <defs>
        <radialGradient id="furDark" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#3F424A" />
          <stop offset="55%" stopColor="#22242A" />
          <stop offset="100%" stopColor="#121317" />
        </radialGradient>
        <radialGradient id="furWhite" cx="45%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F1EFEA" />
          <stop offset="100%" stopColor="#D6D1C7" />
        </radialGradient>
        <linearGradient id="collarBlue" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <radialGradient id="tongueGrad" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#E11D48" />
        </radialGradient>
      </defs>

      <ellipse cx="215" cy="415" rx="135" ry="16" fill="rgba(45, 32, 10, 0.35)" />
      <path d="M120 355C72 345 64 295 95 278C115 268 135 295 142 335Z" fill="url(#furDark)" />
      <path d="M84 315C74 302 78 286 92 280C102 288 102 305 84 315Z" fill="url(#furWhite)" />
      <rect x="122" y="315" width="44" height="90" rx="22" fill="url(#furDark)" />
      <rect x="264" y="315" width="44" height="90" rx="22" fill="url(#furDark)" />
      <path
        d="M135 215C135 170 295 170 295 215L308 365C308 392 275 405 215 405C155 405 122 392 122 365L135 215Z"
        fill="url(#furDark)"
      />
      <path
        d="M168 205C168 205 156 290 176 345C192 382 238 382 254 345C274 290 262 205 262 205H168Z"
        fill="url(#furWhite)"
      />
      <rect x="155" y="265" width="42" height="135" rx="21" fill="url(#furDark)" />
      <rect x="233" y="265" width="42" height="135" rx="21" fill="url(#furDark)" />
      <ellipse cx="176" cy="398" rx="25" ry="14" fill="url(#furWhite)" />
      <ellipse cx="254" cy="398" rx="25" ry="14" fill="url(#furWhite)" />
      <path
        d="M148 196C185 214 245 214 282 196L286 218C245 236 185 236 144 218L148 196Z"
        fill="url(#collarBlue)"
      />
      <circle cx="215" cy="228" r="5" stroke="#E2E8F0" strokeWidth="2.5" />
      <rect x="197" y="233" width="36" height="14" rx="7" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <text
        x="215"
        y="242.5"
        textAnchor="middle"
        fill="#334155"
        fontWeight="800"
        fontSize="6.5"
      >
        BISCUIT
      </text>
      <path d="M142 82C112 72 95 96 104 128C110 148 128 145 144 124Z" fill="url(#furDark)" />
      <path d="M288 82C318 72 335 96 326 128C320 148 302 145 286 124Z" fill="url(#furDark)" />
      <rect x="134" y="64" width="162" height="142" rx="68" fill="url(#furDark)" />
      <path
        d="M215 66C206 66 202 98 196 118C172 124 156 144 162 172C168 196 262 196 268 172C274 144 258 124 234 118C228 98 224 66 215 66Z"
        fill="url(#furWhite)"
      />
      <circle cx="182" cy="116" r="13" fill="#FFFFFF" />
      <circle cx="184" cy="116" r="8.5" fill="#451A03" />
      <circle cx="184" cy="116" r="4.5" fill="#090D16" />
      <circle cx="181" cy="112" r="3" fill="#FFFFFF" />
      <circle cx="248" cy="116" r="13" fill="#FFFFFF" />
      <circle cx="246" cy="116" r="8.5" fill="#451A03" />
      <circle cx="246" cy="116" r="4.5" fill="#090D16" />
      <circle cx="243" cy="112" r="3" fill="#FFFFFF" />
      <path d="M180 156C195 174 235 174 250 156C246 184 184 184 180 156Z" fill="#4C0519" />
      <path d="M203 164C203 164 201 194 215 196C229 194 227 164 227 164Z" fill="url(#tongueGrad)" />
      <ellipse cx="215" cy="142" rx="16" ry="11" fill="#291D18" />
      <ellipse cx="210" cy="139" rx="5" ry="2.5" fill="rgba(255,255,255,0.45)" />
    </svg>
  )
}

export function SpeciesCartoonSvg({
  species,
  className = 'w-24 h-24',
}: {
  species: 'dogs' | 'cats' | 'small-pets'
  className?: string
}) {
  if (species === 'dogs') {
    return (
      <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
        <circle cx="60" cy="68" r="38" fill="#1E293B" />
        <path
          d="M60 32C55 32 52 52 48 64C34 68 28 80 32 95C36 108 84 108 88 95C92 80 86 68 72 64C68 52 65 32 60 32Z"
          fill="#FFFFFF"
        />
        <circle cx="45" cy="60" r="5" fill="#1E293B" />
        <circle cx="75" cy="60" r="5" fill="#1E293B" />
        <ellipse cx="60" cy="74" rx="7" ry="5" fill="#1E293B" />
        <path d="M54 84C54 84 54 96 60 97C66 96 66 84 66 84Z" fill="#FB7185" />
      </svg>
    )
  }
  if (species === 'cats') {
    return (
      <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
        <path d="M30 35L42 62L24 66Z" fill="#D97706" />
        <path d="M90 35L78 62L96 66Z" fill="#D97706" />
        <circle cx="60" cy="72" r="36" fill="#F59E0B" />
        <circle cx="46" cy="66" r="5" fill="#1E1B16" />
        <circle cx="74" cy="66" r="5" fill="#1E1B16" />
        <polygon points="56,77 64,77 60,82" fill="#FDA4AF" />
        <path d="M22 76H42M22 83H42M78 76H98M78 83H98" stroke="#FFFBEB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <ellipse cx="46" cy="34" rx="9" ry="22" fill="#F5EFE6" stroke="#1E1B16" strokeWidth="2" />
      <ellipse cx="74" cy="34" rx="9" ry="22" fill="#F5EFE6" stroke="#1E1B16" strokeWidth="2" />
      <ellipse cx="46" cy="36" rx="4" ry="13" fill="#FDA4AF" />
      <ellipse cx="74" cy="36" rx="4" ry="13" fill="#FDA4AF" />
      <circle cx="60" cy="76" r="31" fill="#FFFFFF" stroke="#1E1B16" strokeWidth="2" />
      <circle cx="49" cy="71" r="4.5" fill="#1E1B16" />
      <circle cx="71" cy="71" r="4.5" fill="#1E1B16" />
      <ellipse cx="60" cy="80" rx="4.5" ry="3" fill="#FB7185" />
    </svg>
  )
}

export function DosageCartoonSvg({
  form,
  className = 'w-24 h-24',
}: {
  form: DosageShortSlug | 'custom'
  className?: string
}) {
  switch (form) {
    case 'chewable-tablet':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
          <path d="M60 30C40 30 26 44 26 60C26 78 46 90 60 98C74 90 94 78 94 60C94 44 80 30 60 30Z" fill="#B45309" />
          <path d="M60 35C43 35 31 47 31 60C31 75 48 86 60 93C72 86 89 75 89 60C89 47 77 35 60 35Z" fill="#D97706" />
          <circle cx="48" cy="54" r="3" fill="#92400E" />
          <circle cx="70" cy="62" r="3.5" fill="#92400E" />
          <circle cx="56" cy="72" r="2.5" fill="#92400E" />
        </svg>
      )
    case 'capsule':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
          <g transform="rotate(-35 60 60)">
            <rect x="42" y="22" width="36" height="76" rx="18" fill="#FFFFFF" stroke="#1E1B16" strokeWidth="2.5" />
            <path d="M42 60H78V80C78 89.9411 69.9411 98 60 98C50.0589 98 42 89.9411 42 80V60Z" fill="#F5C443" stroke="#1E1B16" strokeWidth="2.5" />
            <path d="M51 34V50" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </svg>
      )
    case 'powder':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
          <rect x="34" y="34" width="52" height="64" rx="10" fill="#FFFFFF" stroke="#1E1B16" strokeWidth="2.5" />
          <rect x="38" y="22" width="44" height="12" rx="4" fill="#F5C443" stroke="#1E1B16" strokeWidth="2.2" />
          <rect x="36" y="52" width="48" height="28" fill="#FEF3C7" />
          <text x="60" y="69" textAnchor="middle" fill="#1E1B16" fontWeight="800" fontSize="9.5">
            POWDER
          </text>
        </svg>
      )
    case 'drops':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
          <path d="M60 22C60 22 35 54 35 73C35 87 46 98 60 98C74 98 85 87 85 73C85 54 60 22 60 22Z" fill="#F59E0B" stroke="#1E1B16" strokeWidth="2.2" />
          <path d="M50 64C47 71 48 79 54 84" stroke="#FEF3C7" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      )
    case 'paste':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
          <path d="M40 28H80L75 84H45L40 28Z" fill="#FFFFFF" stroke="#1E1B16" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="46" y="84" width="28" height="12" rx="3" fill="#F5C443" stroke="#1E1B16" strokeWidth="2.2" />
          <rect x="44" y="45" width="32" height="22" rx="4" fill="#FED7AA" />
          <text x="60" y="59" textAnchor="middle" fill="#1E1B16" fontWeight="800" fontSize="8.5">
            PASTE
          </text>
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
          <path d="M48 26H72M52 26V46L36 84C34 90 38 96 45 96H75C82 96 86 90 84 84L68 46V26" fill="#FFFFFF" stroke="#1E1B16" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M41 72H79L83 84C84 88 81 92 76 92H44C39 92 36 88 37 84L41 72Z" fill="#F5C443" />
          <circle cx="56" cy="81" r="2.5" fill="#FFFFFF" />
          <circle cx="65" cy="78" r="2" fill="#FFFFFF" />
        </svg>
      )
  }
}

