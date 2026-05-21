'use client'

import { NavLink as Link } from '@/components/atoms/Link'
import Image from 'next/image'
import { useRef, MouseEvent } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  role: string
  year: number
  tags: string[]
  cover?: string
  priority?: boolean
}

export function ProjectCard({
  slug,
  title,
  description,
  role,
  year,
  tags,
  cover,
  priority = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(4px)`
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: reduced ? 'none' : 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      <Link
        href={`/work/${slug}`}
        className="group block rounded-2xl border border-border bg-surface hover:border-accent/40 transition-colors overflow-hidden"
      >
        {/* Cover image */}
        <div
          className="relative aspect-[16/9] bg-surface-raised overflow-hidden"
          style={{ viewTransitionName: `project-card-image-${slug}` }}
        >
          {cover ? (
            <Image
              src={cover}
              alt={`${title} cover`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="w-full h-full"
              aria-hidden="true"
              style={{
                background: `radial-gradient(ellipse at 30% 40%, var(--mesh-1) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, var(--mesh-2) 0%, transparent 60%), var(--surface-raised)`,
                opacity: 0.8,
              }}
            />
          )}
        </div>

        {/* Card body */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-semibold text-fg group-hover:text-accent transition-colors">
              {title}
            </h3>
            <span className="text-xs text-fg-muted ml-2 shrink-0">{year}</span>
          </div>

          <p className="text-xs text-fg-muted mb-1">{role}</p>
          <p className="text-sm text-fg-muted line-clamp-2 mb-4">{description}</p>

          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full border border-border text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}
