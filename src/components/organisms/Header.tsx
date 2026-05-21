'use client'

import { useState } from 'react'
import { ThemePicker } from '@/components/molecules/ThemePicker'
import { CommandPalette } from '@/components/molecules/CommandPalette'
import { NavLink } from '@/components/atoms/Link'

const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 h-16 border-b border-border/50 bg-bg/80 backdrop-blur-md"
        style={{ viewTransitionName: 'site-header' }}
      >
        <NavLink
          href="/"
          className="text-fg font-semibold tracking-tight hover:text-accent transition-colors"
          aria-label="Trong Ngo — Home"
        >
          TN
        </NavLink>

        <nav aria-label="primary" className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted hover:text-fg transition-colors"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop ⌘K hint */}
          <button
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            className="hidden sm:flex items-center gap-1 text-xs text-fg-muted/60 border border-border/60 rounded px-1.5 py-0.5 hover:border-border hover:text-fg-muted transition-colors"
          >
            ⌘K
          </button>

          {/* Mobile icon trigger */}
          <button
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            className="flex sm:hidden w-8 h-8 items-center justify-center rounded-lg border border-border/60 hover:border-border transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="text-fg-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <ThemePicker />
        </div>
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  )
}
