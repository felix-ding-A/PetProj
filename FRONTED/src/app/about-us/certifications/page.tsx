import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import { getGalleryItems } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner } from '@/components/sections/CommonSections'
import { FacilityGallery } from '@/components/sections/FacilityGallery'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Manufacturing Certifications & Lab Testing | NovaPet Nutra',
  description:
    'FDA-registered facility, cGMP, ISO 22000, HACCP food-safety management, and ISO-17025 third-party Certificate of Analysis (COA) on every batch.',
  alternates: { canonical: '/about-us/certifications' },
}

const CERTS = [
  {
    name: 'FDA-Registered Facility',
    detail: 'Registered animal feed & nutraceutical manufacturing facility maintaining current facility registration and inspection readiness. (Note: Dietary supplements are not "FDA approved".)',
  },
  {
    name: 'cGMP (Current Good Manufacturing Practice)',
    detail: 'End-to-end SOP governance for raw material quarantine, batch records, allergen sanitation, calibration, and finished-goods retention samples.',
  },
  {
    name: 'ISO 22000 & HACCP',
    detail: 'Internationally recognized food & feed safety management system identifying and controlling biological, chemical, and physical critical control points.',
  },
  {
    name: 'ISO/IEC 17025 Third-Party Lab COAs',
    detail: 'Independent accredited lab release testing for active potency, heavy metals (Pb, As, Cd, Hg), Salmonella, E. coli, yeast, and mold on every lot.',
  },
]

export default async function CertificationsPage() {
  const certPhotos = await getGalleryItems({ categories: ['certification', 'lab'] })

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'About Us', href: '/about-us' },
              { name: 'Certifications', href: '/about-us/certifications' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Certifications &amp; <span className="text-brand-goldText">Quality Credentials</span>
          </h1>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTS.map((c) => (
          <div key={c.name} className="soft-card rounded-3xl p-7 space-y-3">
            <ShieldCheck className="w-6 h-6 text-amber-800" />
            <h2 className="text-lg font-extrabold text-brand-ink">{c.name}</h2>
            <p className="text-sm text-brand-muted leading-relaxed">{c.detail}</p>
          </div>
        ))}
      </section>

      <FacilityGallery
        items={certPhotos}
        title="Certifications, Audits & QC Laboratory Gallery"
        subtitle="Audit documentation, cleanroom compliance checkpoints, and ISO/IEC 17025 lab release workflows."
      />

      <CTABanner />
    </>
  )
}

