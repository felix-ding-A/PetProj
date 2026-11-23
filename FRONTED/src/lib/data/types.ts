export type DosageShortSlug = 'chewable-tablet' | 'capsule' | 'powder' | 'drops' | 'paste'

export interface FAQItem {
  question: string
  answer: string
}

export interface DosageFormData {
  name: string
  slug: string // e.g. chewable-tablet-manufacturing
  shortSlug: DosageShortSlug
  pastelBg: string
  tagline: string
  heroDescription: string
  moq: string
  leadTime: string
  skuSummary: string
  whyChoosePoints: { title: string; description: string }[]
  customizationOptions: { label: string; details: string }[]
  processSteps: { step: string; title: string; description: string }[]
  specs: {
    materials: string
    formats: string
    moq: string
    shelfLife: string
  }
  brochurePdfUrl?: string
  faqs: FAQItem[]
  metaTitle: string
  metaDescription: string
}

export interface ProductCategoryData {
  name: string
  slug: string
  status: 'active' | 'planned'
  form: DosageShortSlug
  skuCount: number
  shortDescription: string
  species: ('dogs' | 'cats' | 'small-pets')[]
  effects: string[]
  keyIngredients: string[]
  packagingOptions: string[]
  moq: string
  leadTime: string
  metaTitle: string
  metaDescription: string
}

export interface PetSpeciesData {
  name: string
  slug: 'dogs' | 'cats' | 'small-pets'
  pastelBg: string
  tagline: string
  description: string
  formulationNotes: string[]
  metaTitle: string
  metaDescription: string
}

export interface PetEffectData {
  name: string
  slug: string
  description: string
  keyActives: string[]
  metaTitle: string
  metaDescription: string
}

export interface IngredientCategoryData {
  name: string
  slug: string
  description: string
  examples: string[]
  metaTitle: string
  metaDescription: string
}

export interface CompanyDocumentData {
  id: string
  title: string
  category: 'catalog' | 'facility' | 'coa' | 'spec-sheet'
  summary: string
  updatedAt: string
  pdfUrl: string | null
  fileSizeLabel: string
}

export interface InsightArticleData {
  title: string
  slug: string
  category: string
  excerpt: string
  publishedAt: string
  author: string
  readTime: string
  relatedForms: DosageShortSlug[]
  sections: { heading: string; paragraphs: string[] }[]
  metaTitle: string
  metaDescription: string
}

