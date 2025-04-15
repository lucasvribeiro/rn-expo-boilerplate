import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import themeReducer from './slices/themeSlice'
import languageReducer from './slices/languageSlice'

const persistConfig = {
  version: 1,
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'language']
}

const rootReducer = combineReducers({
  theme: themeReducer,
  language: languageReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

const persistor = persistStore(store)

if (__DEV__) {
  // persistor.purge()
}

export { store, persistor }
