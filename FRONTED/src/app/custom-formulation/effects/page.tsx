import type { Metadata } from 'next'
import Link from 'next/link'
import { getEffects } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner } from '@/components/sections/CommonSections'

export const metadata: Metadata = {
  title: '16 Pet Supplement Health Effects & Benefits | Pawsome Labs',
  description:
    'Formulate across 16 pet-specific health benefits: joint mobility, gut probiotics, skin & coat, hairball control, dental care, calming, and urinary support.',
  alternates: { canonical: '/custom-formulation/effects' },
}

export default async function EffectsIndexPage() {
  const effects = await getEffects()

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Custom Formulation', href: '/custom-formulation' },
              { name: 'Health Effects', href: '/custom-formulation/effects' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            16 Pet-Specific <span className="text-pawzo-goldText">Health Effects</span>
          </h1>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {effects.map((eff) => (
          <Link
            key={eff.slug}
            href={`/custom-formulation/effects/${eff.slug}`}
            className="soft-card rounded-2xl p-6 space-y-2.5"
          >
            <h2 className="font-extrabold text-base text-pawzo-ink">{eff.name}</h2>
            <p className="text-xs text-pawzo-muted leading-relaxed">{eff.description}</p>
            <div className="text-[11px] font-bold text-amber-800 pt-1">View blueprints →</div>
          </Link>
        ))}
      </section>
      <CTABanner />
    </>
  )
}

