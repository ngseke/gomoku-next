import { type PlayerState } from '@/types/PlayerState'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface playerStateState {
  playerState: PlayerState | null
}

const initialState: playerStateState = {
  playerState: null,
}

export const playerStateSlice = createSlice({
  name: 'playerState',
  initialState,
  reducers: {
    setPlayerState (state, action: PayloadAction<PlayerState | null>) {
      state.playerState = action.payload
    },
  },
})

export const {
  setPlayerState,
} = playerStateSlice.actions

export const playerStateReducer = playerStateSlice.reducer
