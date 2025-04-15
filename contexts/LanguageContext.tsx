import React, { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LANGUAGES } from '@/constants'
import { changeLanguage } from '@/i18n'
import { LanguageContextType } from '@/types'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  const switchLanguage = async (langCode: string) => {
    const success = await changeLanguage(langCode)
    if (success) {
      setCurrentLanguage(langCode)
    }
    return success
  }

  const value = {
    currentLanguage,
    languages: LANGUAGES,
    switchLanguage
  }

  useEffect(() => {
    setCurrentLanguage(i18n.language)
  }, [i18n.language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)

  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')

  return context
}

export { LanguageProvider, useLanguage }
