import React from 'react'
import { COMPANY } from '@/lib/company'

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function sanitizeUrl(raw?: string): string {
  if (!raw || !raw.trim()) return 'https://novapetnutra.com'
  let url = raw.trim()
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }
  return url.replace(/\/+$/, '')
}

export const SITE_URL = sanitizeUrl(process.env.NEXT_PUBLIC_SITE_URL)

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NovaPet Nutra',
    url: SITE_URL,
  }
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.brandName,
    legalName: COMPANY.legalName,
    duns: COMPANY.duns,
    url: SITE_URL,
    email: COMPANY.email,
    telephone: COMPANY.whatsappDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
    description:
      'FDA-registered, cGMP-certified B2B contract manufacturer of private label and custom OEM/ODM pet supplements across chewable tablets, capsules, powders, drops, and pastes.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'B2B Sales & Custom Formulation',
      telephone: COMPANY.whatsappDisplay,
      email: COMPANY.email,
      url: `${SITE_URL}/contact-us`,
      availableLanguage: ['English'],
    },
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  }
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}
