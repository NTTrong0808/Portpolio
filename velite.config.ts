import { defineConfig, defineCollection, s } from 'velite'

const work = defineCollection({
  name: 'Work',
  pattern: 'content/work/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('work'),
      title: s.string().min(1),
      description: s.string().min(1),
      role: s.string(),
      year: s.number().int(),
      tags: s.array(s.string()).default([]),
      cover: s.image().optional(),
      status: s.enum(['published', 'draft', 'confidential']).default('published'),
      featured: s.boolean().default(false),
      order: s.number().int().default(0),
      // `client` must NOT be present when status is confidential — enforced by refine below
      client: s.string().optional(),
      content: s.raw(),
    })
    .refine((data) => !(data.status === 'confidential' && data.client !== undefined), {
      message: '`client` field is forbidden when status is confidential',
      path: ['client'],
    }),
})

const about = defineCollection({
  name: 'About',
  pattern: 'content/about.mdx',
  single: true,
  schema: s.object({
    content: s.raw(),
  }),
})

export default defineConfig({
  root: '.',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:8].[ext]',
    clean: true,
  },
  collections: { work, about },
})
