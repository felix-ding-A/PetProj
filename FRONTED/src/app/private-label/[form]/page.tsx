import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ALLOWED_DOSAGE_SHORT_SLUGS,
  getDosageFormByShortSlug,
  getProductsByForm,
} from '@/lib/data'
import type { DosageShortSlug } from '@/lib/data/types'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { DosageCartoonSvg } from '@/components/illustrations/Mascots'
import { AddToQuoteButton, CTABanner } from '@/components/sections/CommonSections'

export const revalidate = 60
export const dynamicParams = false

export async function generateStaticParams() {
  return ALLOWED_DOSAGE_SHORT_SLUGS.map((form) => ({ form }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ form: string }>
}): Promise<Metadata> {
  const { form } = await params
  const df = await getDosageFormByShortSlug(form)
  if (!df) return {}
  return {
    title: `Private Label ${df.name} Catalog | Pawsome Labs`.slice(0, 62),
    description: `Browse turnkey private label ${df.name.toLowerCase()} categories for dogs and cats. ${df.moq}, ${df.leadTime}.`.slice(0, 159),
    alternates: { canonical: `/private-label/${df.shortSlug}` },
  }
}

export default async function PrivateLabelFormCatalogPage({
  params,
}: {
  params: Promise<{ form: string }>
}) {
  const { form } = await params
  if (!ALLOWED_DOSAGE_SHORT_SLUGS.includes(form as DosageShortSlug)) notFound()

  const [df, products] = await Promise.all([
    getDosageFormByShortSlug(form),
    getProductsByForm(form as DosageShortSlug),
  ])
  if (!df) notFound()

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Private Label', href: '/private-label' },
              { name: df.name, href: `/private-label/${df.shortSlug}` },
            ]}
          />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Private Label <span className="text-pawzo-goldText">{df.name}</span>
              </h1>
              <p className="text-sm sm:text-base text-white/85">{df.tagline}</p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href={`/${df.slug}`}
                  className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-extrabold"
                >
                  See {df.name} Manufacturing Specs →
                </Link>
              </div>
            </div>
            <div
              className="w-32 h-32 rounded-3xl flex items-center justify-center shrink-0 border-2 border-white/30"
              style={{ backgroundColor: df.pastelBg }}
            >
              <DosageCartoonSvg form={df.shortSlug} className="w-24 h-24" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-xs font-extrabold text-pawzo-muted uppercase tracking-wider">
          Showing {products.length} Active Turnkey Categories
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((prod) => (
            <div key={prod.slug} className="soft-card rounded-2xl p-6 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-extrabold text-base text-pawzo-ink">
                    <Link href={`/private-label/${prod.form}/${prod.slug}`} className="hover:text-amber-800">
                      {prod.name}
                    </Link>
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-pawzo-creamDeep text-[10px] font-extrabold text-amber-900 shrink-0">
                    {prod.skuCount} SKUs
                  </span>
                </div>
                <p className="text-xs text-pawzo-muted leading-relaxed">{prod.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prod.keyIngredients.slice(0, 3).map((ing) => (
                    <span
                      key={ing}
                      className="px-2 py-0.5 rounded-full bg-pawzo-cream border border-pawzo-border text-[10px] font-bold text-pawzo-ink"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-pawzo-border/70">
                <Link
                  href={`/private-label/${prod.form}/${prod.slug}`}
                  className="text-xs font-extrabold text-amber-800 hover:text-pawzo-ink"
                >
                  Full Specs →
                </Link>
                <AddToQuoteButton
                  form={prod.form}
                  productSlug={prod.slug}
                  label={prod.name}
                  moqTier={prod.moq}
                  compact
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  )
}

