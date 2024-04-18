import { type Player } from '@/types/Player'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type User } from 'firebase/auth'

export interface authState {
  user: User | null
  player: Player | null
}

const initialState: authState = {
  user: null,
  player: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser (state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    setPlayer (state, action: PayloadAction<Player>) {
      state.player = action.payload
    },
    clearUserAndPlayer (state) {
      state.user = null
      state.player = null
    },
  },
})

export const {
  setUser,
  setPlayer,
  clearUserAndPlayer,
} = authSlice.actions

export const authReducer = authSlice.reducer
