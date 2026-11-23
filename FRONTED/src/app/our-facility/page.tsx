import type { Metadata } from 'next'
import Link from 'next/link'
import { getCompanyDocuments, getDosageForms } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner, PdfDownloads } from '@/components/sections/CommonSections'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Pet Supplement Manufacturing Facility & Capacity | Pawsome Labs',
  description:
    'Inside our FDA-registered cGMP pet supplement plant: cold-extrusion lines, encapsulation suites, powder blending, liquid nitrogen bottling, and vacuum paste lines.',
  alternates: { canonical: '/our-facility' },
}

export default async function OurFacilityPage() {
  const [forms, documents] = await Promise.all([getDosageForms(), getCompanyDocuments()])

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Our Facility & Capacity', href: '/our-facility' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Manufacturing <span className="text-pawzo-goldText">Facility &amp; Capacity</span>
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl leading-relaxed">
            Purpose-built cleanrooms engineered for both 500-unit pilot launches and nationwide retail scale
            across all 5 pet supplement dosage forms.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { metric: '500 Units', label: 'Private Label Pilot MOQ' },
            { metric: '< 38°C', label: 'No-Heat Cold Extrusion' },
            { metric: '< 35% RH', label: 'Dehumidified Powder Suites' },
            { metric: '18–28 Days', label: 'Turnkey Production Lead Time' },
          ].map((m) => (
            <div key={m.label} className="soft-card rounded-2xl p-6 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-pawzo-ink">{m.metric}</div>
              <div className="text-xs font-semibold text-pawzo-muted mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-pawzo-border overflow-hidden">
          <div className="px-6 py-4 bg-pawzo-ink text-white font-extrabold text-sm">
            Production Line Capabilities &amp; MOQ Matrix
          </div>
          <div className="divide-y divide-pawzo-border">
            {forms.map((f) => (
              <div key={f.slug} className="p-5 grid grid-cols-1 md:grid-cols-4 gap-3 items-center text-sm">
                <Link href={`/${f.slug}`} className="font-extrabold text-pawzo-ink hover:text-amber-800">
                  {f.name} →
                </Link>
                <div className="text-xs text-pawzo-muted">{f.specs.formats}</div>
                <div className="text-xs font-bold text-pawzo-ink">{f.moq}</div>
                <div className="text-xs text-amber-800 font-bold">{f.leadTime}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PdfDownloads documents={documents} />
      <CTABanner />
    </>
  )
}

