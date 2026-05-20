'use client'

import { useEffect, useRef } from 'react'
import { createParticleField } from '@/lib/hero/particle-field'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !canvasRef.current) return
    const accentColor =
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6366f1'
    const field = createParticleField(canvasRef.current, accentColor)
    field.start()
    return () => field.stop()
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
