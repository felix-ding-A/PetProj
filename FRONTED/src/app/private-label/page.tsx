import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getActiveProducts, getDosageForms } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { DosageCartoonSvg } from '@/components/illustrations/Mascots'
import { AddToQuoteButton, CTABanner } from '@/components/sections/CommonSections'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Private Label Pet Supplements Catalog (65 Categories) | Pawsome Labs',
  description:
    'Browse 65 turnkey private label pet supplement categories across chewable tablets, capsules, powders, liquid drops, and pastes. 500-unit pilot MOQ.',
  alternates: { canonical: '/private-label' },
}

export default async function PrivateLabelOverviewPage() {
  const [forms, activeProducts] = await Promise.all([getDosageForms(), getActiveProducts()])

  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Private Label Catalog', href: '/private-label' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Private Label <span className="text-pawzo-goldText">Pet Supplement Catalog</span>
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl leading-relaxed">
            Explore {activeProducts.length} active turnkey product categories across our 5 dosage forms. Add any
            category to your Quote Box to request spec sheets and pilot MOQ pricing.
          </p>
        </div>
      </section>

      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* 5 Dosage Form Filter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {forms.map((f) => {
            const count = activeProducts.filter((p) => p.form === f.shortSlug).length
            return (
              <Link
                key={f.shortSlug}
                href={`/private-label/${f.shortSlug}`}
                className="soft-card rounded-2xl p-4 flex flex-col items-center text-center gap-2"
              >
                <div
                  className="w-full h-24 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: f.pastelBg }}
                >
                  <DosageCartoonSvg form={f.shortSlug} className="w-16 h-16" />
                </div>
                <div className="font-extrabold text-sm text-pawzo-ink">{f.name}</div>
                <div className="text-[11px] font-bold text-amber-800">{count} Categories →</div>
              </Link>
            )
          })}
        </div>

        {/* Grouped Catalog Preview */}
        {forms.map((f) => {
          const list = activeProducts.filter((p) => p.form === f.shortSlug)
          return (
            <div key={f.shortSlug} className="space-y-5">
              <div className="flex items-end justify-between border-b border-pawzo-border pb-3">
                <div>
                  <h2 className="text-2xl font-extrabold text-pawzo-ink">{f.name}</h2>
                  <p className="text-xs text-pawzo-muted mt-0.5">{f.moq} · {f.leadTime}</p>
                </div>
                <Link
                  href={`/private-label/${f.shortSlug}`}
                  className="text-xs font-extrabold text-amber-800 hover:text-pawzo-ink inline-flex items-center gap-1"
                >
                  <span>All {list.length} categories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.slice(0, 6).map((prod) => (
                  <div key={prod.slug} className="soft-card rounded-2xl p-5 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={`/private-label/${prod.form}/${prod.slug}`}
                          className="font-extrabold text-sm text-pawzo-ink hover:text-amber-800"
                        >
                          {prod.name}
                        </Link>
                        <span className="px-2 py-0.5 rounded-full bg-pawzo-creamDeep text-[10px] font-extrabold text-amber-900 shrink-0">
                          {prod.skuCount} SKUs
                        </span>
                      </div>
                      <p className="text-xs text-pawzo-muted mt-1.5 line-clamp-2">{prod.shortDescription}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-pawzo-border/60">
                      <Link
                        href={`/private-label/${prod.form}/${prod.slug}`}
                        className="text-xs font-extrabold text-amber-800 hover:text-pawzo-ink"
                      >
                        View Details →
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
            </div>
          )
        })}
      </section>

      <CTABanner />
    </>
  )
}

