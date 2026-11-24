import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { getDosageForms, getEffects, getPetBySlug, getPets } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { SpeciesCartoonSvg } from '@/components/illustrations/Mascots'
import { CTABanner } from '@/components/sections/CommonSections'

export const dynamicParams = false

export async function generateStaticParams() {
  const list = await getPets()
  return list.map((p) => ({ pet: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pet: string }>
}): Promise<Metadata> {
  const { pet } = await params
  const item = await getPetBySlug(pet)
  if (!item) return {}
  return {
    title: item.metaTitle,
    description: item.metaDescription,
    alternates: { canonical: `/custom-formulation/by-pet/${item.slug}` },
  }
}

export default async function ByPetDetailPage({
  params,
}: {
  params: Promise<{ pet: string }>
}) {
  const { pet } = await params
  const [item, forms, effects] = await Promise.all([
    getPetBySlug(pet),
    getDosageForms(),
    getEffects(),
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
              { name: 'By Pet Species', href: '/custom-formulation/by-pet' },
              { name: item.name, href: `/custom-formulation/by-pet/${item.slug}` },
            ]}
          />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                <span className="text-brand-goldText">
                  {item.slug === 'dogs'
                    ? 'Dog'
                    : item.slug === 'cats'
                      ? 'Cat'
                      : 'Small Pet & Equine'}
                </span>{' '}
                Supplement Manufacturer
              </h1>
              <p className="text-sm sm:text-base text-white/85">{item.description}</p>
            </div>
            <div
              className="w-36 h-36 rounded-3xl flex items-end justify-center shrink-0 border-2 border-white/30"
              style={{ backgroundColor: item.pastelBg }}
            >
              <SpeciesCartoonSvg species={item.slug} className="w-28 h-28" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="soft-card rounded-3xl p-7 space-y-3">
          <h2 className="text-xl font-extrabold text-brand-ink">{item.name} Formulation Standards</h2>
          <ul className="space-y-2.5 text-sm text-brand-ink font-medium">
            {item.formulationNotes.map((note) => (
              <li key={note} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-brand-ink">
            Browse {item.name} Matrix Blueprints ({forms.length} Forms × {effects.length} Effects)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {effects.slice(0, 9).map((eff) => (
              <div key={eff.slug} className="bg-white rounded-2xl border border-brand-border p-5 space-y-2.5">
                <h3 className="font-extrabold text-sm text-brand-ink">{eff.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {forms.map((f) => (
                    <Link
                      key={f.shortSlug}
                      href={`/custom-formulation/${item.slug}/${f.shortSlug}/${eff.slug}`}
                      className="px-2.5 py-1 rounded-full bg-brand-cream border border-brand-border hover:border-brand-gold text-[11px] font-bold text-brand-ink"
                    >
                      {f.shortSlug}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner headline={`Formulate custom ${item.name.toLowerCase()} supplements`} />
    </>
  )
}

