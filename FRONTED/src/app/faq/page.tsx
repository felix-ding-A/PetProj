import type { Metadata } from 'next'
import { getGlobalFaqs } from '@/lib/data'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd, buildFaqJsonLd } from '@/components/seo/JsonLd'
import { CTABanner, FAQAccordion } from '@/components/sections/CommonSections'

export const metadata: Metadata = {
  title: 'Pet Supplement OEM/ODM Procurement FAQ | NovaPet Nutra',
  description:
    'Answers on MOQ, lead times, NDA protection, palatability samples, ISO-17025 COA lab testing, and Amazon FBA prep for pet supplement brands.',
  alternates: { canonical: '/faq' },
}

export default async function FaqPage() {
  const faqs = await getGlobalFaqs()

  return (
    <>
      <JsonLd data={buildFaqJsonLd(faqs)} />
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Procurement FAQ', href: '/faq' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            B2B Procurement <span className="text-pawzo-goldText">FAQ</span>
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl">
            Everything brand founders and procurement managers ask before starting a private label or custom OEM
            pet supplement run.
          </p>
        </div>
      </section>

      <FAQAccordion faqs={faqs} title="Common Questions on MOQ, Sampling & Quality" />
      <CTABanner />
    </>
  )
}

