'use client'

import { useRef, useEffect } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'
import { TextReveal } from '@/components/atoms/TextReveal'

interface ChapterProps {
  title?: string
  children: React.ReactNode
}

export function Chapter({ title, children }: ChapterProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current || !bodyRef.current) return

    const section = sectionRef.current
    const body = bodyRef.current
    const triggers: import('gsap/ScrollTrigger').ScrollTrigger[] = []
    let cancelled = false

    import('@/lib/animations/gsap').then(({ loadGSAP }) =>
      loadGSAP().then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return

        gsap.set(body, { opacity: 0, y: 24 })

        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              gsap.to(body, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
              })
            },
          }),
        )

        // Parallax on any inline images inside chapter
        const images = section.querySelectorAll<HTMLElement>('img')
        images.forEach((img) => {
          triggers.push(
            ScrollTrigger.create({
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              onUpdate: (self) => {
                gsap.set(img, { y: self.progress * -30 })
              },
            }),
          )
        })
      }),
    )

    return () => {
      cancelled = true
      triggers.forEach((t) => t.kill())
    }
  }, [reduced])

  return (
    <section ref={sectionRef} className="mb-16">
      {title && (
        <TextReveal
          text={title}
          as="h2"
          className="text-2xl font-bold text-fg mb-6 pb-2 border-b border-border"
          stagger={0.04}
        />
      )}
      {/* opacity:0 set via inline style before GSAP loads to prevent FOUC */}
      <div
        ref={bodyRef}
        className="prose-content"
        style={reduced ? undefined : { opacity: 0 }}
      >
        {children}
      </div>
    </section>
  )
}
