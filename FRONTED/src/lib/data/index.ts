import { getSanityClient, isUsingDevSeed } from '@/lib/sanity/client'
import { getSanityFileUrl } from '@/lib/sanity/media'
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

export async function getDosageForms(): Promise<DosageFormData[]> {
  const client = getSanityClient()
  if (!client) return DOSAGE_FORMS_SEED

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
}

export async function getGlobalFaqs(): Promise<FAQItem[]> {
  return GLOBAL_FAQS_SEED
}

export async function getInsights(): Promise<InsightArticleData[]> {
  const client = getSanityClient()
  if (!client) return INSIGHTS_SEED

  const docs = await client.fetch<InsightArticleData[]>(
    `*[_type == "article"] | order(publishedAt desc){
      title,
      "slug": slug.current,
      category,
      excerpt,
      publishedAt,
      author,
      metaTitle,
      metaDescription
    }`,
    {},
    { next: { revalidate: 60, tags: ['articles'] } }
  )

  if (!docs || docs.length === 0) return INSIGHTS_SEED
  return docs.map((d) => {
    const fallback = INSIGHTS_SEED.find((s) => s.slug === d.slug) ?? INSIGHTS_SEED[0]
    return { ...fallback, ...d }
  })
}

export async function getInsightBySlug(slug: string): Promise<InsightArticleData | null> {
  const all = await getInsights()
  return all.find((a) => a.slug === slug) ?? null
}

