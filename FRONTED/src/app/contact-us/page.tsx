import type { Metadata } from 'next'
import { ShieldCheck, Clock, FileCheck2 } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { InquiryForm } from '@/components/forms/InquiryForm'

export const metadata: Metadata = {
  title: 'Request a Custom Pet Supplement Quote | Pawsome Labs',
  description:
    'Submit your pet supplement OEM/ODM brief or private label shortlist. 24-hour formulation desk response, Mutual NDA, and bench sample kits.',
  alternates: { canonical: '/contact-us' },
}

export default async function ContactUsPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>
}) {
  const { form } = await searchParams

  return (
    <>
      <section className="hero-studio-bg text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Request a Quote', href: '/contact-us' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Request Your Custom <span className="text-pawzo-goldText">OEM / Private Label Quote</span>
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl leading-relaxed">
            Tell our formulation chemists about your target species, dosage format, and active goals. We respond
            within 24 business hours with transparent MOQ pricing and sample timelines.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <InquiryForm preselectedForm={form} />
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <div className="soft-card rounded-3xl p-6 space-y-4">
              <h2 className="font-extrabold text-base text-pawzo-ink">What Happens Next?</h2>
              <div className="space-y-3.5 text-xs text-pawzo-muted">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pawzo-ink block">24-Hour Formulation Review</strong>
                    A real R&amp;D specialist reviews your actives, palatability goals, and MOQ tier.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pawzo-ink block">Mutual NDA Protection</strong>
                    Attached formula specs are transmitted directly via encrypted email—never stored publicly.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-pawzo-ink block">Bench Samples in 7–10 Days</strong>
                    Verify aroma, texture, and pet acceptance before committing to bulk production.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

