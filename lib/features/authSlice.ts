import { type Player } from '@/types/Player'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type User } from 'firebase/auth'

export interface authState {
  user: User | null
  player: Player | null

  isInitializingUser: boolean
  isInitializingPlayer: boolean
}

const initialState: authState = {
  user: null,
  player: null,

  isInitializingUser: true,
  isInitializingPlayer: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser (state, action: PayloadAction<User | null>) {
      state.user = action.payload
      state.isInitializingUser = false
    },

    setPlayer (state, action: PayloadAction<Player | null>) {
      state.player = action.payload
      state.isInitializingPlayer = false
    },
  },
})

export const {
  setUser,
  setPlayer,
} = authSlice.actions

export const authReducer = authSlice.reducer
