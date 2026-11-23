import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import {
  getActiveProducts,
  getDosageFormByShortSlug,
  getProductByFormAndSlug,
  getProductsByForm,
} from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { DosageCartoonSvg } from '@/components/illustrations/Mascots'
import { AddToQuoteButton, CTABanner } from '@/components/sections/CommonSections'

export const revalidate = 60
export const dynamicParams = false

export async function generateStaticParams() {
  const products = await getActiveProducts()
  return products.map((p) => ({ form: p.form, product: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ form: string; product: string }>
}): Promise<Metadata> {
  const { form, product } = await params
  const prod = await getProductByFormAndSlug(form, product)
  if (!prod) return {}
  return {
    title: prod.metaTitle,
    description: prod.metaDescription,
    alternates: { canonical: `/private-label/${prod.form}/${prod.slug}` },
  }
}

export default async function ProductLandingPage({
  params,
}: {
  params: Promise<{ form: string; product: string }>
}) {
  const { form, product } = await params
  const prod = await getProductByFormAndSlug(form, product)
  if (!prod || prod.status !== 'active') notFound()

  const [df, siblings] = await Promise.all([
    getDosageFormByShortSlug(prod.form),
    getProductsByForm(prod.form),
  ])

  const related = siblings.filter((s) => s.slug !== prod.slug).slice(0, 6)

  // B2B Product JSON-LD (explicitly omits retail Offer/price)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Private Label ${prod.name}`,
    description: prod.shortDescription,
    category: df?.name || prod.form,
    manufacturer: {
      '@type': 'Organization',
      name: 'NovaPet Nutra',
    },
  }

  return (
    <>
      <JsonLd data={productJsonLd} />

      <section className="hero-studio-bg text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Private Label', href: '/private-label' },
              { name: df?.name || prod.form, href: `/private-label/${prod.form}` },
              { name: prod.name, href: `/private-label/${prod.form}/${prod.slug}` },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 border border-white/15 text-[11px] font-bold uppercase tracking-wider">
                <span className="text-pawzo-goldText">▸</span> TURNKEY PRIVATE LABEL · {prod.skuCount}+ BASE FORMULAS
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">{prod.name}</h1>
              <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
                {prod.shortDescription}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <AddToQuoteButton
                  form={prod.form}
                  productSlug={prod.slug}
                  label={prod.name}
                  moqTier={prod.moq}
                />
                <Link
                  href={`/contact-us?form=${prod.form}`}
                  className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-extrabold transition-colors"
                >
                  Request Spec Sheet &amp; Quote →
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div
                className="w-52 h-52 rounded-3xl border-4 border-white/25 flex items-center justify-center"
                style={{ backgroundColor: df?.pastelBg || '#F5ECD5' }}
              >
                <DosageCartoonSvg form={prod.form} className="w-36 h-36" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="soft-card rounded-3xl p-7 space-y-4">
            <h2 className="text-xl font-extrabold text-pawzo-ink">Key Active Ingredients &amp; Custom Options</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {prod.keyIngredients.map((ing) => (
                <li key={ing} className="flex items-center gap-2 text-sm font-semibold text-pawzo-ink">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-pawzo-muted pt-2">
              All active dosages, flavor systems, and carrier bases can be customized under Mutual NDA.
            </p>
          </div>

          <div className="soft-card rounded-3xl p-7 space-y-4">
            <h2 className="text-xl font-extrabold text-pawzo-ink">Packaging &amp; Format Options</h2>
            <ul className="space-y-2.5 text-sm text-pawzo-ink font-medium">
              {prod.packagingOptions.map((pkg) => (
                <li key={pkg} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pawzo-gold" />
                  <span>{pkg}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-pawzo-border p-7 space-y-4">
            <h2 className="text-lg font-extrabold text-pawzo-ink">Production Specification</h2>
            <dl className="divide-y divide-pawzo-border text-sm">
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-pawzo-muted font-bold">Dosage Form</dt>
                <dd className="font-extrabold text-pawzo-ink">
                  {df ? (
                    <Link href={`/${df.slug}`} className="text-amber-800 hover:underline">
                      {df.name}
                    </Link>
                  ) : (
                    prod.form
                  )}
                </dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-pawzo-muted font-bold">Target Species</dt>
                <dd className="font-extrabold text-pawzo-ink capitalize">{prod.species.join(', ')}</dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-pawzo-muted font-bold">MOQ Tiers</dt>
                <dd className="font-extrabold text-pawzo-ink text-right">{prod.moq}</dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-pawzo-muted font-bold">Lead Time</dt>
                <dd className="font-extrabold text-pawzo-ink">{prod.leadTime}</dd>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-pawzo-muted font-bold">Quality Release</dt>
                <dd className="font-extrabold text-pawzo-ink">ISO-17025 COA Included</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      {/* Related Products in Same Dosage Form */}
      {related.length > 0 && (
        <section className="py-12 bg-pawzo-creamDeep border-y border-pawzo-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-extrabold text-pawzo-ink mb-6">
              More Private Label {df?.name || prod.form} Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/private-label/${r.form}/${r.slug}`}
                  className="bg-white rounded-2xl border border-pawzo-border p-4 hover:border-pawzo-gold transition-colors"
                >
                  <div className="font-extrabold text-sm text-pawzo-ink">{r.name}</div>
                  <div className="text-xs text-pawzo-muted mt-1 line-clamp-1">{r.shortDescription}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner headline={`Request private label specs for ${prod.name}`} />
    </>
  )
}

