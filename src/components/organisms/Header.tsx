import Link from 'next/link'
import { ThemePicker } from '@/components/molecules/ThemePicker'

const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/about', label: 'About' },
]

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 h-16 border-b border-border/50 bg-bg/80 backdrop-blur-md"
      style={{ viewTransitionName: 'site-header' }}
    >
      <Link
        href="/"
        className="text-fg font-semibold tracking-tight hover:text-accent transition-colors"
        aria-label="Trong Ngo — Home"
      >
        TN
      </Link>

      <nav aria-label="primary" className="flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-fg-muted hover:text-fg transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-xs text-fg-muted/60 border border-border/60 rounded px-1.5 py-0.5">
          ⌘K
        </span>
        <ThemePicker />
      </div>
    </header>
  )
}
