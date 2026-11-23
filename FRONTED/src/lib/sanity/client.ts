import { createClient, type SanityClient } from 'next-sanity'

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-11-23'

export function isProductionWithoutSanity(): boolean {
  return process.env.NODE_ENV === 'production' && !sanityProjectId
}

export function isUsingDevSeed(): boolean {
  if (isProductionWithoutSanity()) {
    throw new Error(
      'NEXT_PUBLIC_SANITY_PROJECT_ID is required in production. Refusing to silently serve dev seed data.'
    )
  }
  return process.env.NODE_ENV !== 'production' && !sanityProjectId
}

let cachedClient: SanityClient | null = null

export function getSanityClient(): SanityClient | null {
  if (isUsingDevSeed()) return null
  if (!cachedClient) {
    cachedClient = createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
    })
  }
  return cachedClient
}

