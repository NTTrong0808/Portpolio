import { PageShell } from '@/components/templates/PageShell'
import { Hero } from '@/components/molecules/Hero'
import { WorkGrid } from '@/components/organisms/WorkGrid'
import { AboutSection } from '@/components/organisms/AboutSection'
import { getPublishedWork } from '@/lib/content'

export default async function HomePage() {
  let workItems: {
    slug: string
    title: string
    description: string
    role: string
    year: number
    tags: string[]
    cover?: string
    status: string
  }[] = []

  try {
    const items = getPublishedWork()
    workItems = items.map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description,
      role: item.role,
      year: item.year,
      tags: item.tags,
      cover: item.cover?.src,
      status: item.status,
    }))
  } catch {
    // Velite not yet built; items will be empty
  }

  return (
    <PageShell>
      <Hero />
      <WorkGrid items={workItems} />
      <AboutSection />
    </PageShell>
  )
}
