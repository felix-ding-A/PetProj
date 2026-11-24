import { defineField, defineType } from 'sanity'
import { MarkdownImageInput } from '../components/MarkdownImageInput'
import { seoFields, validateSlug } from './validation'

export const companyDocumentType = defineType({
  name: 'companyDocument',
  title: 'Company PDF Document (Public Download)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Document Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'Product Catalog', value: 'catalog' },
          { title: 'Facility & Capabilities Profile', value: 'facility' },
          { title: 'Sample COA & Quality Report', value: 'coa' },
          { title: 'Dosage Form Spec Sheet', value: 'spec-sheet' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'summary', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'updatedAt', title: 'Revision Date', type: 'date' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
})

export const articleType = defineType({
  name: 'article',
  title: 'Insights Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: validateSlug,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'Formulation Science',
      options: {
        list: [
          { title: 'Formulation Science', value: 'Formulation Science' },
          { title: 'Feline Nutrition', value: 'Feline Nutrition' },
          { title: 'Canine Nutrition', value: 'Canine Nutrition' },
          { title: 'Quality & Stability', value: 'Quality & Stability' },
          { title: 'Brand Growth', value: 'Brand Growth' },
          { title: 'Regulatory & Compliance', value: 'Regulatory & Compliance' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(260),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'NovaPet Nutra R&D Team',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (Optional, auto-calculated if blank)',
      type: 'string',
      description: 'e.g. "5 min read"',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text (SEO)',
          type: 'string',
          description: 'Describe the image for search engines and accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Article Body (Markdown + Image Upload)',
      type: 'text',
      description:
        'Write Markdown directly. Use "+ Upload Image", drag-and-drop, or paste (Ctrl+V) to upload images to Sanity CDN.',
      validation: (r) => r.required().min(10),
      components: {
        input: MarkdownImageInput,
      },
    }),
    defineField({
      name: 'relatedFormSlugs',
      title: 'Related Dosage Forms (Quick Select)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Chewable Tablets & Soft Chews', value: 'chewable-tablet' },
          { title: 'Pet Capsules', value: 'capsule' },
          { title: 'Meal Toppers & Powders', value: 'powder' },
          { title: 'Liquid Drops & Oils', value: 'drops' },
          { title: 'Nutritional Pastes & Gels', value: 'paste' },
        ],
      },
    }),
    defineField({
      name: 'relatedForms',
      title: 'Related Dosage Form References (Optional)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dosageForm' }] }],
    }),
    ...seoFields.map((f) => defineField(f)),
  ],
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      publishedAt: 'publishedAt',
      media: 'coverImage',
    },
    prepare({ title, category, publishedAt, media }) {
      const dateStr = publishedAt ? String(publishedAt).slice(0, 10) : 'Draft'
      return {
        title,
        subtitle: `${category || 'Insights'} · ${dateStr}`,
        media,
      }
    },
  },
})
