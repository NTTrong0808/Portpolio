import Link from 'next/link'
import { PageShell } from '@/components/templates/PageShell'

export default function NotFound() {
  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24 text-center">
        <pre
          className="text-accent/60 text-xs mb-8 leading-tight font-mono select-none"
          aria-hidden="true"
        >{`
 _  _    ___  _  _
| || |  / _ \\| || |
| || |_| | | | || |_
|__   _| |_| |__   _|
   |_|  \\___/   |_|
        `}</pre>
        <h1 className="text-4xl font-bold text-fg mb-4">Page not found</h1>
        <p className="text-fg-muted mb-8">
          This page doesn&apos;t exist — or it moved.{' '}
          <a href="mailto:hello@trongngo.dev" className="text-accent hover:underline">
            Report a broken link
          </a>
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          ← Back home
        </Link>
      </div>
    </PageShell>
  )
}
