import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import {
  getActiveProducts,
  getCompanyDocuments,
  getDosageForms,
  getGlobalFaqs,
  getInsights,
  getPets,
} from '@/lib/data'
import {
  BiscuitMascotSvg,
  BoneAccentSvg,
  DosageCartoonSvg,
  SpeciesCartoonSvg,
} from '@/components/illustrations/Mascots'
import {
  AddToQuoteButton,
  CTABanner,
  FAQAccordion,
  PdfDownloads,
  QualityTrio,
  TrustStrip,
} from '@/components/sections/CommonSections'
import { JsonLd, buildFaqJsonLd } from '@/components/seo/JsonLd'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Pet Supplement Manufacturer | Private Label & Contract OEM',
  description:
    'FDA-registered, cGMP pet supplement contract manufacturer for private label & white label dog and cat chews, capsules, powders, drops, and pastes. 500 MOQ.',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [dosageForms, activeProducts, pets, documents, faqs, insights] = await Promise.all([
    getDosageForms(),
    getActiveProducts(),
    getPets(),
    getCompanyDocuments(),
    getGlobalFaqs(),
    getInsights(),
  ])

  const featuredPrimary = activeProducts.find((p) => p.slug === 'joint-support') ?? activeProducts[0]
  const featuredSecondary = [
    activeProducts.find((p) => p.slug === 'probiotic') ?? activeProducts[1],
    activeProducts.find((p) => p.slug === 'skin-allergy-drops') ?? activeProducts[2],
    activeProducts.find((p) => p.slug === 'pet-digestive-paste') ?? activeProducts[3],
  ].filter(Boolean)

  return (
    <>
      <JsonLd data={buildFaqJsonLd(faqs)} />

      {/* 1. Hero Section */}
      <section className="hero-studio-bg relative text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 border border-white/15 text-[11px] font-bold tracking-wider uppercase text-white/95">
                <span className="text-brand-goldText">▸</span> FDA-REGISTERED FACILITY · cGMP · 21-DAY TURNKEY
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-extrabold tracking-tight leading-[1.08] text-white">
                Pet Supplement
                <br />
                <span className="text-brand-goldText">Contract Manufacturer</span>
                <br />
                for Private Label Brands
                <span className="inline-block align-middle ml-2 -rotate-12">
                  <BoneAccentSvg />
                </span>
              </h1>

              <p className="text-sm sm:text-base text-white/85 max-w-lg leading-relaxed">
                Your dedicated <strong>pet supplement manufacturer</strong> for private label, white label, and
                custom OEM/ODM{' '}
                <strong>chewable tablets, capsules, powders, liquid drops, and pastes</strong>. Launch from{' '}
                <strong>65 turnkey dog &amp; cat categories</strong> starting at a{' '}
                <strong>500-unit pilot MOQ</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  href="/contact-us"
                  className="pill-gold-btn px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold inline-flex items-center gap-2"
                >
                  <span>Start Custom Project</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/private-label"
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs sm:text-sm font-bold transition-colors"
                >
                  Explore 65 Private Label Categories
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4 max-w-md border-t border-white/15">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">500+</div>
                  <div className="text-[11px] text-white/75 mt-0.5">Low pilot unit MOQ</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">5 Forms</div>
                  <div className="text-[11px] text-white/75 mt-0.5">Chews to pastes in-house</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">21 Days</div>
                  <div className="text-[11px] text-white/75 mt-0.5">Turnkey launch lead time</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-white/75 pt-1">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  🐾
                </span>
                <span>Palatability-tested across canine and feline panels prior to bulk scale-up.</span>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[430px]">
                <BiscuitMascotSvg />
                <div className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md text-brand-ink px-4 py-3 rounded-2xl shadow-xl border border-brand-border absolute bottom-6 -left-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-creamDeep flex items-center justify-center text-amber-800">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                      R&amp;D Bench Samples
                    </div>
                    <div className="text-xs font-extrabold">Ships worldwide in 7–10 days</div>
                  </div>
                  <Link
                    href="/contact-us"
                    className="ml-1 px-3 py-1.5 rounded-full bg-brand-gold hover:bg-brand-goldHover font-extrabold text-[11px]"
                  >
                    Request
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Warm Cream Service & Quality Bar */}
      <TrustStrip />

      {/* 3. Five Dosage Forms + Custom R&D (Playful Pastel Cartoon Cards) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
              IN-HOUSE MANUFACTURING CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mt-1">
              5 In-House Pet Supplement Manufacturing Lines
            </h2>
            <p className="text-sm text-brand-muted mt-1.5">
              Choose a dosage format to review technical specifications, MOQs, 5-step workflow, and turnkey formulas.
            </p>
          </div>
          <Link
            href="/custom-formulation"
            className="text-xs font-extrabold text-amber-800 hover:text-brand-ink inline-flex items-center gap-1"
          >
            <span>Explore full Custom R&amp;D Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {dosageForms.map((df) => (
            <Link
              key={df.slug}
              href={`/${df.slug}`}
              className="soft-card rounded-2xl p-3 text-left flex flex-col justify-between group"
            >
              <div
                className="h-32 rounded-xl relative overflow-hidden flex items-center justify-center p-2"
                style={{ backgroundColor: df.pastelBg }}
              >
                <DosageCartoonSvg
                  form={df.shortSlug}
                  className="w-24 h-24 group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="pt-3 px-1">
                <div className="font-extrabold text-sm text-brand-ink leading-snug">{df.name}</div>
                <div className="text-[11px] text-brand-muted mt-0.5">{df.skuSummary}</div>
              </div>
            </Link>
          ))}

          <Link
            href="/custom-formulation"
            className="soft-card rounded-2xl p-3 text-left flex flex-col justify-between group"
          >
            <div className="h-32 rounded-xl bg-pastel-sage relative overflow-hidden flex items-center justify-center p-2">
              <DosageCartoonSvg
                form="custom"
                className="w-24 h-24 group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="pt-3 px-1">
              <div className="font-extrabold text-sm text-brand-ink leading-snug">Custom OEM/ODM</div>
              <div className="text-[11px] text-brand-muted mt-0.5">240 species × effect specs</div>
            </div>
          </Link>
        </div>

        {/* Target Species Cartoon Strip */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {pets.map((pet) => (
            <Link
              key={pet.slug}
              href={`/custom-formulation/by-pet/${pet.slug}`}
              className="soft-card rounded-2xl p-4 flex items-center gap-4 group"
            >
              <div
                className="w-20 h-20 rounded-xl flex items-end justify-center overflow-hidden shrink-0"
                style={{ backgroundColor: pet.pastelBg }}
              >
                <SpeciesCartoonSvg
                  species={pet.slug}
                  className="w-16 h-16 group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800">
                  SPECIES-SPECIFIC R&amp;D
                </div>
                <div className="font-extrabold text-base text-brand-ink">{pet.name} Formulas</div>
                <p className="text-xs text-brand-muted mt-0.5 line-clamp-2">{pet.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Asymmetric Turnkey Private Label Showcase (B2B Adapted from cankao.html) */}
      <section className="bg-brand-creamDeep py-16 sm:py-20 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                TURNKEY PRIVATE LABEL CATALOG
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mt-1">
                Turnkey Private Label &amp; White Label Pet Supplements
              </h2>
              <p className="text-sm text-brand-muted mt-1">
                Ready-to-brand dog and cat supplement formulas. Shortlist categories into your Quote Box for spec sheets and pilot MOQ tiers.
              </p>
            </div>
            <Link
              href="/private-label"
              className="px-5 py-2.5 rounded-full bg-white border border-brand-border text-xs font-extrabold text-brand-ink hover:border-brand-gold transition-colors self-start md:self-auto"
            >
              View All 65 Categories →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Featured Turnkey Card (7 Cols) */}
            {featuredPrimary && (
              <div className="lg:col-span-7 soft-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-7 relative">
                <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-brand-gold text-brand-ink font-extrabold text-[11px]">
                  {featuredPrimary.skuCount}+ BASE FORMULAS
                </span>

                <div className="w-full sm:w-5/12 aspect-square rounded-2xl bg-brand-cream border border-brand-border flex items-center justify-center p-5">
                  <DosageCartoonSvg form={featuredPrimary.form} className="w-36 h-36" />
                </div>

                <div className="w-full sm:w-7/12 space-y-3.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                    FLAGSHIP PRIVATE LABEL · {featuredPrimary.form.toUpperCase()}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-ink leading-snug">
                    <Link
                      href={`/private-label/${featuredPrimary.form}/${featuredPrimary.slug}`}
                      className="hover:text-amber-800 transition-colors"
                    >
                      {featuredPrimary.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {featuredPrimary.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredPrimary.keyIngredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-2.5 py-1 rounded-full bg-brand-cream border border-brand-border text-[11px] font-bold text-brand-ink"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-brand-muted pt-1">
                    <strong>MOQ:</strong> {featuredPrimary.moq} · <strong>Lead Time:</strong>{' '}
                    {featuredPrimary.leadTime}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <AddToQuoteButton
                      form={featuredPrimary.form}
                      productSlug={featuredPrimary.slug}
                      label={featuredPrimary.name}
                      moqTier={featuredPrimary.moq}
                    />
                    <Link
                      href={`/private-label/${featuredPrimary.form}/${featuredPrimary.slug}`}
                      className="text-xs font-extrabold text-brand-ink hover:text-amber-800"
                    >
                      View Specs →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Right 3 Stacked Compact Turnkey Cards (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {featuredSecondary.map((prod) => (
                <div
                  key={prod.slug}
                  className="soft-card rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 rounded-xl bg-brand-cream border border-brand-border flex items-center justify-center shrink-0">
                      <DosageCartoonSvg form={prod.form} className="w-12 h-12" />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/private-label/${prod.form}/${prod.slug}`}
                        className="font-extrabold text-sm text-brand-ink hover:text-amber-800 block truncate"
                      >
                        {prod.name}
                      </Link>
                      <div className="inline-block px-2 py-0.5 rounded-full bg-brand-gold/35 text-amber-950 font-extrabold text-[10px] mt-1">
                        {prod.skuCount} VARIANTS · {prod.leadTime}
                      </div>
                      <div className="text-[11px] text-brand-muted mt-1 truncate">
                        {prod.keyIngredients.slice(0, 3).join(' · ')}
                      </div>
                    </div>
                  </div>
                  <AddToQuoteButton
                    form={prod.form}
                    productSlug={prod.slug}
                    label={prod.name}
                    moqTier={prod.moq}
                    compact
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. 5-Step Custom Manufacturing Process Summary */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
              END-TO-END OEM / ODM WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mt-1">
              From concept to retail shelf in 5 clear steps
            </h2>
          </div>
          <Link
            href="/our-process"
            className="text-xs font-extrabold text-amber-800 hover:text-brand-ink inline-flex items-center gap-1"
          >
            <span>See full 5-step process details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { num: '01', title: 'Brief & NDA', desc: 'Share formula status, species, dosage form & target market.' },
            { num: '02', title: 'R&D & Sampling', desc: 'Receive custom bench samples via DHL in 7–10 business days.' },
            { num: '03', title: 'Label & Packaging', desc: 'Jars, pouches, droppers, tubes + compliance label review.' },
            { num: '04', title: 'cGMP Production', desc: 'Cold extrusion, encapsulation, blending, or vacuum filling.' },
            { num: '05', title: 'ISO-17025 COA & DDP', desc: 'Third-party lab release + global FBA/3PL pallet delivery.' },
          ].map((step) => (
            <div key={step.num} className="soft-card rounded-2xl p-5 space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-gold text-brand-ink font-extrabold text-xs flex items-center justify-center">
                {step.num}
              </div>
              <h3 className="font-extrabold text-sm text-brand-ink">{step.title}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Quality & Manufacturing Trio */}
      <QualityTrio />

      {/* 6.5 B2B Partner Scenarios / Case Studies */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
            PROVEN B2B MANUFACTURING TRACK RECORD
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight mt-1">
            How pet brands scale with our contract manufacturing lines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tag: 'AMAZON FBA · CANINE BRAND',
              title: '500-Jar Pilot to 18,000 Units/Month in 9 Months',
              summary:
                'Started with our stock grain-free Hip & Joint soft chew to validate repeat-order velocity, then transitioned to a custom duck-and-pumpkin OEM blend with private bone molds and direct FBA pallet prep.',
              metrics: '21-day first launch · 96.4% palatability score',
            },
            {
              tag: 'VETERINARY DTC · FELINE LINE',
              title: 'Twist-Open L-Lysine & Probiotic Sprinkle Capsules',
              summary:
                'Solved cat refusal issues by formulating low-static, bonito-flavored Size #3 sprinkle capsules with acid-resistant HPMC shells and desiccant-protected amber bottles.',
              metrics: '24-month CFU stability · Full ISO-17025 COA',
            },
            {
              tag: 'MULTI-MARKET · EU & AUSTRALIA',
              title: 'Nitrogen-Flushed Salmon Oil & Enzymatic Dental Paste',
              summary:
                'Engineered peroxide-tested wild Alaskan salmon oil pump bottles and xylitol-free enzymatic dental gels with market-specific Guaranteed Analysis and export documentation.',
              metrics: '0% transit leakage · EU & AU feed-compliant',
            },
          ].map((cs) => (
            <div key={cs.title} className="soft-card rounded-3xl p-7 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                  {cs.tag}
                </div>
                <h3 className="text-lg font-extrabold text-brand-ink leading-snug">{cs.title}</h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">{cs.summary}</p>
              </div>
              <div className="pt-3 border-t border-brand-border/70 text-xs font-extrabold text-brand-ink">
                {cs.metrics}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Downloadable Company PDFs (Sanity CMS Managed) */}
      <PdfDownloads documents={documents} />

      {/* 8. Latest Insights (SEO Content Hub) */}
      <section className="py-16 bg-brand-creamDeep border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                FORMULATION INSIGHTS &amp; GUIDES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight mt-1">
                Technical resources for pet supplement founders
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-xs font-extrabold text-amber-800 hover:text-brand-ink inline-flex items-center gap-1"
            >
              <span>Read all insights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.slice(0, 3).map((post) => (
              <article key={post.slug} className="soft-card rounded-2xl p-6 flex flex-col justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                    {post.category} · {post.readTime}
                  </div>
                  <h3 className="font-extrabold text-base text-brand-ink leading-snug">
                    <Link href={`/insights/${post.slug}`} className="hover:text-amber-800">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">{post.excerpt}</p>
                </div>
                <Link
                  href={`/insights/${post.slug}`}
                  className="text-xs font-extrabold text-brand-ink hover:text-amber-800 inline-flex items-center gap-1"
                >
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Global FAQ */}
      <FAQAccordion faqs={faqs} />

      {/* 10. Compliance Note + Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-brand-border p-4 flex items-center gap-3 text-xs text-brand-muted">
          <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
          <span>
            <strong>Regulatory Note:</strong> Manufactured in our FDA-registered, cGMP, ISO 22000 &amp; HACCP
            facility. Formulas can be designed to AAFCO nutrient profiles or EU feed-material guidelines where
            substantiated.
          </span>
        </div>
      </div>
      <CTABanner />
    </>
  )
}

