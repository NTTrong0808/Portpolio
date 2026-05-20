'use client'

import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.display = 'block'
    ring.style.display = 'block'

    let x = 0,
      y = 0
    let rx = 0,
      ry = 0

    const dotEl: HTMLDivElement = dot
    const ringEl: HTMLDivElement = ring

    function onMove(e: MouseEvent) {
      x = e.clientX
      y = e.clientY
      dotEl.style.transform = `translate3d(${x}px,${y}px,0)`
    }

    let raf: number
    function tick() {
      rx += (x - rx) * 0.12
      ry += (y - ry) * 0.12
      ringEl.style.transform = `translate3d(${rx}px,${ry}px,0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
      />
    </>
  )
}
