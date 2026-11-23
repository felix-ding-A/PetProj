'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, Briefcase } from 'lucide-react'
import { PawLogoSvg } from '@/components/illustrations/Mascots'
import { useQuoteBox } from '@/lib/quote-context'

const MANUFACTURING_LINKS = [
  { name: 'Chewable Tablets & Soft Chews', href: '/chewable-tablet-manufacturing' },
  { name: 'Pet Capsules', href: '/capsule-manufacturing' },
  { name: 'Meal Toppers & Powders', href: '/powder-manufacturing' },
  { name: 'Liquid Drops & Oils', href: '/drops-manufacturing' },
  { name: 'Nutritional Pastes & Gels', href: '/paste-manufacturing' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { items, openDrawer } = useQuoteBox()

  return (
    <header className="sticky top-0 z-40 bg-pawzo-ink/95 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-8 h-8 rounded-full bg-pawzo-gold flex items-center justify-center text-pawzo-ink shadow-sm">
            <PawLogoSvg className="w-4 h-4" />
          </span>
          <span className="font-extrabold text-lg tracking-wider uppercase text-white">
            PAWSOME <span className="font-semibold text-pawzo-goldText">LABS</span>
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-white/90" aria-label="Primary">
          <div className="relative group py-5">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-pawzo-goldText transition-colors cursor-pointer"
            >
              <span>Manufacturing</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute left-0 top-full w-64 bg-white text-pawzo-ink rounded-2xl shadow-xl border border-pawzo-border p-2">
              {MANUFACTURING_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3.5 py-2.5 rounded-xl text-xs font-bold hover:bg-pawzo-creamDeep transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/private-label" className="hover:text-pawzo-goldText transition-colors">
            Private Label
          </Link>
          <Link href="/custom-formulation" className="hover:text-pawzo-goldText transition-colors">
            Custom R&amp;D
          </Link>
          <Link href="/our-process" className="hover:text-pawzo-goldText transition-colors">
            Process
          </Link>
          <Link href="/quality-compliance" className="hover:text-pawzo-goldText transition-colors">
            Quality &amp; Facility
          </Link>
          <Link href="/insights" className="hover:text-pawzo-goldText transition-colors">
            Insights
          </Link>
        </nav>

        {/* Right: Quote Box + CTA + Mobile Menu */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openDrawer}
            className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            aria-label="Open B2B Quote Box"
          >
            <Briefcase className="w-3.5 h-3.5 text-pawzo-goldText" />
            <span className="hidden sm:inline">Quote Box</span>
            <span className="bg-pawzo-gold text-pawzo-ink text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-5 text-center">
              {items.length}
            </span>
          </button>

          <Link
            href="/contact-us"
            className="pill-gold-btn px-4 py-2 rounded-full text-xs font-extrabold hidden sm:inline-flex items-center gap-1"
          >
            <span>Get a Quote</span>
            <span>→</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-full bg-white/10 text-white"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-pawzo-ink border-t border-white/10 px-6 py-4 space-y-2 text-sm font-semibold">
          <div className="text-[11px] uppercase tracking-wider text-pawzo-goldText pt-1">
            5 Dosage Forms
          </div>
          {MANUFACTURING_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 pl-2 text-white/90 hover:text-pawzo-goldText"
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-2 space-y-1.5">
            <Link href="/private-label" onClick={() => setMobileOpen(false)} className="block py-1.5">
              Private Label Catalog
            </Link>
            <Link href="/custom-formulation" onClick={() => setMobileOpen(false)} className="block py-1.5">
              Custom Formulation R&amp;D
            </Link>
            <Link href="/our-process" onClick={() => setMobileOpen(false)} className="block py-1.5">
              5-Step Process
            </Link>
            <Link href="/quality-compliance" onClick={() => setMobileOpen(false)} className="block py-1.5">
              Quality &amp; Compliance
            </Link>
            <Link href="/our-facility" onClick={() => setMobileOpen(false)} className="block py-1.5">
              Our Facility
            </Link>
            <Link href="/insights" onClick={() => setMobileOpen(false)} className="block py-1.5">
              Insights
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-pawzo-goldText font-extrabold"
            >
              Request Custom Quote →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

