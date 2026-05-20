'use client'

import { Theme } from '@/lib/theme/provider'

const THEME_COLORS: Record<Theme, { bg: string; accent: string; label: string }> = {
  default: { bg: '#0a0a0f', accent: '#6366f1', label: 'Default' },
  midnight: { bg: '#050510', accent: '#3b82f6', label: 'Midnight' },
  sunset: { bg: '#0f0806', accent: '#f97316', label: 'Sunset' },
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
