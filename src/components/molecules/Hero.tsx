import Link from 'next/link'
import { HeroCanvas } from './HeroCanvas'
import { GrainOverlay } from '@/components/atoms/GrainOverlay'

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Mesh gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 20% 20%, var(--mesh-1) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 80%, var(--mesh-2) 0%, transparent 60%),
            radial-gradient(ellipse 70% 70% at 50% 110%, var(--mesh-3) 0%, transparent 60%),
            var(--bg)
          `,
          opacity: 0.6,
        }}
      />

      <GrainOverlay />
      <HeroCanvas />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-sm text-fg-muted mb-4 tracking-widest uppercase">Frontend Engineer</p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-fg">
          Crafting{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--accent), var(--mesh-2))',
            }}
          >
            digital
          </span>
          <br />
          experiences
        </h1>
        <p className="text-lg text-fg-muted mb-10 max-w-xl mx-auto">
          I build interactive, performant interfaces with a focus on craft and detail. Based in
          Vietnam, working globally.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-medium rounded-md px-5 py-2.5 text-sm bg-surface-raised text-fg border border-border hover:border-accent/50 transition-colors"
          >
            View Work
          </Link>
          <Link
            href="/about"
            className="text-sm text-fg-muted hover:text-fg transition-colors underline-offset-4 hover:underline"
          >
            About me →
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-fg-muted/60 tracking-wider">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-fg-muted/40 to-transparent" />
      </div>
    </section>
  )
}
