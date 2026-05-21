import Link from 'next/link'
import { PageShell } from '@/components/templates/PageShell'

export default function NotFound() {
  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24 text-center">
        <pre
          className="text-accent/70 text-[11px] sm:text-sm mb-8 leading-tight font-mono select-none inline-block text-left"
          aria-hidden="true"
        >{`
██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═████╗██║  ██║
███████║██║██╔██║███████║
╚════██║████╔╝██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝
`}</pre>

        <h1 className="text-4xl font-bold text-fg mb-4">Page not found</h1>
        <p className="text-fg-muted mb-2">
          This page doesn&apos;t exist — or it moved somewhere else.
        </p>
        <p className="text-fg-muted mb-8">
          <a href="mailto:hello@trongngo.dev" className="text-accent hover:underline">
            Report a broken link
          </a>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            ← Back home
          </Link>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-fg-muted text-sm font-medium hover:border-accent/40 hover:text-fg transition-colors"
          >
            View work
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
