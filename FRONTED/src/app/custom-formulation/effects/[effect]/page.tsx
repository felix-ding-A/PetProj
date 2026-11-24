import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDosageForms, getEffectBySlug, getEffects, getPets } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner } from '@/components/sections/CommonSections'

export const dynamicParams = false

export async function generateStaticParams() {
  const list = await getEffects()
  return list.map((e) => ({ effect: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ effect: string }>
}): Promise<Metadata> {
  const { effect } = await params
  const item = await getEffectBySlug(effect)
  if (!item) return {}
  return {
    title: item.metaTitle,
    description: item.metaDescription,
    alternates: { canonical: `/custom-formulation/effects/${item.slug}` },
  }
}

export default async function EffectDetailPage({
  params,
}: {
  params: Promise<{ effect: string }>
}) {
  const { effect } = await params
  const [item, pets, forms] = await Promise.all([
    getEffectBySlug(effect),
    getPets(),
    getDosageForms(),
  ])
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
              { name: 'Health Effects', href: '/custom-formulation/effects' },
              { name: item.name, href: `/custom-formulation/effects/${item.slug}` },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{item.name}</h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl">{item.description}</p>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="soft-card rounded-3xl p-7">
          <h2 className="text-lg font-extrabold text-brand-ink mb-3">Commonly Formulated Actives</h2>
          <div className="flex flex-wrap gap-2">
            {item.keyActives.map((a) => (
              <span
                key={a}
                className="px-3.5 py-1.5 rounded-full bg-brand-creamDeep border border-brand-border text-xs font-extrabold text-brand-ink"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-brand-ink">
            Explore {item.name} Blueprints by Species &amp; Dosage Form
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pets.map((pet) => (
              <div key={pet.slug} className="bg-white rounded-2xl border border-brand-border p-5 space-y-3">
                <h3 className="font-extrabold text-base text-brand-ink">{pet.name}</h3>
                <ul className="space-y-2 text-xs font-bold">
                  {forms.map((f) => (
                    <li key={f.shortSlug}>
                      <Link
                        href={`/custom-formulation/${pet.slug}/${f.shortSlug}/${item.slug}`}
                        className="text-amber-800 hover:text-brand-ink"
                      >
                        {pet.name} {item.name} — {f.name} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner headline={`Build a custom ${item.name.toLowerCase()} supplement`} />
    </>
  )
}

