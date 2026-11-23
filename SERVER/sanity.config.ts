import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'novapetnutra-studio',
  title: 'NovaPet Nutra OEM/ODM CMS',
  projectId: 'r4jusytk',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
