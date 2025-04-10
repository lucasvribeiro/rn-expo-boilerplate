import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import useTheme from '@/hooks/useTheme'

const AppLayout = () => {
  const { theme } = useTheme()

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" />
      <Slot />
    </ThemeProvider>
  )
}

export default AppLayout
