import { defineField, defineType } from 'sanity'
import { seoFields, validateSlug } from './validation'

export const productType = defineType({
  name: 'product',
  title: 'Private Label Product Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Category Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Product Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: validateSlug,
    }),
    defineField({
      name: 'status',
      title: 'Publishing Status',
      type: 'string',
      initialValue: 'active',
      options: {
        list: [
          { title: 'Active (Generates Route & Sitemap)', value: 'active' },
          { title: 'Planned (Zero-SKU — No Route Generated)', value: 'planned' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'form',
      title: 'Dosage Form',
      type: 'reference',
      to: [{ type: 'dosageForm' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'skuCount', title: 'Available Turnkey Formula Variants', type: 'number', initialValue: 1 }),
    defineField({ name: 'shortDescription', title: 'One-Sentence Efficacy & Active Summary', type: 'text', rows: 2 }),
    defineField({
      name: 'species',
      title: 'Target Species',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pet' }] }],
    }),
    defineField({
      name: 'effects',
      title: 'Health Benefits / Effects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'effect' }] }],
    }),
    defineField({
      name: 'keyIngredients',
      title: 'Key Active Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'packagingOptions',
      title: 'Packaging Options',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'moq', title: 'Pilot / Bulk MOQ', type: 'string' }),
    defineField({ name: 'leadTime', title: 'Lead Time', type: 'string' }),
    defineField({
      name: 'specSheetPdf',
      title: 'Optional Spec Sheet PDF',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    ...seoFields.map((f) => defineField(f)),
  ],
})

