'use client'

import { useRef, useEffect } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'

interface TextRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p'
  className?: string
  stagger?: number
  delay?: number
}

export function TextReveal({
  text,
  as: Tag = 'h2',
  className,
  stagger = 0.04,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return

    const el = ref.current
    const chars = el.querySelectorAll<HTMLSpanElement>('[data-char]')
    if (!chars.length) return

    let cancelled = false
    let trigger: import('gsap/ScrollTrigger').ScrollTrigger | null = null

    import('@/lib/animations/gsap').then(({ loadGSAP }) =>
      loadGSAP().then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return

        gsap.set(chars, { opacity: 0, y: 12 })

        trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(chars, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: Math.min(stagger, 0.05),
              delay,
              ease: 'power2.out',
            })
          },
        })
      }),
    )

    return () => {
      cancelled = true
      trigger?.kill()
    }
  }, [reduced, stagger, delay])

  if (reduced) {
    return (
      <Tag ref={ref as React.RefObject<never>} className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag ref={ref as React.RefObject<never>} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} data-char aria-hidden="true" style={{ display: 'inline-block' }}>
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </Tag>
  )
}
