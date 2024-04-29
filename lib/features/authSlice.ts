import { type Player } from '@/types/Player'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type User } from 'firebase/auth'
import { nanoid } from 'nanoid'

export interface AuthState {
  user: User | null
  player: Player | null
  sessionId: string | null

  isInitializingUser: boolean
  isInitializingPlayer: boolean
}

const initialState: AuthState = {
  user: null,
  player: null,
  sessionId: null,

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

    clearAuth (state) {
      state.user = null
      state.player = null
      state.isInitializingUser = false
      state.isInitializingPlayer = false
    },

    initializeSessionId (state) {
      if (state.sessionId) return

      const sessionId = nanoid(4)
      state.sessionId = sessionId
    },
  },
})

export const {
  setUser,
  setPlayer,
  clearAuth,
  initializeSessionId,
} = authSlice.actions

export const authReducer = authSlice.reducer
