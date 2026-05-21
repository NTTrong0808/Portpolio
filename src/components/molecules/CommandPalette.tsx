'use client'

import { useEffect, useCallback, useRef } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/lib/theme/provider'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'
import { PAGE_ITEMS, THEME_ITEMS, CommandItem } from '@/lib/cmdk/items'
import { trackThemeChanged } from '@/lib/analytics'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const THEME_SWATCH_COLORS: Record<string, { bg: string; accent: string }> = {
  default: { bg: '#0a0a0f', accent: '#6366f1' },
  midnight: { bg: '#050510', accent: '#3b82f6' },
  sunset: { bg: '#0f0806', accent: '#f97316' },
  terminal: { bg: '#030d03', accent: '#00ff41' },
  paper: { bg: '#f5f0e8', accent: '#c0392b' },
  cyberpunk: { bg: '#060010', accent: '#ff007f' },
  mono: { bg: '#0d0d0d', accent: '#c0c0c0' },
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const reduced = usePrefersReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)

  const close = useCallback(() => onOpenChange(false), [onOpenChange])

  const runItem = useCallback(
    (item: CommandItem) => {
      if (item.theme) {
        const applyTheme = () => {
          setTheme(item.theme!)
          trackThemeChanged(item.theme!, 'command-palette')
        }
        if (!reduced && document.startViewTransition) {
          document.startViewTransition(applyTheme)
        } else {
          applyTheme()
        }
      } else if (item.href) {
        router.push(item.href)
      }
      close()
    },
    [setTheme, router, close, reduced],
  )

  // Global keyboard shortcut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === 'Escape' && open) {
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onOpenChange, close])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg mx-4">
        <Command
          className="rounded-xl border border-border bg-surface-raised shadow-2xl overflow-hidden"
          shouldFilter={true}
        >
          <Command.Input
            ref={inputRef}
            placeholder="Search pages, themes…"
            className="w-full px-4 py-3.5 text-sm text-fg bg-transparent border-b border-border placeholder:text-fg-muted outline-none"
          />

          <Command.List className="max-h-72 overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-fg-muted">
              No results found.
            </Command.Empty>

            <Command.Group
              heading="Pages"
              className="[&>[cmdk-group-heading]]:px-2 [&>[cmdk-group-heading]]:py-1.5 [&>[cmdk-group-heading]]:text-xs [&>[cmdk-group-heading]]:text-fg-muted [&>[cmdk-group-heading]]:font-medium"
            >
              {PAGE_ITEMS.map((item) => (
                <Command.Item
                  key={item.id}
                  value={[item.label, ...(item.keywords ?? [])].join(' ')}
                  onSelect={() => runItem(item)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm text-fg aria-selected:bg-surface aria-selected:text-accent transition-colors"
                >
                  <span className="text-fg-muted">↗</span>
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Themes"
              className="mt-1 [&>[cmdk-group-heading]]:px-2 [&>[cmdk-group-heading]]:py-1.5 [&>[cmdk-group-heading]]:text-xs [&>[cmdk-group-heading]]:text-fg-muted [&>[cmdk-group-heading]]:font-medium"
            >
              {THEME_ITEMS.map((item) => {
                const colors = THEME_SWATCH_COLORS[item.theme!]
                const isActive = theme === item.theme
                return (
                  <Command.Item
                    key={item.id}
                    value={[item.label, ...(item.keywords ?? [])].join(' ')}
                    onSelect={() => runItem(item)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm text-fg aria-selected:bg-surface aria-selected:text-accent transition-colors"
                  >
                    <span
                      className="relative w-6 h-6 rounded flex-shrink-0 border border-border/60"
                      style={{ background: colors.bg }}
                      aria-hidden="true"
                    >
                      <span
                        className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full"
                        style={{ background: colors.accent }}
                      />
                    </span>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto text-xs text-fg-muted">active</span>
                    )}
                  </Command.Item>
                )
              })}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
