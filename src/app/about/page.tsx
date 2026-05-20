import type { Metadata } from 'next'
import { PageShell } from '@/components/templates/PageShell'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Trong Ngo — Frontend engineer based in Vietnam.',
}

export default function AboutPage() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <p className="text-xs text-fg-muted uppercase tracking-widest mb-2">About</p>
        <h1 className="text-4xl font-bold text-fg mb-8">Trong Ngo</h1>

        <div className="prose-custom space-y-6">
          <p className="text-lg text-fg-muted leading-relaxed">
            I&apos;m a frontend engineer specializing in crafting performant, accessible, and
            visually compelling digital experiences. My work lives at the intersection of
            engineering and design.
          </p>

          <p className="text-fg-muted leading-relaxed">
            Currently building products with Next.js, TypeScript, and Tailwind CSS. I care deeply
            about performance, accessibility, and the small details that make experiences feel
            intentional.
          </p>

          <p className="text-fg-muted leading-relaxed">
            When I&apos;m not shipping code, I&apos;m exploring generative art, studying animation
            principles, or contributing to open source. Based in Vietnam, collaborating globally.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Stack', value: 'Next.js · TypeScript · Tailwind · Framer Motion' },
              { label: 'Interests', value: 'Web performance · A11y · Creative coding' },
              { label: 'Location', value: 'Vietnam 🇻🇳' },
              { label: 'Languages', value: 'Vietnamese · English' },
            ].map(({ label, value }) => (
              <div key={label} className="p-4 rounded-xl border border-border bg-surface">
                <p className="text-xs text-fg-muted mb-1">{label}</p>
                <p className="text-sm text-fg">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
