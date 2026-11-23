import { defineField, defineType } from 'sanity'
import { seoFields, validateSlug } from './validation'

export const dosageFormType = defineType({
  name: 'dosageForm',
  title: 'Dosage Form (Manufacturing)',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Dosage Form Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Manufacturing Route Slug',
      type: 'slug',
      description: 'e.g. chewable-tablet-manufacturing',
      options: { source: 'name' },
      validation: validateSlug,
    }),
    defineField({
      name: 'shortSlug',
      title: 'Catalog Short Slug',
      type: 'string',
      description: 'e.g. chewable-tablet, capsule, powder, drops, paste',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'tagline', title: 'One-Line Capability Tagline', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({ name: 'moq', title: 'Standard MOQ', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'leadTime', title: 'Typical Lead Time', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'whyChoosePoints',
      title: 'Why Choose Us (Technical Selling Points)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'customizationOptions',
      title: 'Customization Capabilities (Shells / Shapes / Coatings / Flavors)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Option Label', type: 'string' }),
            defineField({ name: 'details', title: 'Technical Options', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'processSteps',
      title: '5-Step Manufacturing Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'string' }),
            defineField({ name: 'title', title: 'Step Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'specs',
      title: 'Specification Table',
      type: 'object',
      fields: [
        defineField({ name: 'materials', title: 'Materials / Carriers', type: 'string' }),
        defineField({ name: 'formats', title: 'Formats / Packaging', type: 'string' }),
        defineField({ name: 'moq', title: 'MOQ', type: 'string' }),
        defineField({ name: 'shelfLife', title: 'Typical Shelf Life', type: 'string' }),
      ],
    }),
    defineField({
      name: 'brochurePdf',
      title: 'Dosage Form Spec Sheet PDF',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'faqs',
      title: 'Form-Specific FAQs (6 recommended)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    ...seoFields.map((f) => defineField(f)),
  ],
})

