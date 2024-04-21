import { type PlayerState } from '@/types/PlayerState'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GameState {
  playerState: PlayerState | null
}

const initialState: GameState = {
  playerState: null,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerState (state, action: PayloadAction<PlayerState | null>) {
      state.playerState = action.payload
    },
  },
})

export const {
  setPlayerState,
} = gameSlice.actions

export const gameReducer = gameSlice.reducer
