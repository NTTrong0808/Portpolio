import type Lenis from 'lenis'

let instance: Lenis | null = null
// Pending bridge callback set by gsap.ts after ScrollTrigger loads
let pendingBridge: (() => void) | null = null

export function getLenis(): Lenis | null {
  return instance
}

export function setLenis(lenis: Lenis | null): void {
  instance = lenis
  // If GSAP beat Lenis to initialization, wire up the bridge now
  if (lenis && pendingBridge) {
    lenis.on('scroll', pendingBridge)
  }
}

/**
 * Called by gsap.ts after ScrollTrigger loads.
 * If Lenis already exists, connects immediately; otherwise stores for when Lenis is ready.
 */
export function setScrollBridge(fn: () => void): void {
  pendingBridge = fn
  if (instance) {
    instance.on('scroll', fn)
  }
}
