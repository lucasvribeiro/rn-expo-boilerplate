import { createSlice } from '@reduxjs/toolkit'

import { ThemeState } from '@/types'

const initialState: ThemeState = {
  mode: 'auto'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    updateTheme: (state, action) => {
      state.mode = action.payload
    }
  }
})

export const { updateTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
