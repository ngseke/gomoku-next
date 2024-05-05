import { type Player } from '@/types/Player'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

export interface AuthState {
  player: Player | null
  sessionId: string | null

  isInitializingUser: boolean
  isInitializingPlayer: boolean
}

const initialState: AuthState = {
  player: null,
  sessionId: null,

  isInitializingUser: true,
  isInitializingPlayer: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPlayer (state, action: PayloadAction<Player | null>) {
      state.player = action.payload
      state.isInitializingPlayer = false
    },

    clearAuth (state) {
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
  setPlayer,
  clearAuth,
  initializeSessionId,
} = authSlice.actions

export const authReducer = authSlice.reducer
