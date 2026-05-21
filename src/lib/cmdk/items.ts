import { Theme } from '@/lib/theme/provider'

export interface CommandItem {
  id: string
  label: string
  group: 'pages' | 'themes' | 'actions'
  keywords?: string[]
  href?: string
  theme?: Theme
  action?: () => void
}

export const PAGE_ITEMS: CommandItem[] = [
  { id: 'home', label: 'Home', group: 'pages', href: '/', keywords: ['start', 'index'] },
  { id: 'work', label: 'Work', group: 'pages', href: '/#work', keywords: ['projects', 'portfolio', 'case studies'] },
  { id: 'about', label: 'About', group: 'pages', href: '/about', keywords: ['me', 'bio', 'resume'] },
]

export const THEME_ITEMS: CommandItem[] = [
  { id: 'theme-default', label: 'Default', group: 'themes', theme: 'default', keywords: ['dark', 'indigo'] },
  { id: 'theme-midnight', label: 'Midnight', group: 'themes', theme: 'midnight', keywords: ['dark', 'blue', 'night'] },
  { id: 'theme-sunset', label: 'Sunset', group: 'themes', theme: 'sunset', keywords: ['warm', 'orange', 'red'] },
  { id: 'theme-terminal', label: 'Terminal', group: 'themes', theme: 'terminal', keywords: ['green', 'matrix', 'hacker'] },
  { id: 'theme-paper', label: 'Paper', group: 'themes', theme: 'paper', keywords: ['light', 'white', 'minimal'] },
  { id: 'theme-cyberpunk', label: 'Cyberpunk', group: 'themes', theme: 'cyberpunk', keywords: ['neon', 'magenta', 'electric'] },
  { id: 'theme-mono', label: 'Mono', group: 'themes', theme: 'mono', keywords: ['grayscale', 'black', 'white'] },
]

export const ALL_COMMAND_ITEMS: CommandItem[] = [...PAGE_ITEMS, ...THEME_ITEMS]
