'use client'

import React, { useEffect, useRef, useState } from 'react'
import { CheckCircle2, AlertCircle, Trash2 } from 'lucide-react'
import { useQuoteBox } from '@/lib/quote-context'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          theme?: 'light' | 'dark' | 'auto'
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

const DOSAGE_OPTIONS = [
  'Chewable Tablets / Soft Chews',
  'Pet Capsules',
  'Meal Toppers / Powders',
  'Liquid Drops / Oils',
  'Nutritional Pastes / Gels',
]

const SPECIES_OPTIONS = ['Dogs', 'Cats', 'Horses', 'Poultry', 'Small Pets']

const MARKET_OPTIONS = [
  'United States (AAFCO / NASC)',
  'European Union (EU Feed)',
  'United Kingdom',
  'Australia',
  'APAC',
  'Other',
]

const COMPLIANCE_DOC_OPTIONS = [
  'ISO/IEC 17025-accredited Lab COA',
  'Export Health / Veterinary Certificate & COO',
  'Target-Market Labeling & Compliance Support',
]

export function InquiryForm({ preselectedForm }: { preselectedForm?: string }) {
  const { items, removeItem, clearItems } = useQuoteBox()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [company, setCompany] = useState('')
  const [country, setCountry] = useState('')

  const [formulaStatus, setFormulaStatus] = useState<
    'own-formula' | 'need-optimization' | 'reference-product' | 'idea-only'
  >('own-formula')

  const [optimizationFocus, setOptimizationFocus] = useState('')
  const [referenceUrl, setReferenceUrl] = useState('')

  const [selectedForms, setSelectedForms] = useState<string[]>(() => {
    if (!preselectedForm) return []
    const match = DOSAGE_OPTIONS.find((d) =>
      d.toLowerCase().includes(preselectedForm.replace('-', ' ').split(' ')[0])
    )
    return match ? [match] : []
  })
  const [orderVolume, setOrderVolume] = useState('500 – 1,500 Units (Pilot Launch)')
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>(['Dogs'])
  const [healthFunctions, setHealthFunctions] = useState('')
  const [keyIngredients, setKeyIngredients] = useState('')
  const [targetMarkets, setTargetMarkets] = useState<string[]>(['United States (AAFCO / NASC)'])
  const [complianceDocs, setComplianceDocs] = useState<string[]>([])

  const [honeypot, setHoneypot] = useState('')
  const [formLoadedAt] = useState<number>(() => Date.now())
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null)
  const turnstileWidgetIdRef = useRef<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileContainerRef.current) return

    const renderWidget = () => {
      if (!window.turnstile || !turnstileContainerRef.current || turnstileWidgetIdRef.current) return
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: 'light',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
      )
      if (existing) {
        existing.addEventListener('load', renderWidget, { once: true })
      } else {
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        script.async = true
        script.defer = true
        script.onload = renderWidget
        document.head.appendChild(script)
      }
    }

    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
        turnstileWidgetIdRef.current = null
      }
    }
  }, [])

  const toggleItem = (list: string[], value: string, setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((i) => i !== value) : [...list, value])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)

    try {
      const payload = {
        name,
        email,
        whatsapp,
        company,
        country,
        formulaStatus,
        optimizationFocus,
        referenceUrl,
        dosageForms: JSON.stringify(selectedForms),
        orderVolume,
        species: JSON.stringify(selectedSpecies),
        healthFunctions,
        keyIngredients,
        targetMarkets: JSON.stringify(targetMarkets),
        needsComplianceDocs: JSON.stringify(complianceDocs),
        shortlist: JSON.stringify(items),
        clientPageUrl: window.location.href,
        clientReferrer: document.referrer || '',
        clientTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        clientLanguage: navigator.language || '',
        clientScreen: `${window.screen.width}x${window.screen.height}`,
        websiteUrl: honeypot,
        formLoadedAt: String(formLoadedAt),
        turnstileToken,
      }

      if (TURNSTILE_SITE_KEY && !turnstileToken) {
        throw new Error('Please wait for the Cloudflare security check to complete.')
      }

      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        if (turnstileWidgetIdRef.current && window.turnstile) {
          window.turnstile.reset(turnstileWidgetIdRef.current)
          setTurnstileToken('')
        }
        throw new Error(data?.error || 'Failed to submit inquiry. Please check your inputs.')
      }

      setSubmitted(true)
      clearItems()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unexpected submission error')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-pastel-mint text-emerald-900 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-brand-ink">
          Custom Formula Inquiry Received!
        </h2>
        <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{name}</strong>. Our formulation chemists and B2B account desk will review your
          specification and respond to <strong>{email}</strong> within 24 business hours under Mutual NDA.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Anti-bot Honeypot Field (hidden from humans, traps automated bots) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <label htmlFor="websiteUrl">Website URL (Leave blank)</label>
        <input
          id="websiteUrl"
          name="websiteUrl"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Pre-filled Quote Box Shortlist */}
      {items.length > 0 && (
        <div className="bg-brand-creamDeep rounded-2xl border border-brand-gold p-5 space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
            ATTACHED FROM YOUR QUOTE BOX ({items.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-brand-border text-xs font-bold text-brand-ink"
              >
                <span>{item.label}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-brand-muted hover:text-red-600 cursor-pointer"
                  aria-label={`Remove ${item.label}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Section 1: Basic Info */}
      <fieldset className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-4">
        <legend className="text-xs font-extrabold uppercase tracking-wider text-amber-800 px-2">
          1. Contact &amp; Company Information
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-brand-ink mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-medium focus:outline-none focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-brand-ink mb-1">Work Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-medium focus:outline-none focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-brand-ink mb-1">
              WhatsApp / Phone
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+1 / +44 / +61 ..."
              className="w-full px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-medium focus:outline-none focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-brand-ink mb-1">
              Company / Brand Name *
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your brand or company name"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-medium focus:outline-none focus:border-brand-gold"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-extrabold text-brand-ink mb-1">Country / Region *</label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="United States / Germany / United Kingdom"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-medium focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>
      </fieldset>

      {/* Section 2: Formula Status (Conditional Fields) */}
      <fieldset className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-4">
        <legend className="text-xs font-extrabold uppercase tracking-wider text-amber-800 px-2">
          2. Current Formula Status
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: 'own-formula', label: 'Have Complete Formula' },
            { id: 'need-optimization', label: 'Need Formula Optimization' },
            { id: 'reference-product', label: 'Have Reference Product' },
            { id: 'idea-only', label: 'Concept / Private Label' },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFormulaStatus(opt.id as typeof formulaStatus)}
              className={`px-4 py-3 rounded-xl border text-xs font-extrabold text-left transition-all cursor-pointer ${
                formulaStatus === opt.id
                  ? 'bg-brand-gold border-brand-ink text-brand-ink'
                  : 'bg-brand-cream border-brand-border text-brand-muted hover:text-brand-ink'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {formulaStatus === 'need-optimization' && (
          <div>
            <label className="block text-xs font-extrabold text-brand-ink mb-1">
              What needs optimization? (Palatability, texture, dosage, cost, shelf life...)
            </label>
            <input
              type="text"
              value={optimizationFocus}
              onChange={(e) => setOptimizationFocus(e.target.value)}
              placeholder="e.g., Dogs reject current bitter flavor; want cold-extruded duck base"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-medium"
            />
          </div>
        )}

        {formulaStatus === 'reference-product' && (
          <div>
            <label className="block text-xs font-extrabold text-brand-ink mb-1">
              Reference Product Name or Marketplace URL (Amazon / Competitor)
            </label>
            <input
              type="text"
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              placeholder="e.g., https://amazon.com/dp/... or Brand X Hip & Joint Chews"
              className="w-full px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-medium"
            />
          </div>
        )}
      </fieldset>

      {/* Section 3: Dosage Forms & Volume */}
      <fieldset className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-4">
        <legend className="text-xs font-extrabold uppercase tracking-wider text-amber-800 px-2">
          3. Dosage Form(s) &amp; Target Order Volume
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {DOSAGE_OPTIONS.map((opt) => {
            const active = selectedForms.includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleItem(selectedForms, opt, setSelectedForms)}
                className={`px-4 py-2 rounded-full border text-xs font-extrabold transition-all cursor-pointer ${
                  active
                    ? 'bg-brand-ink border-brand-ink text-brand-goldText'
                    : 'bg-brand-cream border-brand-border text-brand-ink hover:border-brand-gold'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        <div>
          <label className="block text-xs font-extrabold text-brand-ink mb-1">
            Estimated Initial Order Quantity
          </label>
          <select
            value={orderVolume}
            onChange={(e) => setOrderVolume(e.target.value)}
            className="w-full sm:w-96 px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-bold"
          >
            <option>500 – 1,500 Units (Pilot Launch)</option>
            <option>2,000 – 5,000 Units (Growth Tier)</option>
            <option>5,000 – 20,000 Units (Scale Tier)</option>
            <option>20,000+ Units (Enterprise / Retail)</option>
          </select>
        </div>
      </fieldset>

      {/* Section 4: Target Pet & Functions */}
      <fieldset className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-4">
        <legend className="text-xs font-extrabold uppercase tracking-wider text-amber-800 px-2">
          4. Target Pet Species &amp; Health Functions
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {SPECIES_OPTIONS.map((sp) => {
            const active = selectedSpecies.includes(sp)
            return (
              <button
                key={sp}
                type="button"
                onClick={() => toggleItem(selectedSpecies, sp, setSelectedSpecies)}
                className={`px-4 py-2 rounded-full border text-xs font-extrabold transition-all cursor-pointer ${
                  active
                    ? 'bg-brand-gold border-brand-ink text-brand-ink'
                    : 'bg-brand-cream border-brand-border text-brand-ink'
                }`}
              >
                {sp}
              </button>
            )
          })}
        </div>
        <div>
          <label className="block text-xs font-extrabold text-brand-ink mb-1">
            Target Health Benefits
          </label>
          <input
            type="text"
            value={healthFunctions}
            onChange={(e) => setHealthFunctions(e.target.value)}
            placeholder="e.g., Hip & joint mobility, 5B CFU gut probiotics, allergy & itch relief, calming..."
            className="w-full px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-medium"
          />
        </div>
      </fieldset>

      {/* Section 5: Key Ingredients & Packaging Notes */}
      <fieldset className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-4">
        <legend className="text-xs font-extrabold uppercase tracking-wider text-amber-800 px-2">
          5. Key Ingredients, Dosages &amp; Packaging Notes
        </legend>
        <div>
          <label className="block text-xs font-extrabold text-brand-ink mb-1">
            Key Active Ingredients, Dosages &amp; Packaging Requirements
          </label>
          <textarea
            rows={4}
            value={keyIngredients}
            onChange={(e) => setKeyIngredients(e.target.value)}
            placeholder="e.g., 500mg Glucosamine HCl, 400mg OptiMSM, 90ct PCR jar with duck & pumpkin flavor..."
            className="w-full px-4 py-2.5 rounded-xl bg-brand-cream border border-brand-border text-sm font-medium"
          />
          <p className="text-[11px] text-brand-muted mt-1.5">
            Need to share a proprietary spec sheet or formula PDF? Simply reply to our 24-hour confirmation email after Mutual NDA sign-off.
          </p>
        </div>
      </fieldset>

      {/* Section 6: Target Market & Compliance */}
      <fieldset className="bg-white rounded-3xl border border-brand-border p-6 sm:p-8 space-y-4">
        <legend className="text-xs font-extrabold uppercase tracking-wider text-amber-800 px-2">
          6. Target Sales Market &amp; Regulatory Needs
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {MARKET_OPTIONS.map((m) => {
            const active = targetMarkets.includes(m)
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggleItem(targetMarkets, m, setTargetMarkets)}
                className={`px-4 py-2 rounded-full border text-xs font-extrabold transition-all cursor-pointer ${
                  active
                    ? 'bg-brand-ink border-brand-ink text-brand-goldText'
                    : 'bg-brand-cream border-brand-border text-brand-ink'
                }`}
              >
                {m}
              </button>
            )
          })}
        </div>

        <div className="space-y-2.5 pt-1">
          {COMPLIANCE_DOC_OPTIONS.map((doc) => {
            const checked = complianceDocs.includes(doc)
            return (
              <label
                key={doc}
                className="flex items-center gap-2.5 text-xs font-bold text-brand-ink cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleItem(complianceDocs, doc, setComplianceDocs)}
                  className="w-4 h-4 accent-brand-ink"
                />
                <span>{doc}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {TURNSTILE_SITE_KEY && (
        <div className="flex justify-start">
          <div ref={turnstileContainerRef} />
        </div>
      )}

      {submitError && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-full pill-gold-btn text-sm font-extrabold disabled:opacity-60 cursor-pointer"
      >
        {submitting ? 'Submitting Your Formula Brief...' : 'Submit Custom Quote & Sample Request →'}
      </button>
    </form>
  )
}

