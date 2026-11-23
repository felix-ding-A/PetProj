import { defineField, defineType } from 'sanity'
import { seoFields, validateSlug } from './validation'

export const pageType = defineType({
  name: 'page',
  title: 'Core Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: validateSlug,
    }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3 }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sectionBlock',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredDocuments',
      title: 'Attached Company PDFs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'companyDocument' }] }],
    }),
    ...seoFields.map((f) => defineField(f)),
  ],
})

