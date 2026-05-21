'use client'

import { createContext, useContext, useState, useCallback } from 'react'

export type Theme = 'default' | 'midnight' | 'sunset' | 'terminal' | 'paper' | 'cyberpunk' | 'mono'

const THEMES: Theme[] = ['default', 'midnight', 'sunset', 'terminal', 'paper', 'cyberpunk', 'mono']
const STORAGE_KEY = 'portpolio-theme'
const DEFAULT_THEME: Theme = 'default'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored && THEMES.includes(stored)) return stored
  } catch {}
  return DEFAULT_THEME
}

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  themes: THEMES,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
