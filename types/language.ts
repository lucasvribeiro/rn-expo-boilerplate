export type LanguageContextType = {
  currentLanguage: string
  languages: { code: string; name: string }[]
  switchLanguage: (langCode: string) => Promise<boolean>
}

export type LanguageState = {
  language: string
}
