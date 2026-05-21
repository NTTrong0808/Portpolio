import type { gsap as GsapType } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import { getLenis } from './lenis'

interface GSAPModules {
  gsap: typeof GsapType
  ScrollTrigger: typeof ScrollTriggerType
}

let loaded: GSAPModules | null = null

export async function loadGSAP(): Promise<GSAPModules> {
  if (loaded) return loaded

  const [gsapMod, stMod] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])

  const gsap = gsapMod.default ?? (gsapMod as unknown as { default: typeof GsapType }).default
  const { ScrollTrigger } = stMod

  gsap.registerPlugin(ScrollTrigger)

  // Sync GSAP ticker with Lenis for smooth scroll integration
  const lenis = getLenis()
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time: number) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  loaded = { gsap, ScrollTrigger }
  return loaded
}

export function getLoadedGSAP(): GSAPModules | null {
  return loaded
}
