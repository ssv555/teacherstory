/**
 * Theme: light/dark mode.
 * Persisted in localStorage: `ts_theme_mode` → 'light' | 'dark'
 * Pre-paint flash prevention is in front/app.html.
 */

export const THEME_MODES = ['light', 'dark'] as const
export type ThemeMode = (typeof THEME_MODES)[number]

const MODE_STORAGE_KEY = 'ts_theme_mode'

/** Current active mode. Reads localStorage; falls back to system preference. */
export function getTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(MODE_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* private browsing */ }
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/** Toggle `html.dark` class and persist choice. */
export function setTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle('dark', mode === 'dark')
  try { localStorage.setItem(MODE_STORAGE_KEY, mode) } catch { /* private browsing */ }
}

/** Apply saved/system mode at app start. */
export function initTheme() {
  setTheme(getTheme())
}
