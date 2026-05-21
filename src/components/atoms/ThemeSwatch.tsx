'use client'

import { Theme } from '@/lib/theme/provider'

const THEME_COLORS: Record<Theme, { bg: string; accent: string; label: string }> = {
  default: { bg: '#0a0a0f', accent: '#6366f1', label: 'Default' },
  midnight: { bg: '#050510', accent: '#3b82f6', label: 'Midnight' },
  sunset: { bg: '#0f0806', accent: '#f97316', label: 'Sunset' },
  terminal: { bg: '#030d03', accent: '#00ff41', label: 'Terminal' },
  paper: { bg: '#f5f0e8', accent: '#c0392b', label: 'Paper' },
  cyberpunk: { bg: '#060010', accent: '#ff007f', label: 'Cyberpunk' },
  mono: { bg: '#0d0d0d', accent: '#c0c0c0', label: 'Mono' },
}

interface ThemeSwatchProps {
  theme: Theme
  active: boolean
  onSelect: (theme: Theme) => void
}

export function ThemeSwatch({ theme, active, onSelect }: ThemeSwatchProps) {
  const { bg, accent, label } = THEME_COLORS[theme]
  return (
    <button
      role="radio"
      aria-checked={active}
      aria-label={label}
      onClick={() => onSelect(theme)}
      className={`relative w-10 h-10 rounded-lg overflow-hidden border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        active ? 'border-accent scale-110' : 'border-border hover:border-fg-muted'
      }`}
      style={{ background: bg }}
    >
      <span
        className="absolute bottom-1.5 right-1.5 w-3 h-3 rounded-full"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </button>
  )
}
