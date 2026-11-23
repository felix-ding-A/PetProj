'use client'

import React, { useState } from 'react'
import { CheckCircle2, Upload, AlertCircle, Trash2 } from 'lucide-react'
import { useQuoteBox } from '@/lib/quote-context'

const DOSAGE_OPTIONS = [
  'Chewable Tablets / Soft Chews',
  'Pet Capsules',
  'Meal Toppers / Powders',
  'Liquid Drops / Oils',
  'Nutritional Pastes / Gels',
]

const SPECIES_OPTIONS = ['Dogs', 'Cats', 'Small Pets / Poultry / Equine']

const MARKET_OPTIONS = ['United States (AAFCO / NASC)', 'European Union (EU Feed)', 'United Kingdom', 'China / APAC', 'Other']

const MAX_FILES = 3
const MAX_TOTAL_BYTES = 4 * 1024 * 1024 // 4 MB total (safely inside Vercel 4.5MB limit)

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
  const [needsComplianceDocs, setNeedsComplianceDocs] = useState(true)

  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const toggleItem = (list: string[], value: string, setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((i) => i !== value) : [...list, value])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)
    const incoming = Array.from(e.target.files || [])
    if (incoming.length > MAX_FILES) {
      setFileError(`Maximum ${MAX_FILES} files allowed.`)
      return
    }
    const totalSize = incoming.reduce((acc, f) => acc + f.size, 0)
    if (totalSize > MAX_TOTAL_BYTES) {
      setFileError('Total attachment size must be 4 MB or less (for direct encrypted email delivery).')
      return
    }
    setFiles(incoming)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)

    try {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('email', email)
      fd.append('whatsapp', whatsapp)
      fd.append('company', company)
      fd.append('country', country)
      fd.append('formulaStatus', formulaStatus)
      fd.append('optimizationFocus', optimizationFocus)
      fd.append('referenceUrl', referenceUrl)
      fd.append('dosageForms', JSON.stringify(selectedForms))
      fd.append('orderVolume', orderVolume)
      fd.append('species', JSON.stringify(selectedSpecies))
      fd.append('healthFunctions', healthFunctions)
      fd.append('keyIngredients', keyIngredients)
      fd.append('targetMarkets', JSON.stringify(targetMarkets))
      fd.append('needsComplianceDocs', String(needsComplianceDocs))
      fd.append('shortlist', JSON.stringify(items))
      files.forEach((f) => fd.append('attachments', f))

      const res = await fetch('/api/inquiry', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) {
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
      <div className="bg-white rounded-3xl border border-pawzo-border p-8 sm:p-12 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-pastel-mint text-emerald-900 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-pawzo-ink">
          Custom Formula Inquiry Received!
        </h2>
        <p className="text-sm text-pawzo-muted max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{name}</strong>. Our formulation chemists and B2B account desk will review your
          specification and respond to <strong>{email}</strong> within 24 business hours under Mutual NDA.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Pre-filled Quote Box Shortlist */}
      {items.length > 0 && (
        <div className="bg-pawzo-creamDeep rounded-2xl border border-pawzo-gold p-5 space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
            ATTACHED FROM YOUR QUOTE BOX ({items.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-pawzo-border text-xs font-bold text-pawzo-ink"
              >
                <span>{item.label}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-pawzo-muted hover:text-red-600 cursor-pointer"
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
      <fieldset className="bg-white rounded-3xl border border-pawzo-border p-6 sm:p-8 space-y-4">
        <legend className="text-xs font-extrabold uppercase tracking-wider text-amber-800 px-2">
          1. Contact &amp; Company Information
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-pawzo-ink mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Morgan"
              className="w-full px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-medium focus:outline-none focus:border-pawzo-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-pawzo-ink mb-1">Work Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@yourpetbrand.com"
              className="w-full px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-medium focus:outline-none focus:border-pawzo-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-pawzo-ink mb-1">
              WhatsApp / Phone
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+1 555-0192"
              className="w-full px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-medium focus:outline-none focus:border-pawzo-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-pawzo-ink mb-1">
              Company / Brand Name *
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Happy Tail Wellness LLC"
              className="w-full px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-medium focus:outline-none focus:border-pawzo-gold"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-extrabold text-pawzo-ink mb-1">Country / Region *</label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="United States / Germany / United Kingdom"
              className="w-full px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-medium focus:outline-none focus:border-pawzo-gold"
            />
          </div>
        </div>
      </fieldset>

      {/* Section 2: Formula Status (Conditional Fields) */}
      <fieldset className="bg-white rounded-3xl border border-pawzo-border p-6 sm:p-8 space-y-4">
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
                  ? 'bg-pawzo-gold border-pawzo-ink text-pawzo-ink'
                  : 'bg-pawzo-cream border-pawzo-border text-pawzo-muted hover:text-pawzo-ink'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {formulaStatus === 'need-optimization' && (
          <div>
            <label className="block text-xs font-extrabold text-pawzo-ink mb-1">
              What needs optimization? (Palatability, texture, dosage, cost, shelf life...)
            </label>
            <input
              type="text"
              value={optimizationFocus}
              onChange={(e) => setOptimizationFocus(e.target.value)}
              placeholder="e.g., Dogs reject current bitter flavor; want cold-extruded duck base"
              className="w-full px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-medium"
            />
          </div>
        )}

        {formulaStatus === 'reference-product' && (
          <div>
            <label className="block text-xs font-extrabold text-pawzo-ink mb-1">
              Reference Product Name or Marketplace URL (Amazon / Competitor)
            </label>
            <input
              type="text"
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              placeholder="e.g., https://amazon.com/dp/... or Brand X Hip & Joint Chews"
              className="w-full px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-medium"
            />
          </div>
        )}
      </fieldset>

      {/* Section 3: Dosage Forms & Volume */}
      <fieldset className="bg-white rounded-3xl border border-pawzo-border p-6 sm:p-8 space-y-4">
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
                    ? 'bg-pawzo-ink border-pawzo-ink text-pawzo-goldText'
                    : 'bg-pawzo-cream border-pawzo-border text-pawzo-ink hover:border-pawzo-gold'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        <div>
          <label className="block text-xs font-extrabold text-pawzo-ink mb-1">
            Estimated Initial Order Quantity
          </label>
          <select
            value={orderVolume}
            onChange={(e) => setOrderVolume(e.target.value)}
            className="w-full sm:w-96 px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-bold"
          >
            <option>500 – 1,500 Units (Pilot Launch)</option>
            <option>2,000 – 5,000 Units (Growth Tier)</option>
            <option>5,000 – 20,000 Units (Scale Tier)</option>
            <option>20,000+ Units (Enterprise / Retail)</option>
          </select>
        </div>
      </fieldset>

      {/* Section 4: Target Pet & Functions */}
      <fieldset className="bg-white rounded-3xl border border-pawzo-border p-6 sm:p-8 space-y-4">
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
                    ? 'bg-pawzo-gold border-pawzo-ink text-pawzo-ink'
                    : 'bg-pawzo-cream border-pawzo-border text-pawzo-ink'
                }`}
              >
                {sp}
              </button>
            )
          })}
        </div>
        <div>
          <label className="block text-xs font-extrabold text-pawzo-ink mb-1">
            Target Health Benefits
          </label>
          <input
            type="text"
            value={healthFunctions}
            onChange={(e) => setHealthFunctions(e.target.value)}
            placeholder="e.g., Hip & joint mobility, 5B CFU gut probiotics, allergy & itch relief, calming..."
            className="w-full px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-medium"
          />
        </div>
      </fieldset>

      {/* Section 5: Key Ingredients & Confidential File Attachment */}
      <fieldset className="bg-white rounded-3xl border border-pawzo-border p-6 sm:p-8 space-y-4">
        <legend className="text-xs font-extrabold uppercase tracking-wider text-amber-800 px-2">
          5. Key Ingredients &amp; Spec Sheet Upload (NDA Email Attachment)
        </legend>
        <div>
          <label className="block text-xs font-extrabold text-pawzo-ink mb-1">
            Key Active Ingredients, Dosages &amp; Packaging Notes
          </label>
          <textarea
            rows={4}
            value={keyIngredients}
            onChange={(e) => setKeyIngredients(e.target.value)}
            placeholder="e.g., 500mg Glucosamine HCl, 400mg OptiMSM, 90ct PCR jar with duck & pumpkin flavor..."
            className="w-full px-4 py-2.5 rounded-xl bg-pawzo-cream border border-pawzo-border text-sm font-medium"
          />
        </div>

        <div className="rounded-2xl border border-dashed border-pawzo-border bg-pawzo-cream p-5">
          <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-pawzo-border flex items-center justify-center text-amber-800">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-pawzo-ink">
                  Attach Formula Sheet / Supplement Facts (Optional)
                </div>
                <div className="text-[11px] text-pawzo-muted">
                  PDF, DOC, DOCX, XLSX, CSV · Max 3 files · Total ≤ 4 MB · Sent directly via encrypted email (never stored publicly)
                </div>
              </div>
            </div>
            <span className="px-4 py-2 rounded-full bg-white border border-pawzo-border text-xs font-extrabold text-pawzo-ink">
              Choose Files
            </span>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xlsx,.csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {files.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs font-semibold text-pawzo-ink">
              {files.map((f) => (
                <li key={f.name}>
                  • {f.name} ({(f.size / 1024).toFixed(0)} KB)
                </li>
              ))}
            </ul>
          )}
          {fileError && (
            <div className="mt-2 text-xs font-bold text-red-600 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>{fileError}</span>
            </div>
          )}
        </div>
      </fieldset>

      {/* Section 6: Target Market & Compliance */}
      <fieldset className="bg-white rounded-3xl border border-pawzo-border p-6 sm:p-8 space-y-4">
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
                    ? 'bg-pawzo-ink border-pawzo-ink text-pawzo-goldText'
                    : 'bg-pawzo-cream border-pawzo-border text-pawzo-ink'
                }`}
              >
                {m}
              </button>
            )
          })}
        </div>

        <label className="flex items-center gap-2.5 text-xs font-bold text-pawzo-ink cursor-pointer">
          <input
            type="checkbox"
            checked={needsComplianceDocs}
            onChange={(e) => setNeedsComplianceDocs(e.target.checked)}
            className="w-4 h-4 accent-pawzo-ink"
          />
          <span>
            Yes, we require ISO-17025 COA, export health certificates, or market-specific feed-label guidance
          </span>
        </label>
      </fieldset>

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

