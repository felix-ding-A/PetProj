import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, FileDown } from 'lucide-react'
import {
  ALLOWED_DOSAGE_MANUFACTURING_SLUGS,
  getDosageFormBySlug,
  getDosageForms,
  getProductsByForm,
} from '@/lib/data'
import { DosageCartoonSvg } from '@/components/illustrations/Mascots'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd, SITE_URL, buildFaqJsonLd } from '@/components/seo/JsonLd'
import {
  AddToQuoteButton,
  CTABanner,
  FAQAccordion,
  QualityTrio,
} from '@/components/sections/CommonSections'

export const revalidate = 60
export const dynamicParams = false

export async function generateStaticParams() {
  return ALLOWED_DOSAGE_MANUFACTURING_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const form = await getDosageFormBySlug(slug)
  if (!form) return {}
  return {
    title: form.metaTitle,
    description: form.metaDescription,
    alternates: { canonical: `/${form.slug}` },
  }
}

export default async function DosageFormManufacturingPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!ALLOWED_DOSAGE_MANUFACTURING_SLUGS.includes(slug)) {
    notFound()
  }

  const [form, allForms] = await Promise.all([getDosageFormBySlug(slug), getDosageForms()])
  if (!form) notFound()

  const products = await getProductsByForm(form.shortSlug)
  const siblingForms = allForms.filter((f) => f.slug !== form.slug)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${form.name} Contract Manufacturing`,
    serviceType: 'Pet Supplement OEM/ODM Manufacturing',
    description: form.heroDescription,
    provider: {
      '@type': 'Organization',
      name: 'NovaPet Nutra',
      url: SITE_URL,
    },
    areaServed: ['US', 'EU', 'UK', 'Global'],
  }

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={buildFaqJsonLd(form.faqs)} />

      {/* 1. Hero */}
      <section className="hero-studio-bg text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: `${form.name} Manufacturing`, href: `/${form.slug}` },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 border border-white/15 text-[11px] font-bold uppercase tracking-wider">
                <span className="text-brand-goldText">▸</span> cGMP PET OEM / ODM · {form.skuSummary}
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                {/^pet\b/i.test(form.name) ? form.name : `Pet ${form.name}`}{' '}
                <span className="text-brand-goldText">Manufacturer</span>
              </h1>
              <p className="text-base text-white/90 font-semibold max-w-2xl">{form.tagline}</p>
              <p className="text-sm text-white/80 max-w-2xl leading-relaxed">{form.heroDescription}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/contact-us?form=${form.shortSlug}`}
                  className="pill-gold-btn px-7 py-3.5 rounded-full text-sm font-extrabold inline-flex items-center gap-2"
                >
                  <span>Get a Quote</span>
                  <span>→</span>
                </Link>
                <Link
                  href={`/private-label/${form.shortSlug}`}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-bold transition-colors"
                >
                  View {products.length} Private Label Categories
                </Link>
                {form.brochurePdfUrl && (
                  <a
                    href={form.brochurePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-full bg-black/25 hover:bg-black/35 border border-white/20 text-brand-goldText text-xs font-extrabold inline-flex items-center gap-1.5"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Spec Sheet PDF</span>
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border-4 border-white/25 shadow-2xl flex items-center justify-center p-6"
                style={{ backgroundColor: form.pastelBg }}
              >
                <DosageCartoonSvg form={form.shortSlug} className="w-48 h-48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us (Technical Selling Points) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-9">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
            TECHNICAL ADVANTAGES
          </span>
          <h2 className="text-3xl font-extrabold text-brand-ink mt-1">
            Why brands manufacture {form.name.toLowerCase()} with NovaPet Nutra
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {form.whyChoosePoints.map((pt) => (
            <div key={pt.title} className="soft-card rounded-3xl p-7 space-y-3">
              <CheckCircle2 className="w-6 h-6 text-amber-800" />
              <h3 className="text-lg font-extrabold text-brand-ink">{pt.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{pt.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Customization Capabilities */}
      <section className="py-16 bg-brand-creamDeep border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mb-8">
            Customization &amp; Packaging Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {form.customizationOptions.map((opt) => (
              <div key={opt.label} className="bg-white rounded-2xl border border-brand-border p-6">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                  {opt.label}
                </div>
                <p className="text-sm font-semibold text-brand-ink mt-2 leading-relaxed">{opt.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 5-Step Process */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mb-8">
          5-Step {form.name} Production Workflow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {form.processSteps.map((s) => (
            <div key={s.step} className="soft-card rounded-2xl p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-brand-gold text-brand-ink font-extrabold text-xs flex items-center justify-center">
                {s.step}
              </div>
              <h3 className="font-extrabold text-sm text-brand-ink">{s.title}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Specification Table */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-border overflow-hidden">
          <div className="px-6 py-4 bg-brand-ink text-white font-extrabold text-sm">
            Manufacturing Specification Summary — {form.name}
          </div>
          <div className="divide-y divide-brand-border text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-4 p-5 gap-2">
              <div className="font-extrabold text-brand-muted">Materials &amp; Carriers</div>
              <div className="sm:col-span-3 font-semibold text-brand-ink">{form.specs.materials}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 p-5 gap-2">
              <div className="font-extrabold text-brand-muted">Formats &amp; Packaging</div>
              <div className="sm:col-span-3 font-semibold text-brand-ink">{form.specs.formats}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 p-5 gap-2">
              <div className="font-extrabold text-brand-muted">MOQ Tiers</div>
              <div className="sm:col-span-3 font-semibold text-brand-ink">{form.specs.moq}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 p-5 gap-2">
              <div className="font-extrabold text-brand-muted">Lead Time &amp; Shelf Life</div>
              <div className="sm:col-span-3 font-semibold text-brand-ink">
                {form.leadTime} · Shelf life: {form.specs.shelfLife}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quality Standards Trio */}
      <QualityTrio />

      {/* 7. Mature Private Label Formulas List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
              TURNKEY FORMULA LIBRARY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mt-1">
              Ready-to-Brand {form.name} Categories ({products.length})
            </h2>
          </div>
          <Link
            href={`/private-label/${form.shortSlug}`}
            className="text-xs font-extrabold text-amber-800 hover:text-brand-ink inline-flex items-center gap-1"
          >
            <span>Open full {form.shortSlug} catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((prod) => (
            <div
              key={prod.slug}
              className="soft-card rounded-2xl p-5 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/private-label/${prod.form}/${prod.slug}`}
                    className="font-extrabold text-sm text-brand-ink hover:text-amber-800"
                  >
                    {prod.name}
                  </Link>
                  <span className="px-2 py-0.5 rounded-full bg-brand-creamDeep text-[10px] font-extrabold text-amber-900 shrink-0">
                    {prod.skuCount} SKUs
                  </span>
                </div>
                <p className="text-xs text-brand-muted mt-1.5 line-clamp-2">{prod.shortDescription}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-brand-border/60">
                <Link
                  href={`/private-label/${prod.form}/${prod.slug}`}
                  className="text-xs font-extrabold text-amber-800 hover:text-brand-ink"
                >
                  Specs →
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

      {/* 8. Form-Specific FAQs */}
      <FAQAccordion faqs={form.faqs} title={`${form.name} — Technical FAQ`} />

      {/* 9. Sibling Dosage Form Cross-Links */}
      <section className="py-12 bg-brand-creamDeep border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold text-brand-ink mb-5">
            Explore Our Other Pet Supplement Dosage Forms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siblingForms.map((sf) => (
              <Link
                key={sf.slug}
                href={`/${sf.slug}`}
                className="bg-white rounded-2xl border border-brand-border p-4 flex items-center gap-3 hover:border-brand-gold transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: sf.pastelBg }}
                >
                  <DosageCartoonSvg form={sf.shortSlug} className="w-9 h-9" />
                </div>
                <div>
                  <div className="font-extrabold text-xs text-brand-ink">{sf.name}</div>
                  <div className="text-[11px] text-brand-muted">{sf.skuSummary}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Bottom CTA */}
      <CTABanner headline={`Launch your custom ${form.name.toLowerCase()} line`} />
    </>
  )
}

