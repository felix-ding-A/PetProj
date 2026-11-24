import imageUrlBuilder from '@sanity/image-url'
import { sanityDataset, sanityProjectId } from './client'

const builder =
  sanityProjectId && sanityDataset
    ? imageUrlBuilder({ projectId: sanityProjectId, dataset: sanityDataset })
    : null

export function urlForImage(
  source: unknown,
  options?: { width?: number; quality?: number }
): string | null {
  if (!builder || !source) return null
  try {
    return builder
      .image(source as Parameters<typeof builder.image>[0])
      .auto('format')
      .fit('max')
      .width(options?.width ?? 1400)
      .quality(options?.quality ?? 80)
      .url()
  } catch {
    return null
  }
}

export function getSanityFileUrl(assetRef?: string, downloadName?: string): string | null {
  if (!assetRef || !sanityProjectId || !sanityDataset) return null
  const parts = assetRef.split('-')
  if (parts.length < 3 || parts[0] !== 'file') return null
  const ext = parts.pop()
  const id = parts.slice(1).join('-')
  const base = `https://cdn.sanity.io/files/${sanityProjectId}/${sanityDataset}/${id}.${ext}`
  return downloadName ? `${base}?dl=${encodeURIComponent(downloadName)}` : base
}
