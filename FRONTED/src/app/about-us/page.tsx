import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { BiscuitMascotSvg } from '@/components/illustrations/Mascots'
import { CTABanner, QualityTrio } from '@/components/sections/CommonSections'

export const metadata: Metadata = {
  title: 'About NovaPet Nutra | Pet Supplement OEM/ODM Partner',
  description:
    'Meet the chemists, veterinary nutrition advisors, and manufacturing specialists behind NovaPet Nutra—dedicated exclusively to pet supplement brands.',
  alternates: { canonical: '/about-us' },
}

export default function AboutUsPage() {
  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'About Us', href: '/about-us' },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Dedicated exclusively to <span className="text-brand-goldText">pet nutrition brands</span>
              </h1>
              <p className="text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
                Unlike human-supplement factories that treat pet lines as an afterthought, NovaPet Nutra builds
                every extrusion die, palatability system, and safety audit specifically for dogs, cats, and small
                companion animals.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <BiscuitMascotSvg className="w-52 h-auto" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-sm text-brand-muted leading-relaxed">
        <h2 className="text-2xl font-extrabold text-brand-ink">Why Pet Brands Partner With Us</h2>
        <p>
          Launching a high-repeat pet supplement requires balancing two priorities: verified active
          potency and reliable daily palatability. Even a strong clinical joint or probiotic formula
          fails if pets refuse to eat it.
        </p>
        <p>
          Our R&amp;D lab pairs veterinary formulation chemists with structured acceptance testing
          alongside 500-unit pilot MOQs, helping emerging pet brands and established distributors
          scale with controlled inventory risk.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <Link href="/about-us/certifications" className="pill-gold-btn px-6 py-3 rounded-full text-xs font-extrabold">
            View Our Certifications →
          </Link>
          <Link
            href="/our-facility"
            className="px-6 py-3 rounded-full bg-white border border-brand-border text-xs font-extrabold text-brand-ink hover:border-brand-gold"
          >
            Tour Our Facility &amp; Capacity
          </Link>
        </div>
      </section>

      <QualityTrio />
      <CTABanner />
    </>
  )
}

