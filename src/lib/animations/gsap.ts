import type { gsap as GsapType } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import { setScrollBridge } from './lenis'

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

  // Bridge: ScrollTrigger updates on Lenis scroll events.
  // setScrollBridge handles both orderings (GSAP loads before/after Lenis).
  setScrollBridge(ScrollTrigger.update)
  gsap.ticker.lagSmoothing(0)

  loaded = { gsap, ScrollTrigger }
  return loaded
}

export function getLoadedGSAP(): GSAPModules | null {
  return loaded
}
