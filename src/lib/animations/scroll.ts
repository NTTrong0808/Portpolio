import { getLoadedGSAP } from './gsap'

export function killScrollTriggers(): void {
  const mods = getLoadedGSAP()
  if (!mods) return
  mods.ScrollTrigger.getAll().forEach((t) => t.kill())
}
