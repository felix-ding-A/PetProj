import { getSanityClient, isUsingDevSeed } from '@/lib/sanity/client'
import { getSanityFileUrl, urlForImage } from '@/lib/sanity/media'
import { COMPANY_DOCUMENTS_SEED, GLOBAL_FAQS_SEED, INSIGHTS_SEED } from './content'
import { DOSAGE_FORMS_SEED } from './dosageForms'
import { INGREDIENT_CATEGORIES_SEED, PET_EFFECTS_SEED, PET_SPECIES_SEED } from './formulationMatrix'
import { PRODUCTS_SEED } from './products'
import type {
  CompanyDocumentData,
  DosageFormData,
  DosageShortSlug,
  FAQItem,
  IngredientCategoryData,
  InsightArticleData,
  PetEffectData,
  PetSpeciesData,
  PortableTextBlock,
  ProductCategoryData,
} from './types'

export { isUsingDevSeed }

export const ALLOWED_DOSAGE_MANUFACTURING_SLUGS = DOSAGE_FORMS_SEED.map((d) => d.slug)
export const ALLOWED_DOSAGE_SHORT_SLUGS: DosageShortSlug[] = [
  'chewable-tablet',
  'capsule',
  'powder',
  'drops',
  'paste',
]

function estimateReadTime(body?: string | PortableTextBlock[], explicit?: string): string {
  if (explicit && explicit.trim()) return explicit.trim()
  if (!body) return '4 min read'
  let wordCount = 0
  if (typeof body === 'string') {
    const cleaned = body.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/[#*_`>\-|]/g, ' ')
    wordCount = cleaned.trim().split(/\s+/).filter(Boolean).length
  } else if (Array.isArray(body)) {
    for (const block of body) {
      if (block._type === 'block' && Array.isArray(block.children)) {
        for (const child of block.children as { text?: string }[]) {
          if (child.text) {
            wordCount += child.text.trim().split(/\s+/).filter(Boolean).length
          }
        }
      }
    }
  }
  const mins = Math.max(1, Math.ceil(wordCount / 220))
  return `${mins} min read`
}

interface RawSanityArticle {
  title: string
  slug: string
  category?: string
  excerpt?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  readTime?: string
  coverImage?: { alt?: string; asset?: { _ref?: string } }
  body?: string | PortableTextBlock[]
  relatedFormSlugs?: string[]
  relatedRefSlugs?: string[]
  metaTitle?: string
  metaDescription?: string
}

function mapSanityArticle(d: RawSanityArticle): InsightArticleData {
  const mergedForms = Array.from(
    new Set([...(d.relatedFormSlugs || []), ...(d.relatedRefSlugs || [])])
  ).filter((f): f is DosageShortSlug =>
    ALLOWED_DOSAGE_SHORT_SLUGS.includes(f as DosageShortSlug)
  )

  return {
    title: d.title,
    slug: d.slug,
    category: d.category || 'Formulation Science',
    excerpt: d.excerpt || '',
    publishedAt: d.publishedAt || new Date().toISOString(),
    updatedAt: d.updatedAt,
    author: d.author || 'NovaPet Nutra R&D Team',
    readTime: estimateReadTime(d.body, d.readTime),
    coverImageUrl: d.coverImage ? urlForImage(d.coverImage) : null,
    coverImageAlt: d.coverImage?.alt || d.title,
    relatedForms: mergedForms,
    markdownBody: typeof d.body === 'string' ? d.body : undefined,
    body: Array.isArray(d.body) ? d.body : undefined,
    metaTitle: (d.metaTitle || `${d.title} | NovaPet Nutra`).slice(0, 62),
    metaDescription: (d.metaDescription || d.excerpt || d.title).slice(0, 159),
  }
}

export async function getDosageForms(): Promise<DosageFormData[]> {
  const client = getSanityClient()
  if (!client) return DOSAGE_FORMS_SEED

  try {
    const docs = await client.fetch<DosageFormData[]>(
      `*[_type == "dosageForm"] | order(name asc){
        name,
        "slug": slug.current,
        shortSlug,
        tagline,
        heroDescription,
        moq,
        leadTime,
        whyChoosePoints,
        customizationOptions,
        processSteps,
        specs,
        "brochureRef": brochurePdf.asset._ref,
        faqs,
        metaTitle,
        metaDescription
      }`,
      {},
      { next: { revalidate: 60, tags: ['dosageForms'] } }
    )

    if (!docs || docs.length === 0) return DOSAGE_FORMS_SEED
    return docs.map((d) => {
      const fallback = DOSAGE_FORMS_SEED.find((s) => s.slug === d.slug) ?? DOSAGE_FORMS_SEED[0]
      const brochureRef = (d as unknown as { brochureRef?: string }).brochureRef
      return {
        ...fallback,
        ...d,
        brochurePdfUrl: brochureRef ? (getSanityFileUrl(brochureRef, `${d.shortSlug}-spec-sheet.pdf`) ?? undefined) : undefined,
      }
    })
  } catch (err) {
    console.warn('[Sanity Fetch Warning: dosageForm] Fallback to seed data due to:', err instanceof Error ? err.message : err)
    return DOSAGE_FORMS_SEED
  }
}

export async function getDosageFormBySlug(slug: string): Promise<DosageFormData | null> {
  const forms = await getDosageForms()
  return forms.find((f) => f.slug === slug) ?? null
}

export async function getDosageFormByShortSlug(shortSlug: string): Promise<DosageFormData | null> {
  const forms = await getDosageForms()
  return forms.find((f) => f.shortSlug === shortSlug) ?? null
}

export async function getActiveProducts(): Promise<ProductCategoryData[]> {
  const client = getSanityClient()
  if (!client) return PRODUCTS_SEED.filter((p) => p.status === 'active')

  try {
    const docs = await client.fetch<ProductCategoryData[]>(
      `*[_type == "product" && status == "active"] | order(name asc){
        name,
        "slug": slug.current,
        status,
        "form": form->shortSlug,
        skuCount,
        shortDescription,
        "species": species[]->slug.current,
        "effects": effects[]->slug.current,
        keyIngredients,
        packagingOptions,
        moq,
        leadTime,
        metaTitle,
        metaDescription
      }`,
      {},
      { next: { revalidate: 60, tags: ['products'] } }
    )

    if (!docs || docs.length === 0) return PRODUCTS_SEED.filter((p) => p.status === 'active')
    return docs
  } catch (err) {
    console.warn('[Sanity Fetch Warning: product] Fallback to seed data due to:', err instanceof Error ? err.message : err)
    return PRODUCTS_SEED.filter((p) => p.status === 'active')
  }
}

export async function getProductsByForm(form: DosageShortSlug): Promise<ProductCategoryData[]> {
  const all = await getActiveProducts()
  return all.filter((p) => p.form === form)
}

export async function getProductByFormAndSlug(
  form: string,
  slug: string
): Promise<ProductCategoryData | null> {
  const all = await getActiveProducts()
  return all.find((p) => p.form === form && p.slug === slug) ?? null
}

export async function getPets(): Promise<PetSpeciesData[]> {
  return PET_SPECIES_SEED
}

export async function getPetBySlug(slug: string): Promise<PetSpeciesData | null> {
  return PET_SPECIES_SEED.find((p) => p.slug === slug) ?? null
}

export async function getEffects(): Promise<PetEffectData[]> {
  return PET_EFFECTS_SEED
}

export async function getEffectBySlug(slug: string): Promise<PetEffectData | null> {
  return PET_EFFECTS_SEED.find((e) => e.slug === slug) ?? null
}

export async function getIngredients(): Promise<IngredientCategoryData[]> {
  return INGREDIENT_CATEGORIES_SEED
}

export async function getIngredientBySlug(slug: string): Promise<IngredientCategoryData | null> {
  return INGREDIENT_CATEGORIES_SEED.find((i) => i.slug === slug) ?? null
}

export async function getCompanyDocuments(): Promise<CompanyDocumentData[]> {
  const client = getSanityClient()
  if (!client) return COMPANY_DOCUMENTS_SEED

  try {
    const docs = await client.fetch<
      {
        _id: string
        title: string
        category: CompanyDocumentData['category']
        summary: string
        updatedAt: string
        fileRef?: string
      }[]
    >(
      `*[_type == "companyDocument"] | order(updatedAt desc){
        _id, title, category, summary, updatedAt,
        "fileRef": pdfFile.asset._ref
      }`,
      {},
      { next: { revalidate: 60, tags: ['documents'] } }
    )

    if (!docs || docs.length === 0) return COMPANY_DOCUMENTS_SEED
    return docs.map((d) => ({
      id: d._id,
      title: d.title,
      category: d.category,
      summary: d.summary,
      updatedAt: d.updatedAt,
      pdfUrl: getSanityFileUrl(d.fileRef, `${d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`),
      fileSizeLabel: 'PDF · Sanity CDN',
    }))
  } catch (err) {
    console.warn('[Sanity Fetch Warning: companyDocument] Fallback to seed data due to:', err instanceof Error ? err.message : err)
    return COMPANY_DOCUMENTS_SEED
  }
}

export async function getGlobalFaqs(): Promise<FAQItem[]> {
  return GLOBAL_FAQS_SEED
}

const ARTICLE_PROJECTION = `{
  title,
  "slug": slug.current,
  category,
  excerpt,
  publishedAt,
  "updatedAt": _updatedAt,
  author,
  readTime,
  coverImage,
  body,
  relatedFormSlugs,
  "relatedRefSlugs": relatedForms[]->shortSlug,
  metaTitle,
  metaDescription
}`

export async function getInsights(): Promise<InsightArticleData[]> {
  const client = getSanityClient()
  if (!client) return INSIGHTS_SEED

  try {
    const docs = await client.fetch<RawSanityArticle[]>(
      `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) ${ARTICLE_PROJECTION}`,
      {},
      { next: { revalidate: 60, tags: ['articles'] } }
    )

    if (!docs || docs.length === 0) return INSIGHTS_SEED
    return docs.map(mapSanityArticle)
  } catch (err) {
    console.warn('[Sanity Fetch Warning: article] Fallback to seed data due to:', err instanceof Error ? err.message : err)
    return INSIGHTS_SEED
  }
}

export async function getInsightBySlug(slug: string): Promise<InsightArticleData | null> {
  const client = getSanityClient()
  if (!client) {
    return INSIGHTS_SEED.find((a) => a.slug === slug) ?? null
  }

  try {
    const doc = await client.fetch<RawSanityArticle | null>(
      `*[_type == "article" && slug.current == $slug][0] ${ARTICLE_PROJECTION}`,
      { slug },
      { next: { revalidate: 60, tags: ['articles'] } }
    )

    if (doc) return mapSanityArticle(doc)

    // Fallback to seed only when Sanity has zero published articles yet
    const totalCount = await client.fetch<number>(
      `count(*[_type == "article" && defined(slug.current)])`,
      {},
      { next: { revalidate: 60, tags: ['articles'] } }
    )
    if (totalCount === 0) {
      return INSIGHTS_SEED.find((a) => a.slug === slug) ?? null
    }
    return null
  } catch (err) {
    console.warn('[Sanity Fetch Warning: article detail] Fallback to seed data due to:', err instanceof Error ? err.message : err)
    return INSIGHTS_SEED.find((a) => a.slug === slug) ?? null
  }
}
