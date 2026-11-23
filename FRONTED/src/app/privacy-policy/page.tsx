import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy | Pawsome Labs',
  description: 'How Pawsome Labs handles B2B inquiry data, confidential formula attachments, and NDA privacy.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Privacy Policy', href: '/privacy-policy' },
        ]}
      />
      <h1 className="text-3xl font-extrabold text-pawzo-ink">Privacy Policy &amp; Formula Confidentiality</h1>
      <div className="space-y-4 text-sm text-pawzo-muted leading-relaxed">
        <p>
          Pawsome Labs respects the confidentiality of every B2B inquiry and proprietary formulation specification
          submitted through our website.
        </p>
        <h2 className="text-lg font-extrabold text-pawzo-ink pt-2">1. Information We Collect</h2>
        <p>
          When you submit our Contact / Inquiry form, we collect your name, work email, phone/WhatsApp, company
          name, country, project specifications, and any optional specification files you choose to attach.
        </p>
        <h2 className="text-lg font-extrabold text-pawzo-ink pt-2">2. Formula Attachment Security</h2>
        <p>
          Uploaded formula documents are transmitted directly as email attachments to our formulation desk and are
          never stored in public cloud buckets or our public CMS.
        </p>
        <h2 className="text-lg font-extrabold text-pawzo-ink pt-2">3. Local Storage Usage</h2>
        <p>
          Our B2B Quote Box uses browser <code>localStorage</code> solely to preserve your shortlisted private
          label categories across page refreshes prior to inquiry submission.
        </p>
      </div>
    </section>
  )
}

