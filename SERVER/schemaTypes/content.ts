import { defineField, defineType } from 'sanity'
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
})

export const articleType = defineType({
  name: 'article',
  title: 'Insights Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Article Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: validateSlug }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'author', title: 'Author Name', type: 'string', initialValue: 'Pawsome Labs R&D Team' }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'relatedForms',
      title: 'Related Dosage Forms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dosageForm' }] }],
    }),
    ...seoFields.map((f) => defineField(f)),
  ],
})

