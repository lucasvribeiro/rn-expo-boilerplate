import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistor } from '@/store'

export const clearPersistedData = async () => {
  try {
    await AsyncStorage.clear()
    await persistor.purge()

    return true
  } catch (error) {
    console.error('Error clearing persisted data:', error)
    return false
  }
}
