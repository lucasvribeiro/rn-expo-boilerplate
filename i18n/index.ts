import i18n from 'i18next'
import { getLocales } from 'expo-localization'
import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

import en from './locales/en.json'
import pt from './locales/pt.json'
import es from './locales/es.json'

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  es: { translation: es }
} as const

const deviceLanguage = getLocales()[0]?.languageCode || 'en'

const initI18n = async () => {
  let savedLanguage

  try {
    savedLanguage = await AsyncStorage.getItem('language')
  } catch (error) {
    console.error('Failed to load language from storage:', error)
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || deviceLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    compatibilityJSON: 'v4'
  })

  return i18n
}

export const changeLanguage = async (language: string) => {
  try {
    await i18n.changeLanguage(language)
    await AsyncStorage.setItem('language', language)

    return true
  } catch (error) {
    console.error('Failed to save language preference:', error)
    return false
  }
}

export default initI18n
