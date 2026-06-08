'use client'

import useTheme from '../hooks/useTheme.js'

/**
 * Light/dark theme toggle. Sun icon when in dark mode (click to go light);
 * moon icon when in light mode (click to go dark). No border, transparent
 * background, matches the size of the nav text links.
 */
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={!isDark}
      className="inline-flex items-center justify-center w-8 h-8 rounded text-on-surface hover:text-primary transition-colors"
    >
      <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}

export default ThemeToggle
