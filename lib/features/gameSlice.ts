import { type PlayerState } from '@/types/PlayerState'
import { type Room } from '@/types/Room'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GameState {
  playerState: PlayerState | null
  isPlayerStateInitialized: boolean
  room: Room | null
}

const initialState: GameState = {
  playerState: null,
  isPlayerStateInitialized: false,
  room: null,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerState (state, action: PayloadAction<PlayerState | null>) {
      state.playerState = action.payload
      state.isPlayerStateInitialized = true
    },

    setRoom (state, action: PayloadAction<Room | null>) {
      state.room = action.payload
    },
  },
})

export const {
  setPlayerState,
  setRoom,
} = gameSlice.actions

export const gameReducer = gameSlice.reducer
