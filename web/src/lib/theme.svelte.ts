export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'siku_banking:theme'
const DEFAULT_THEME: Theme = 'dark'

const isTheme = (value: unknown): value is Theme => value === 'dark' || value === 'light'

/** In the browser the last theme picked is kept; in the game the default applies until the game says otherwise. */
const initialTheme = (): Theme => {
  if (!import.meta.env.DEV) {
    return DEFAULT_THEME
  }

  const fromUrl = new URLSearchParams(window.location.search).get('theme')

  if (isTheme(fromUrl)) {
    return fromUrl
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)

  return isTheme(stored) ? stored : DEFAULT_THEME
}

const apply = (value: Theme): void => {
  document.documentElement.dataset.theme = value
}

let current = $state<Theme>(initialTheme())

apply(current)

/** The colour mode of the interface, carried by `data-theme` on the document root. */
export const theme = {
  get current(): Theme {
    return current
  },

  get isDark(): boolean {
    return current === 'dark'
  },

  set(value: Theme): void {
    if (value === current) {
      return
    }

    current = value
    apply(value)

    if (import.meta.env.DEV) {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
  },

  toggle(): Theme {
    theme.set(current === 'dark' ? 'light' : 'dark')

    return current
  },
}
