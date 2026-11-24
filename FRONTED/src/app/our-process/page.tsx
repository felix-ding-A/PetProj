import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { CTABanner, QualityTrio } from '@/components/sections/CommonSections'

export const metadata: Metadata = {
  title: '5-Step Custom Pet Supplement Process | NovaPet Nutra',
  description:
    'From NDA brief and 7-day bench samples to cGMP production, ISO-17025 COA lab testing, and global FBA/3PL delivery.',
  alternates: { canonical: '/our-process' },
}

const STEPS = [
  {
    step: '01',
    title: 'Formula Brief, Consultation & Mutual NDA',
    timeline: 'Days 1–2',
    details:
      'Share your existing formula, reference benchmark, or concept through our 6-step RFQ form. We sign a Mutual NDA and review species toxicology, active compatibility, and target COGS.',
  },
  {
    step: '02',
    title: 'Bench R&D & Palatability Sampling',
    timeline: 'Days 3–10',
    details:
      'Our chemists compound bench prototypes across your target flavor and dosage format (chewable tablet, capsule, powder, drop, or paste) and ship samples via DHL Express for acceptance testing.',
  },
  {
    step: '03',
    title: 'Packaging, Artwork & Compliance Review',
    timeline: 'Days 11–15',
    details:
      'Select PCR/PET jars, barrier pouches, calibrated droppers, or ABL tubes. We provide dielines and check guaranteed analysis formatting for US (AAFCO profiles), EU, or UK feed-label norms.',
  },
  {
    step: '04',
    title: 'cGMP Bulk Manufacturing & In-Process QC',
    timeline: 'Days 16–28',
    details:
      'Raw materials are quarantined and verified prior to batching. Production runs under strict cGMP with in-process weight, moisture (Aw), hardness, viscosity, and metal-detection checks.',
  },
  {
    step: '05',
    title: 'ISO-17025 Lab COA Release & Global Logistics',
    timeline: 'Days 29–32',
    details:
      'Every finished lot undergoes third-party ISO-17025 potency, heavy metals, and microbiology testing. Upon COA sign-off, we complete FBA/3PL prep and dispatch via air or ocean DDP.',
  },
]

export default function OurProcessPage() {
  return (
    <>
      <section className="hero-studio-bg text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            light
            items={[
              { name: 'Home', href: '/' },
              { name: 'Our 5-Step Process', href: '/our-process' },
            ]}
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our 5-Step <span className="text-brand-goldText">OEM / ODM Process</span>
          </h1>
          <p className="text-sm sm:text-base text-white/85 mt-3 max-w-2xl leading-relaxed">
            A transparent, milestone-driven manufacturing workflow built to take your pet supplement from concept
            to retail shelf with fixed checkpoints and lot-level COA release.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {STEPS.map((s) => (
          <div key={s.step} className="soft-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold text-brand-ink font-extrabold text-lg flex items-center justify-center">
                {s.step}
              </div>
              <div className="text-[11px] font-extrabold text-amber-800 mt-2 text-center">{s.timeline}</div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-brand-ink">{s.title}</h2>
              <p className="text-sm text-brand-muted leading-relaxed">{s.details}</p>
            </div>
          </div>
        ))}
      </section>

      <QualityTrio />
      <CTABanner />
    </>
  )
}

