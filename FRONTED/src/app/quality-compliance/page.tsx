import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, FlaskConical, FileCheck2, Globe } from 'lucide-react'
import { getCompanyDocuments } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner, PdfDownloads, QualityTrio } from '@/components/sections/CommonSections'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Pet Supplement Quality & Regulatory Compliance | NovaPet Nutra',
  description:
    'FDA-registered cGMP, ISO 22000 & HACCP pet supplement manufacturing. ISO-17025 COA lab testing, AAFCO nutrient profile alignment, and EU feed guidance.',
  alternates: { canonical: '/quality-compliance' },
}

export default async function QualityCompliancePage() {
  const documents = await getCompanyDocuments()

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Quality & Compliance', href: '/quality-compliance' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Quality Assurance &amp; <span className="text-pawzo-goldText">Global Compliance</span>
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl leading-relaxed">
            Every lot is manufactured in our FDA-registered, cGMP, ISO 22000 &amp; HACCP facility and released
            only after independent ISO-17025 laboratory verification.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: 'cGMP, ISO 22000 & HACCP Controls',
              body: 'Strict raw-material quarantine, supplier COA verification, allergen line-clearance SOPs, and batch record traceability from incoming drum to finished carton.',
            },
            {
              icon: FlaskConical,
              title: 'ISO-17025 Third-Party Lot COAs',
              body: 'Each finished batch is verified for active potency, heavy metals (Lead, Arsenic, Cadmium, Mercury), pathogens (Salmonella, E. coli), yeast, mold, and water activity.',
            },
            {
              icon: FileCheck2,
              title: 'US Market Labeling (AAFCO Profiles & NASC Alignment)',
              body: 'Where substantiation exists, formulas are designed to AAFCO nutrient profiles and formatted with clear Guaranteed Analysis tables. Note: our facility is FDA-registered (dietary supplements are not "FDA approved").',
            },
            {
              icon: Globe,
              title: 'EU & UK Complementary Feed Documentation',
              body: 'We support EU/UK importers with feed-material compliance reviews, additive registration checks, and export health documentation.',
            },
          ].map((card) => {
            const Icon = card.icon
            return (
              <div key={card.title} className="soft-card rounded-3xl p-7 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-pawzo-creamDeep flex items-center justify-center text-amber-800">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-extrabold text-pawzo-ink">{card.title}</h2>
                <p className="text-sm text-pawzo-muted leading-relaxed">{card.body}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/about-us/certifications" className="text-xs font-extrabold text-amber-800 hover:text-pawzo-ink">
            View Full Certifications List →
          </Link>
          <span className="text-pawzo-border">|</span>
          <Link href="/our-facility" className="text-xs font-extrabold text-amber-800 hover:text-pawzo-ink">
            Explore Our Manufacturing Facility →
          </Link>
        </div>
      </section>

      <QualityTrio />
      <PdfDownloads documents={documents} />
      <CTABanner />
    </>
  )
}

