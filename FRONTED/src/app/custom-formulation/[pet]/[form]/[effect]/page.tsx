import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import {
  ALLOWED_DOSAGE_SHORT_SLUGS,
  getDosageFormByShortSlug,
  getEffectBySlug,
  getEffects,
  getPetBySlug,
  getPets,
  getProductsByForm,
} from '@/lib/data'
import type { DosageShortSlug } from '@/lib/data/types'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner } from '@/components/sections/CommonSections'

export const revalidate = 60
export const dynamicParams = false

// Controlled 3 species x 5 dosage forms x 16 pet effects = 240 static pages
export async function generateStaticParams() {
  const [pets, effects] = await Promise.all([getPets(), getEffects()])
  const combos: { pet: string; form: string; effect: string }[] = []
  for (const p of pets) {
    for (const f of ALLOWED_DOSAGE_SHORT_SLUGS) {
      for (const e of effects) {
        combos.push({ pet: p.slug, form: f, effect: e.slug })
      }
    }
  }
  return combos
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pet: string; form: string; effect: string }>
}): Promise<Metadata> {
  const { pet, form, effect } = await params
  const [petData, formData, effectData] = await Promise.all([
    getPetBySlug(pet),
    getDosageFormByShortSlug(form),
    getEffectBySlug(effect),
  ])
  if (!petData || !formData || !effectData) return {}

  const rawTitle = `Custom ${petData.name} ${effectData.name} ${formData.name} OEM`
  const title = rawTitle.length <= 62 ? rawTitle : `${petData.name} ${effectData.name} OEM | NovaPet Nutra`.slice(0, 62)
  const desc = `cGMP OEM/ODM manufacturing for ${petData.name.toLowerCase()} ${effectData.name.toLowerCase()} ${formData.name.toLowerCase()}. Key actives: ${effectData.keyActives.slice(0, 3).join(', ')}.`.slice(
    0,
    159
  )

  return {
    title,
    description: desc,
    alternates: { canonical: `/custom-formulation/${petData.slug}/${formData.shortSlug}/${effectData.slug}` },
  }
}

export default async function CrossMatrixPage({
  params,
}: {
  params: Promise<{ pet: string; form: string; effect: string }>
}) {
  const { pet, form, effect } = await params

  // Strict allowlist validation prevents route penetration (e.g. /ingredients/foo/bar)
  if (!ALLOWED_DOSAGE_SHORT_SLUGS.includes(form as DosageShortSlug)) {
    notFound()
  }

  const [petData, formData, effectData] = await Promise.all([
    getPetBySlug(pet),
    getDosageFormByShortSlug(form),
    getEffectBySlug(effect),
  ])

  if (!petData || !formData || !effectData) {
    notFound()
  }

  const formProducts = await getProductsByForm(formData.shortSlug)
  const matchingProducts = formProducts.filter((p) => p.effects.includes(effectData.slug))

  return (
    <>
      <section className="hero-studio-bg text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Custom Formulation', href: '/custom-formulation' },
              { name: petData.name, href: `/custom-formulation/by-pet/${petData.slug}` },
              { name: effectData.name, href: `/custom-formulation/effects/${effectData.slug}` },
            ]}
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 border border-white/15 text-[11px] font-bold uppercase tracking-wider mb-3">
            <span className="text-pawzo-goldText">▸</span> CUSTOM OEM BLUEPRINT · {petData.name} ×{' '}
            {formData.shortSlug.toUpperCase()}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Custom {petData.name} <span className="text-pawzo-goldText">{effectData.name}</span>{' '}
            {formData.name}
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl leading-relaxed">
            {effectData.description} Manufactured on our cGMP {formData.name.toLowerCase()} lines ({formData.moq}).
          </p>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="soft-card rounded-3xl p-7 space-y-4">
            <h2 className="text-xl font-extrabold text-pawzo-ink">Recommended Active System</h2>
            <div className="flex flex-wrap gap-2">
              {effectData.keyActives.map((a) => (
                <span
                  key={a}
                  className="px-3.5 py-1.5 rounded-full bg-pawzo-creamDeep border border-pawzo-border text-xs font-extrabold text-pawzo-ink"
                >
                  {a}
                </span>
              ))}
            </div>
            <h3 className="text-sm font-extrabold text-pawzo-ink pt-2">
              {petData.name} Formulation Guardrails
            </h3>
            <ul className="space-y-2 text-xs text-pawzo-muted">
              {petData.formulationNotes.map((n) => (
                <li key={n} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>

          {matchingProducts.length > 0 && (
            <div className="soft-card rounded-3xl p-7 space-y-4">
              <h2 className="text-lg font-extrabold text-pawzo-ink">
                Turnkey Private Label Base Formulas Available
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingProducts.map((mp) => (
                  <Link
                    key={mp.slug}
                    href={`/private-label/${mp.form}/${mp.slug}`}
                    className="p-4 rounded-2xl bg-pawzo-cream border border-pawzo-border hover:border-pawzo-gold transition-colors"
                  >
                    <div className="font-extrabold text-sm text-pawzo-ink">{mp.name}</div>
                    <div className="text-[11px] text-amber-800 font-bold mt-1">
                      {mp.skuCount} base variants · View specs →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-pawzo-border p-7 space-y-3 text-sm">
            <h2 className="font-extrabold text-lg text-pawzo-ink">Dosage Form Specifications</h2>
            <p className="text-xs text-pawzo-muted">{formData.tagline}</p>
            <div className="pt-2 space-y-2 text-xs">
              <div><strong>Materials:</strong> {formData.specs.materials}</div>
              <div><strong>Formats:</strong> {formData.specs.formats}</div>
              <div><strong>MOQ:</strong> {formData.moq}</div>
              <div><strong>Lead Time:</strong> {formData.leadTime}</div>
            </div>
            <div className="pt-4 flex flex-col gap-2.5">
              <Link
                href={`/contact-us?form=${formData.shortSlug}`}
                className="pill-gold-btn py-3 rounded-full text-center text-xs font-extrabold"
              >
                Request Custom Formulation Quote →
              </Link>
              <Link
                href={`/${formData.slug}`}
                className="py-2.5 rounded-full bg-pawzo-cream border border-pawzo-border text-center text-xs font-extrabold text-pawzo-ink"
              >
                Full {formData.name} Capabilities
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <CTABanner />
    </>
  )
}

