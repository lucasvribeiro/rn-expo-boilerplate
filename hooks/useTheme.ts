import { useColorScheme } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateTheme } from '@/store/slices/themeSlice'

import { Theme, ThemeHook, ThemeMode } from '@/types'

const useTheme = (): ThemeHook => {
  const dispatch = useDispatch()
  const colorScheme = useColorScheme()

  var theme: ThemeMode = useSelector((state: any) => state.theme.mode)

  const setTheme = (newTheme: Theme) => {
    dispatch(updateTheme(newTheme))
  }

  if (theme === 'auto') {
    theme = colorScheme || 'light'
  }

  return { theme, setTheme }
}

export default useTheme
