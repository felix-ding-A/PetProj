import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDosageForms, getIngredientBySlug, getIngredients } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner } from '@/components/sections/CommonSections'

export const dynamicParams = false

export async function generateStaticParams() {
  const list = await getIngredients()
  return list.map((i) => ({ ingredient: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ingredient: string }>
}): Promise<Metadata> {
  const { ingredient } = await params
  const item = await getIngredientBySlug(ingredient)
  if (!item) return {}
  return {
    title: item.metaTitle,
    description: item.metaDescription,
    alternates: { canonical: `/custom-formulation/ingredients/${item.slug}` },
  }
}

export default async function IngredientDetailPage({
  params,
}: {
  params: Promise<{ ingredient: string }>
}) {
  const { ingredient } = await params
  const [item, forms] = await Promise.all([getIngredientBySlug(ingredient), getDosageForms()])
  if (!item) notFound()

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
              { name: item.name, href: `/custom-formulation/ingredients/${item.slug}` },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{item.name}</h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl">{item.description}</p>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="soft-card rounded-3xl p-7">
          <h2 className="text-xl font-extrabold text-brand-ink mb-4">Representative Qualified Actives</h2>
          <div className="flex flex-wrap gap-2.5">
            {item.examples.map((ex) => (
              <span
                key={ex}
                className="px-4 py-2 rounded-full bg-brand-creamDeep border border-brand-border text-xs font-extrabold text-brand-ink"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-brand-ink mb-4">Compatible Dosage Forms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {forms.map((f) => (
              <Link
                key={f.slug}
                href={`/${f.slug}`}
                className="bg-white rounded-2xl border border-brand-border p-4 hover:border-brand-gold transition-colors"
              >
                <div className="font-extrabold text-sm text-brand-ink">{f.name}</div>
                <div className="text-[11px] text-amber-800 font-bold mt-1">View specs →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABanner headline={`Formulate with ${item.name}`} />
    </>
  )
}

