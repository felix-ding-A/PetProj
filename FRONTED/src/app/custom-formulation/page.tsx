import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getDosageForms, getEffects, getIngredients, getPets } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SpeciesCartoonSvg } from '@/components/illustrations/Mascots'
import { CTABanner, QualityTrio } from '@/components/sections/CommonSections'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Custom Pet Supplement Formulation R&D | NovaPet Nutra',
  description:
    'Bespoke pet supplement OEM/ODM formulation across dogs, cats & small pets, 16 health effects, 8 ingredient classes, and 5 dosage forms.',
  alternates: { canonical: '/custom-formulation' },
}

export default async function CustomFormulationPage() {
  const [pets, effects, ingredients, forms] = await Promise.all([
    getPets(),
    getEffects(),
    getIngredients(),
    getDosageForms(),
  ])

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Custom Formulation', href: '/custom-formulation' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">
            Custom Pet Supplement <span className="text-brand-goldText">Formulation Matrix</span>
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl leading-relaxed">
            Build proprietary, NDA-protected pet supplements by combining your target species, active ingredient
            system, health benefit, and ideal dosage form.
          </p>
        </div>
      </section>

      {/* Dimension 1: By Pet Species */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">DIMENSION 1</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mt-1">Formulate by Pet Species</h2>
          </div>
          <Link href="/custom-formulation/by-pet" className="text-xs font-extrabold text-amber-800">
            All Species →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pets.map((pet) => (
            <Link
              key={pet.slug}
              href={`/custom-formulation/by-pet/${pet.slug}`}
              className="soft-card rounded-2xl p-5 flex items-center gap-4"
            >
              <div
                className="w-20 h-20 rounded-xl flex items-end justify-center shrink-0"
                style={{ backgroundColor: pet.pastelBg }}
              >
                <SpeciesCartoonSvg species={pet.slug} className="w-16 h-16" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-brand-ink">{pet.name}</h3>
                <p className="text-xs text-brand-muted mt-1">{pet.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Dimension 2: 16 Pet Health Effects */}
      <section className="py-14 bg-brand-creamDeep border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">DIMENSION 2</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mt-1">
                16 Pet-Specific Health Effects
              </h2>
            </div>
            <Link href="/custom-formulation/effects" className="text-xs font-extrabold text-amber-800">
              View All 16 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {effects.map((eff) => (
              <Link
                key={eff.slug}
                href={`/custom-formulation/effects/${eff.slug}`}
                className="bg-white rounded-2xl border border-brand-border p-4 hover:border-brand-gold transition-colors"
              >
                <h3 className="font-extrabold text-sm text-brand-ink">{eff.name}</h3>
                <p className="text-xs text-brand-muted mt-1 line-clamp-2">{eff.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dimension 3: 8 Ingredient Categories */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">DIMENSION 3</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mt-1">
              8 Core Ingredient Categories
            </h2>
          </div>
          <Link href="/custom-formulation/ingredients" className="text-xs font-extrabold text-amber-800">
            All Ingredients →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ingredients.map((ing) => (
            <Link
              key={ing.slug}
              href={`/custom-formulation/ingredients/${ing.slug}`}
              className="soft-card rounded-2xl p-5 space-y-2"
            >
              <h3 className="font-extrabold text-sm text-brand-ink">{ing.name}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{ing.description}</p>
              <div className="text-[11px] font-bold text-amber-800 inline-flex items-center gap-1 pt-1">
                <span>Explore actives</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Cross-Combination Quick Links */}
        <div className="mt-12 bg-white rounded-3xl border border-brand-border p-6 sm:p-8">
          <h3 className="font-extrabold text-lg text-brand-ink mb-4">
            Popular Species × Dosage Form × Effect Blueprints
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {[
              { href: '/custom-formulation/dogs/chewable-tablet/joint-health', label: 'Dogs · Chewable Tablets · Joint Health' },
              { href: '/custom-formulation/dogs/chewable-tablet/allergy-relief', label: 'Dogs · Chewable Tablets · Allergy Relief' },
              { href: '/custom-formulation/cats/paste/hairball-control', label: 'Cats · Pastes · Hairball Control' },
              { href: '/custom-formulation/cats/capsule/gut-health', label: 'Cats · Capsules · Gut Health' },
              { href: '/custom-formulation/dogs/drops/skin-coat', label: 'Dogs · Drops · Skin & Coat' },
              { href: '/custom-formulation/small-pets/powder/immune-support', label: 'Small Pets · Powders · Immune Support' },
            ].map((combo) => (
              <Link
                key={combo.href}
                href={combo.href}
                className="px-3.5 py-2 rounded-full bg-brand-cream border border-brand-border hover:border-brand-gold text-xs font-bold text-brand-ink transition-colors"
              >
                {combo.label} →
              </Link>
            ))}
          </div>
          <div className="mt-4 text-xs text-brand-muted">
            Covering {pets.length} species × {forms.length} dosage forms × {effects.length} health effects ={' '}
            <strong>{pets.length * forms.length * effects.length}</strong> structured OEM blueprints.
          </div>
        </div>
      </section>

      <QualityTrio />
      <CTABanner />
    </>
  )
}

