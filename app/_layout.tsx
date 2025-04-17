import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font'
import Purchases from 'react-native-purchases'
import { SplashScreen, Stack } from 'expo-router'
import mobileAds from 'react-native-google-mobile-ads'
import { PersistGate } from 'redux-persist/integration/react'

import initI18n from '@/i18n'
import { IAP_KEYS } from '@/constants/iap'
import { persistor, store } from '@/store'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function RootLayout() {
  const [i18nInitialized, setI18nInitialized] = useState(false)

  const [fontsLoaded, fontsError] = useFonts({
    'Nunito-Black': require('../assets/fonts/Nunito-Black.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Light': require('../assets/fonts/Nunito-Light.ttf'),
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf')
  })

  useEffect(() => {
    const setupI18n = async () => {
      await initI18n()
      setI18nInitialized(true)
    }

    const setupMobileAds = async () => {
      await mobileAds()
        .initialize()
        .then((adapterStatuses) => {})
    }

    const setupPurchases = async () => {
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)

      if (Platform.OS === 'ios') {
        await Purchases.configure({ apiKey: IAP_KEYS.APPLE })
      } else if (Platform.OS === 'android') {
        await Purchases.configure({ apiKey: IAP_KEYS.GOOGLE })
      }
    }

    setupMobileAds()
    setupPurchases()
    setupI18n()
  }, [])

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontsError])

  if (!i18nInitialized) return null
  if (!fontsLoaded && !fontsError) return null

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </LanguageProvider>
      </PersistGate>
    </Provider>
  )
}
