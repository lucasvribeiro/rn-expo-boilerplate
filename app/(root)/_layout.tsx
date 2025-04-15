import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import useTheme from '@/hooks/useTheme'
import { useLanguage } from '@/contexts/LanguageContext'

const AppLayout = () => {
  const { theme } = useTheme()
  const { languages, currentLanguage } = useLanguage()

  console.log('languages', languages)
  console.log('currentLanguage', currentLanguage)

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" />
      <Slot />
    </ThemeProvider>
  )
}

export default AppLayout
