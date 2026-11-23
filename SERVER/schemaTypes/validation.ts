import type { SlugRule, StringRule, TextRule } from 'sanity'

export const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const validateSlug = (rule: SlugRule) =>
  rule.required().custom((val) => {
    const s = val?.current
    if (!s) return 'Slug is required'
    if (!SLUG_REGEX.test(s)) {
      return 'Slug must be lowercase letters, numbers, and hyphens only (no underscores, spaces, or special characters)'
    }
    return true
  })

export const seoFields = [
  {
    name: 'metaTitle',
    title: 'SEO Meta Title',
    type: 'string' as const,
    description: 'Hard limit: max 62 characters for Google SERP display.',
    validation: (rule: StringRule) =>
      rule.required().max(62).error('metaTitle must be 62 characters or fewer'),
  },
  {
    name: 'metaDescription',
    title: 'SEO Meta Description',
    type: 'text' as const,
    rows: 3,
    description: 'Hard limit: max 159 characters.',
    validation: (rule: TextRule) =>
      rule.required().max(159).error('metaDescription must be 159 characters or fewer'),
  },
]
