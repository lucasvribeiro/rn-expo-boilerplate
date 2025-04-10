export type Theme = 'light' | 'dark'

export type ThemeMode = Theme | 'auto'

export type ThemeState = {
  mode: ThemeMode
}

export type ThemeHook = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
