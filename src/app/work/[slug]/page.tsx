import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageShell } from '@/components/templates/PageShell'
import { CaseStudyTemplate } from '@/components/templates/CaseStudyTemplate'
import { getWorkBySlug, getPublishedWork } from '@/lib/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const items = getPublishedWork()
  return items.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getWorkBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params
  const raw = getWorkBySlug(slug)
  if (!raw) notFound()

  // Normalize Velite Image to string src
  const project = {
    ...raw,
    cover: raw.cover?.src,
  }

  return (
    <PageShell>
      <CaseStudyTemplate project={project} />
    </PageShell>
  )
}
