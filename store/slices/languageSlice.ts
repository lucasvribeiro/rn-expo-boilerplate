import { createSlice } from '@reduxjs/toolkit'

import { LanguageState } from '@/types'

const initialState: LanguageState = {
  language: 'en'
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload
    }
  }
})

export const { changeLanguage } = languageSlice.actions
export default languageSlice.reducer
