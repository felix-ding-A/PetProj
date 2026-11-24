'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ShieldCheck,
  PackageCheck,
  FlaskConical,
  Globe2,
  FileText,
  Download,
  ChevronDown,
  Plus,
  Check,
} from 'lucide-react'
import type { CompanyDocumentData, FAQItem } from '@/lib/data/types'
import { useQuoteBox } from '@/lib/quote-context'

export function TrustStrip() {
  const items = [
    {
      icon: PackageCheck,
      title: 'Global DDP & FBA Prep',
      desc: 'Direct palletized shipping to US, EU & UK warehouses',
    },
    {
      icon: ShieldCheck,
      title: 'FDA-Registered & cGMP',
      desc: 'ISO-17025 third-party lab COA with every lot',
    },
    {
      icon: FlaskConical,
      title: '500-Unit Low Pilot MOQ',
      desc: 'Validate private label SKUs without heavy inventory',
    },
    {
      icon: Globe2,
      title: 'Dedicated R&D Chemists',
      desc: 'Vet-backed formulation & palatability experts',
    },
  ]

  return (
    <section className="bg-brand-creamDeep border-b border-brand-border py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/85 border border-brand-border flex items-center justify-center text-amber-800 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-brand-ink">{item.title}</div>
                  <div className="text-[11px] text-brand-muted">{item.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function QualityTrio() {
  const pillars = [
    {
      badge: '01 · R&D INTELLIGENCE',
      title: 'Vet-Backed & Data-Driven Formulation',
      body: 'Every formula is screened for canine, feline, and small-pet toxicology, active synergy, and natural palatability before entering pilot trials.',
    },
    {
      badge: '02 · PHARMA-GRADE PRODUCTION',
      title: 'FDA-Registered cGMP & ISO 22000 Facility',
      body: 'Climate-controlled blending, below-38°C cold extrusion, inline metal detection, and vacuum emulsification maintain strict batch consistency.',
    },
    {
      badge: '03 · GLOBAL TRACEABILITY',
      title: 'Full Lot Genealogy & ISO-17025 COAs',
      body: 'Every raw ingredient is quarantined and verified prior to release. Finished lots ship with complete potency, heavy-metal, and microbiology COAs.',
    },
  ]

  return (
    <section className="py-16 bg-brand-creamDeep border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
            QUALITY &amp; MANUFACTURING STANDARDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mt-1">
            Built for batch consistency and regulatory compliance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="soft-card rounded-3xl p-7 space-y-3">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                {p.badge}
              </div>
              <h3 className="text-lg font-extrabold text-brand-ink">{p.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-5 text-xs font-extrabold">
          <Link href="/our-facility" className="text-amber-800 hover:text-brand-ink transition-colors">
            Tour our cGMP pet supplement factory →
          </Link>
          <Link href="/quality-compliance" className="text-brand-ink hover:text-amber-800 transition-colors">
            Review quality &amp; ISO-17025 COA standards →
          </Link>
        </div>
      </div>
    </section>
  )
}

export function PdfDownloads({ documents }: { documents: CompanyDocumentData[] }) {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
            TECHNICAL RESOURCES &amp; CATALOGS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mt-1">
            Download Company Profiles, Catalogs &amp; Sample COAs
          </h2>
        </div>
        <p className="text-xs text-brand-muted max-w-sm">
          Public technical PDFs are managed directly in our Sanity CMS and updated with every facility audit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="soft-card rounded-2xl p-5 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-brand-creamDeep border border-brand-border flex items-center justify-center text-amber-800 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-brand-ink">{doc.title}</h3>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">{doc.summary}</p>
                <div className="text-[11px] font-semibold text-amber-800 mt-2">
                  {doc.fileSizeLabel} · Updated {doc.updatedAt}
                </div>
              </div>
            </div>
            {doc.pdfUrl ? (
              <a
                href={doc.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3.5 py-2 rounded-full bg-brand-gold hover:bg-brand-goldHover text-brand-ink text-xs font-extrabold inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </a>
            ) : (
              <Link
                href="/contact-us"
                className="shrink-0 px-3.5 py-2 rounded-full bg-brand-creamDeep hover:bg-brand-gold text-brand-ink text-xs font-extrabold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Request</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export function FAQAccordion({
  faqs,
  title = 'Frequently Asked B2B Manufacturing Questions',
}: {
  faqs: FAQItem[]
  title?: string
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
          PROCUREMENT &amp; R&amp;D FAQ
        </span>
        <h2 className="text-3xl font-extrabold text-brand-ink tracking-tight mt-1">{title}</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i
          return (
            <div
              key={faq.question}
              className="bg-white rounded-2xl border border-brand-border overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-extrabold text-sm text-brand-ink">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-brand-muted shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-sm text-brand-muted leading-relaxed border-t border-brand-border/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function CTABanner({
  headline = 'Ready to formulate your next pet bestseller?',
  subtitle = 'Share your target species, dosage form, and active goals. Our formulation chemists reply with transparent MOQ pricing and bench sample options within 24 hours.',
}: {
  headline?: string
  subtitle?: string
}) {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="hero-studio-bg rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="max-w-2xl space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-black/25 text-brand-goldText font-extrabold text-[11px] uppercase tracking-wider">
            24-HOUR FORMULATION DESK · MUTUAL NDA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">{headline}</h2>
          <p className="text-sm text-white/85 leading-relaxed">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/contact-us"
            className="pill-gold-btn px-7 py-3.5 rounded-full text-sm font-extrabold inline-flex items-center gap-2"
          >
            <span>Start Custom Quote</span>
            <span>→</span>
          </Link>
          <Link
            href="/private-label"
            className="px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-sm font-bold transition-colors"
          >
            Browse Private Label Catalog
          </Link>
        </div>
      </div>
    </section>
  )
}

export function AddToQuoteButton({
  form,
  productSlug,
  label,
  moqTier = '500-Unit Pilot MOQ',
  compact = false,
}: {
  form: string
  productSlug: string
  label: string
  moqTier?: string
  compact?: boolean
}) {
  const { items, addItem } = useQuoteBox()
  const exists = items.some((i) => i.id === `${form}:${productSlug}`)

  return (
    <button
      type="button"
      onClick={() => addItem({ form, productSlug, label, moqTier })}
      className={
        compact
          ? `px-3.5 py-2 rounded-full text-xs font-extrabold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              exists
                ? 'bg-brand-ink text-brand-goldText'
                : 'bg-brand-gold hover:bg-brand-goldHover text-brand-ink'
            }`
          : `px-6 py-3 rounded-full text-xs font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer ${
              exists ? 'bg-brand-ink text-brand-goldText' : 'pill-gold-btn'
            }`
      }
    >
      {exists ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
      <span>{exists ? 'In Quote Box' : 'Add to Quote Box'}</span>
    </button>
  )
}

