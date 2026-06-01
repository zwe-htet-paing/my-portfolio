import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'theme'
const DARK = 'dark'
const LIGHT = 'light'

/**
 * Theme toggle — `dark` is the default. Persists to localStorage.
 *
 * The actual `class="dark"` / `class="light"` is applied to <html> by the
 * inline boot script in index.html BEFORE React mounts, so users never
 * see a flash of unstyled/wrong-theme content. This hook just reads the
 * already-applied class on mount and exposes a `toggleTheme` callback.
 */
function getInitialTheme() {
  if (typeof document === 'undefined') return DARK
  if (document.documentElement.classList.contains('light')) return LIGHT
  return DARK
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  // Apply theme + persist whenever it changes.
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove(DARK, LIGHT)
    root.classList.add(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage unavailable (private mode, etc.) — non-fatal.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === DARK ? LIGHT : DARK))
  }, [])

  return { theme, toggleTheme, isDark: theme === DARK }
}

export default useTheme
