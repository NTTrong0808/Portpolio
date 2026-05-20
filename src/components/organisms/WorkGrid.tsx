import { ProjectCard } from '@/components/molecules/ProjectCard'

interface WorkItem {
  slug: string
  title: string
  description: string
  role: string
  year: number
  tags: string[]
  cover?: string
  status: string
}

interface WorkGridProps {
  items: WorkItem[]
}

export function WorkGrid({ items }: WorkGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-fg-muted">
        <p>No projects yet.</p>
      </div>
    )
  }

  return (
    <section id="work" aria-labelledby="work-heading" className="max-w-5xl mx-auto px-6 py-24">
      <div className="mb-12">
        <p className="text-xs text-fg-muted uppercase tracking-widest mb-2">Selected work</p>
        <h2 id="work-heading" className="text-3xl sm:text-4xl font-bold text-fg">
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <ProjectCard
            key={item.slug}
            slug={item.slug}
            title={item.title}
            description={item.description}
            role={item.role}
            year={item.year}
            tags={item.tags}
            cover={item.cover}
            priority={i === 0}
          />
        ))}
      </div>
    </section>
  )
}
