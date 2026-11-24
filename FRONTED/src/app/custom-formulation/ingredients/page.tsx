import type { Metadata } from 'next'
import Link from 'next/link'
import { getIngredients } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner } from '@/components/sections/CommonSections'

export const metadata: Metadata = {
  title: 'Pet Supplement Active Ingredient Categories | NovaPet Nutra',
  description:
    'Explore 8 pet-safe nutraceutical ingredient classes: probiotics, joint actives, omega lipids, botanicals, functional mushrooms, and amino acids.',
  alternates: { canonical: '/custom-formulation/ingredients' },
}

export default async function IngredientsIndexPage() {
  const ingredients = await getIngredients()

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Custom Formulation', href: '/custom-formulation' },
              { name: 'Ingredients', href: '/custom-formulation/ingredients' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Pet Nutraceutical <span className="text-brand-goldText">Ingredient Library</span>
          </h1>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {ingredients.map((ing) => (
          <Link
            key={ing.slug}
            href={`/custom-formulation/ingredients/${ing.slug}`}
            className="soft-card rounded-3xl p-7 space-y-3"
          >
            <h2 className="text-xl font-extrabold text-brand-ink">{ing.name}</h2>
            <p className="text-sm text-brand-muted leading-relaxed">{ing.description}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {ing.examples.map((ex) => (
                <span
                  key={ex}
                  className="px-2.5 py-1 rounded-full bg-brand-cream border border-brand-border text-xs font-bold text-brand-ink"
                >
                  {ex}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
      <CTABanner />
    </>
  )
}

