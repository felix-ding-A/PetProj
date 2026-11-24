import type { Metadata } from 'next'
import Link from 'next/link'
import { getPets } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SpeciesCartoonSvg } from '@/components/illustrations/Mascots'
import { CTABanner } from '@/components/sections/CommonSections'

export const metadata: Metadata = {
  title: 'Custom Pet Supplements by Species | NovaPet Nutra',
  description:
    'Species-specific OEM/ODM pet supplement formulation for dogs, cats, small pets, poultry, and horses.',
  alternates: { canonical: '/custom-formulation/by-pet' },
}

export default async function ByPetIndexPage() {
  const pets = await getPets()

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Custom Formulation', href: '/custom-formulation' },
              { name: 'By Pet Species', href: '/custom-formulation/by-pet' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Formulate by <span className="text-brand-goldText">Target Pet Species</span>
          </h1>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <Link
            key={pet.slug}
            href={`/custom-formulation/by-pet/${pet.slug}`}
            className="soft-card rounded-3xl p-6 space-y-4"
          >
            <div
              className="h-36 rounded-2xl flex items-end justify-center"
              style={{ backgroundColor: pet.pastelBg }}
            >
              <SpeciesCartoonSvg species={pet.slug} className="w-28 h-28" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-brand-ink">{pet.name}</h2>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">{pet.description}</p>
            </div>
          </Link>
        ))}
      </section>
      <CTABanner />
    </>
  )
}

