import { defineField, defineType } from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Facility, Packaging & Certification Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Photo Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Gallery Section',
      type: 'string',
      initialValue: 'facility',
      options: {
        list: [
          { title: 'Facility & Production Lines', value: 'facility' },
          { title: 'Packaging & Finished Samples', value: 'packaging' },
          { title: 'Certifications & Audits', value: 'certification' },
          { title: 'QC & Testing Laboratory', value: 'lab' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'dosageForm',
      title: 'Related Dosage Form (Optional)',
      type: 'string',
      description: 'Tag to display this photo on a specific dosage form manufacturing page.',
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
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Short Technical Caption',
      type: 'string',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order (lower shows first)',
      type: 'number',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})

