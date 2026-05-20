'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { startTransition } from 'react'
import { useTheme, Theme } from '@/lib/theme/provider'
import { ThemeSwatch } from '@/components/atoms/ThemeSwatch'
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion'

export function ThemePicker() {
  const { theme, setTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const reduced = usePrefersReducedMotion()

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    function onClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        close()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [open, close])

  // Keyboard navigation inside panel
  function onKeyDown(e: React.KeyboardEvent) {
    const swatches = panelRef.current?.querySelectorAll('[role="radio"]') as NodeListOf<HTMLElement>
    if (!swatches) return
    const idx = Array.from(swatches).findIndex((el) => el === document.activeElement)
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      swatches[(idx + 1) % swatches.length]?.focus()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      swatches[(idx - 1 + swatches.length) % swatches.length]?.focus()
    }
  }

  function handleSelect(t: Theme) {
    if (reduced) {
      setTheme(t)
    } else {
      startTransition(() => setTheme(t))
    }
    close()
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        aria-label="Change theme"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-accent/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span
          className="w-4 h-4 rounded-full"
          style={{ background: 'var(--accent)' }}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Theme picker"
          className="absolute right-0 top-10 z-50 p-3 rounded-xl border border-border bg-surface-raised shadow-lg"
          onKeyDown={onKeyDown}
        >
          <p className="text-xs text-fg-muted mb-2 px-1">Theme</p>
          <div role="radiogroup" aria-label="Select theme" className="flex gap-2">
            {themes.map((t) => (
              <ThemeSwatch key={t} theme={t} active={theme === t} onSelect={handleSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
