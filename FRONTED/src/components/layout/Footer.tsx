import Link from 'next/link'
import { NovaPetNutraLogo } from '@/components/illustrations/Mascots'

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white/80 pt-14 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <NovaPetNutraLogo light={true} />
            </Link>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Dedicated B2B pet supplement manufacturer for private label, white label, and custom OEM/ODM
              brands. We formulate, test, and scale chewable tablets, capsules, powders, liquid drops, and
              nutritional pastes in our FDA-registered, cGMP-certified facility.
            </p>
            <div className="text-[11px] font-semibold text-brand-goldText">
              FDA-Registered Facility · cGMP · ISO 22000 · HACCP · ISO-17025 Lot COAs
            </div>
          </div>

          {/* Column 1: Manufacturing */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">
              Manufacturing
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/chewable-tablet-manufacturing" className="hover:text-brand-goldText">Chewable Tablets &amp; Chews</Link></li>
              <li><Link href="/capsule-manufacturing" className="hover:text-brand-goldText">Pet Capsules</Link></li>
              <li><Link href="/powder-manufacturing" className="hover:text-brand-goldText">Meal Toppers &amp; Powders</Link></li>
              <li><Link href="/drops-manufacturing" className="hover:text-brand-goldText">Liquid Drops &amp; Oils</Link></li>
              <li><Link href="/paste-manufacturing" className="hover:text-brand-goldText">Pastes &amp; Dental Gels</Link></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">
              Solutions &amp; Catalog
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/private-label" className="hover:text-brand-goldText">Private Label Catalog</Link></li>
              <li><Link href="/custom-formulation" className="hover:text-brand-goldText">Custom Formulation R&amp;D</Link></li>
              <li><Link href="/custom-formulation/by-pet" className="hover:text-brand-goldText">Formulas by Pet Species</Link></li>
              <li><Link href="/custom-formulation/effects" className="hover:text-brand-goldText">16 Pet Health Effects</Link></li>
              <li><Link href="/custom-formulation/ingredients" className="hover:text-brand-goldText">Ingredient Categories</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-3">
              Trust &amp; Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/our-process" className="hover:text-brand-goldText">5-Step Custom Process</Link></li>
              <li><Link href="/quality-compliance" className="hover:text-brand-goldText">Quality &amp; Compliance</Link></li>
              <li><Link href="/our-facility" className="hover:text-brand-goldText">Facility &amp; Capacity</Link></li>
              <li><Link href="/about-us" className="hover:text-brand-goldText">About Us</Link></li>
              <li><Link href="/about-us/certifications" className="hover:text-brand-goldText">Certifications</Link></li>
              <li><Link href="/faq" className="hover:text-brand-goldText">Procurement FAQ</Link></li>
              <li><Link href="/insights" className="hover:text-brand-goldText">Insights &amp; Guides</Link></li>
              <li><Link href="/contact-us" className="text-brand-goldText font-bold">Request a Quote →</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/55">
          <div>© {new Date().getFullYear()} NovaPet Nutra. All rights reserved. Private Label Pet Nutrition OEM/ODM.</div>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-white">XML Sitemap</Link>
            <Link href="/contact-us" className="hover:text-white">B2B Inquiry Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
