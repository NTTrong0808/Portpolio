import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trongngo.dev'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
  ]

  let workRoutes: MetadataRoute.Sitemap = []
  try {
    const { getPublishedWork } = await import('@/lib/content')
    const items = getPublishedWork()
    workRoutes = items.map((item) => ({
      url: `${BASE_URL}/work/${item.slug}`,
      lastModified: new Date(),
      priority: 0.9,
    }))
  } catch {
    // Velite not built yet
  }

  return [...staticRoutes, ...workRoutes]
}
