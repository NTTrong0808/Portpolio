import { track } from '@vercel/analytics'
import { Theme } from '@/lib/theme/provider'

export function trackThemeChanged(theme: Theme, source: 'picker' | 'command-palette') {
  track('theme_changed', { theme, source })
}
