import Link from 'next/link'

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="max-w-5xl mx-auto px-6 py-24 border-t border-border/50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs text-fg-muted uppercase tracking-widest mb-2">About me</p>
          <h2 id="about-heading" className="text-3xl font-bold text-fg mb-4">
            Trong Ngo
          </h2>
          <p className="text-fg-muted leading-relaxed mb-6">
            Frontend engineer with a passion for crafting interactive, accessible digital
            experiences. I work across the full stack but live at the intersection of design and
            code.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors"
          >
            More about me →
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: 'Focus', value: 'Next.js · React · TypeScript · Tailwind' },
            { label: 'Location', value: 'Vietnam 🇻🇳' },
            { label: 'Available for', value: 'Freelance & full-time' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface"
            >
              <span className="text-xs text-fg-muted w-20 shrink-0">{label}</span>
              <span className="text-sm text-fg">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
