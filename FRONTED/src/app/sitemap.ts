import type { MetadataRoute } from 'next'
import {
  ALLOWED_DOSAGE_MANUFACTURING_SLUGS,
  ALLOWED_DOSAGE_SHORT_SLUGS,
  getActiveProducts,
  getEffects,
  getIngredients,
  getInsights,
  getPets,
} from '@/lib/data'
import { SITE_URL } from '@/components/seo/JsonLd'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [products, pets, effects, ingredients, insights] = await Promise.all([
    getActiveProducts(),
    getPets(),
    getEffects(),
    getIngredients(),
    getInsights(),
  ])

  const coreRoutes = [
    { path: '/', priority: 1.0 },
    ...ALLOWED_DOSAGE_MANUFACTURING_SLUGS.map((s) => ({ path: `/${s}`, priority: 0.9 })),
    { path: '/custom-formulation', priority: 0.9 },
    { path: '/our-process', priority: 0.8 },
    { path: '/contact-us', priority: 0.9 },
    { path: '/quality-compliance', priority: 0.8 },
    { path: '/our-facility', priority: 0.8 },
    { path: '/about-us', priority: 0.7 },
    { path: '/about-us/certifications', priority: 0.7 },
    { path: '/faq', priority: 0.7 },
    { path: '/privacy-policy', priority: 0.3 },
    { path: '/private-label', priority: 0.9 },
    ...ALLOWED_DOSAGE_SHORT_SLUGS.map((f) => ({ path: `/private-label/${f}`, priority: 0.8 })),
    { path: '/custom-formulation/ingredients', priority: 0.7 },
    { path: '/custom-formulation/effects', priority: 0.7 },
    { path: '/custom-formulation/by-pet', priority: 0.7 },
    { path: '/insights', priority: 0.7 },
  ]

  const entries: MetadataRoute.Sitemap = coreRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: r.priority,
  }))

  // 65 active private label product landing pages (3 planned zero-SKU items excluded)
  for (const p of products) {
    entries.push({
      url: `${SITE_URL}/private-label/${p.form}/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    })
  }

  // Matrix dimension detail pages
  for (const i of ingredients) {
    entries.push({
      url: `${SITE_URL}/custom-formulation/ingredients/${i.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    })
  }
  for (const e of effects) {
    entries.push({
      url: `${SITE_URL}/custom-formulation/effects/${e.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    })
  }
  for (const pet of pets) {
    entries.push({
      url: `${SITE_URL}/custom-formulation/by-pet/${pet.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // 240 controlled cross pages (3 pets x 5 forms x 16 effects)
  for (const pet of pets) {
    for (const form of ALLOWED_DOSAGE_SHORT_SLUGS) {
      for (const eff of effects) {
        entries.push({
          url: `${SITE_URL}/custom-formulation/${pet.slug}/${form}/${eff.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  }

  // Insights articles
  for (const post of insights) {
    entries.push({
      url: `${SITE_URL}/insights/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}

