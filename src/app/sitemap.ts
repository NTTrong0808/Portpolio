import type { MetadataRoute } from 'next'
import { getPublishedWork } from '@/lib/content'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trongngo.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
  ]

  const workRoutes: MetadataRoute.Sitemap = getPublishedWork().map((item) => ({
    url: `${BASE_URL}/work/${item.slug}`,
    lastModified: new Date(),
    priority: 0.9,
  }))

  return [...staticRoutes, ...workRoutes]
}
