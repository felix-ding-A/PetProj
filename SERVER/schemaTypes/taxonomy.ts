import { defineField, defineType } from 'sanity'
import { seoFields, validateSlug } from './validation'

export const ingredientType = defineType({
  name: 'ingredient',
  title: 'Ingredient Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Ingredient Category Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: validateSlug }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'examples', title: 'Representative Actives', type: 'array', of: [{ type: 'string' }] }),
    ...seoFields.map((f) => defineField(f)),
  ],
})

export const effectType = defineType({
  name: 'effect',
  title: 'Pet Health Effect',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Effect Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: validateSlug }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'keyActives', title: 'Common Formulated Actives', type: 'array', of: [{ type: 'string' }] }),
    ...seoFields.map((f) => defineField(f)),
  ],
})

export const petType = defineType({
  name: 'pet',
  title: 'Target Pet Species',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Species Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: validateSlug }),
    defineField({ name: 'description', title: 'Formulation Focus', type: 'text', rows: 3 }),
    ...seoFields.map((f) => defineField(f)),
  ],
})

