import type { Metadata } from 'next'
import { ShieldCheck, Clock, FileCheck2, Mail, MessageCircle, MapPin, Building2 } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { COMPANY } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Request a Custom Pet Supplement Quote | NovaPet Nutra',
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
            Request Your Custom <span className="text-brand-goldText">OEM / Private Label Quote</span>
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
              <h2 className="font-extrabold text-base text-brand-ink">What Happens Next?</h2>
              <div className="space-y-3.5 text-xs text-brand-muted">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink block">24-Hour Formulation Review</strong>
                    A real R&amp;D specialist reviews your actives, palatability goals, and MOQ tier.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink block">Mutual NDA Protection</strong>
                    Every custom formulation brief is kept strictly confidential under Mutual NDA.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileCheck2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink block">Bench Samples in 7–10 Days</strong>
                    Verify aroma, texture, and pet acceptance before committing to bulk production.
                  </div>
                </div>
              </div>
            </div>

            <div className="soft-card rounded-3xl p-6 space-y-3">
              <h2 className="font-extrabold text-base text-brand-ink">Direct B2B Contact Desk</h2>
              <p className="text-xs text-brand-muted leading-relaxed">
                Prefer to message our formulation &amp; export team directly?
              </p>
              <div className="space-y-2.5 pt-1 text-xs font-extrabold">
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border hover:border-brand-gold text-brand-ink transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>{COMPANY.email}</span>
                </a>
                <a
                  href={`https://wa.me/${COMPANY.whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/40 hover:bg-[#25D366]/20 text-brand-ink transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>WhatsApp: {COMPANY.whatsappDisplay} →</span>
                </a>
              </div>

              <div className="pt-3 mt-3 border-t border-brand-border space-y-2 text-[11px] text-brand-muted leading-relaxed">
                <div className="flex items-start gap-2">
                  <Building2 className="w-3.5 h-3.5 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink block">{COMPANY.legalName}</strong>
                    <span>D-U-N-S® Number: <strong>{COMPANY.duns}</strong></span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-800 shrink-0 mt-0.5" />
                  <span>{COMPANY.address.full}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

