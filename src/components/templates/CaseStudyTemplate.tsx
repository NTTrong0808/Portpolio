import Image from 'next/image'
import Link from 'next/link'
import { MDXContent } from '@/components/mdx/MDXContent'

interface Project {
  slug: string
  title: string
  description: string
  role: string
  year: number
  tags: string[]
  cover?: string
  content: string
}

export function CaseStudyTemplate({ project }: { project: Project }) {
  return (
    <article className="min-h-screen pt-16">
      {/* Hero — view transition name matches ProjectCard for same-name morph */}
      <div
        className="relative h-[50vh] min-h-[320px] overflow-hidden"
        style={{ viewTransitionName: `project-card-image-${project.slug}` }}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="w-full h-full"
            aria-hidden="true"
            style={{
              background: `radial-gradient(ellipse at 20% 50%, var(--mesh-1) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, var(--mesh-2) 0%, transparent 60%), var(--bg)`,
              opacity: 0.7,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10">
        {/* Meta */}
        <div className="mb-10">
          <Link
            href="/#work"
            className="text-sm text-fg-muted hover:text-fg transition-colors mb-6 inline-block"
          >
            ← Back to work
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-fg mb-4">{project.title}</h1>
          <p className="text-lg text-fg-muted mb-4">{project.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-fg-muted">
            <span>{project.role}</span>
            <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
            <span>{project.year}</span>
          </div>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full border border-border text-fg-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* MDX body */}
        <div className="prose-custom">
          <MDXContent source={project.content} />
        </div>

        {/* Footer nav */}
        <div className="mt-20 pt-8 border-t border-border">
          <Link href="/#work" className="text-sm text-fg-muted hover:text-fg transition-colors">
            ← All projects
          </Link>
        </div>
      </div>
    </article>
  )
}
