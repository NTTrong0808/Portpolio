'use client'

import { useEffect } from 'react'
import { setLenis } from '@/lib/animations/lenis'

export function LenisInit() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let lenis: import('lenis').default | null = null
    let rafId: number | null = null

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      })

      setLenis(lenis)

      function raf(time: number) {
        lenis!.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (lenis) {
        lenis.destroy()
        setLenis(null)
      }
    }
  }, [])

  return null
}
