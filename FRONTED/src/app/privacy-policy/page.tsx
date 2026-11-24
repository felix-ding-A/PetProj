import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { COMPANY } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Privacy & Cookie Policy | NovaPet Nutra',
  description:
    'How NovaPet Nutra (Shaanxi Ginkvora Biotechnology Co., Ltd.) handles B2B inquiry data, cookies, and GDPR consent preferences.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Privacy & Cookie Policy', href: '/privacy-policy' },
        ]}
      />
      <h1 className="text-3xl font-extrabold text-brand-ink">Privacy &amp; Cookie Policy</h1>
      <div className="space-y-4 text-sm text-brand-muted leading-relaxed">
        <p>
          <strong>{COMPANY.brandName}</strong> (operated by <strong>{COMPANY.legalName}</strong>, D-U-N-S®:{' '}
          {COMPANY.duns}) respects the confidentiality of every B2B inquiry and formulation brief submitted
          through our website.
        </p>

        <h2 className="text-lg font-extrabold text-brand-ink pt-2">1. B2B Inquiry Information</h2>
        <p>
          When you submit our Contact / Inquiry form, we collect your name, work email, phone/WhatsApp, company
          name, country, project specifications, and basic request metadata (IP address, approximate region,
          browser type, and referring page) solely to qualify B2B leads, prevent automated spam, and respond to
          your quote request.
        </p>

        <h2 className="text-lg font-extrabold text-brand-ink pt-2">2. Strictly Necessary Cookies &amp; Storage</h2>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>
            <strong>Quote Box Storage (<code>pet-quote-box</code>)</strong>: Stored locally in your browser via{' '}
            <code>localStorage</code> to preserve your shortlisted private label categories prior to inquiry
            submission.
          </li>
          <li>
            <strong>Consent Preference (<code>novapet-cookie-consent</code>)</strong>: Remembers your cookie
            choice (<code>Accept All</code> or <code>Essential Only</code>).
          </li>
          <li>
            <strong>Cloudflare Turnstile</strong>: Strictly necessary anti-bot security verification on our
            inquiry form.
          </li>
        </ul>

        <h2 className="text-lg font-extrabold text-brand-ink pt-2">3. Optional Analytics Cookies</h2>
        <p>
          Optional third-party analytics tools (such as Google Analytics 4 or Microsoft Clarity) are{' '}
          <strong>blocked by default</strong> and only load if you explicitly click <strong>Accept All</strong> in
          our Cookie Preferences banner. You may update your choice at any time by clicking{' '}
          <strong>Cookie Preferences</strong> in the website footer.
        </p>

        <h2 className="text-lg font-extrabold text-brand-ink pt-2">4. Data Rights &amp; Contact</h2>
        <p>
          To request access to, correction of, or deletion of your B2B contact record, email us at{' '}
          <a href={`mailto:${COMPANY.email}`} className="font-bold text-amber-800 underline">
            {COMPANY.email}
          </a>{' '}
          or write to {COMPANY.legalName}, {COMPANY.address.full}.
        </p>
      </div>
    </section>
  )
}
