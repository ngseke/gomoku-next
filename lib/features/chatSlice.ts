import { type Chat } from '@/types/Chat'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
  chats: Record<string, Chat> | null
}

const initialState: ChatState = {
  chats: null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats (state, action: PayloadAction<Record<string, Chat> | null>) {
      state.chats = action.payload
    },

    pushChat (
      state,
      { payload: { key, chat } }: PayloadAction<{ key: string, chat: Chat }>
    ) {
      state.chats = {
        ...state.chats,
        [key]: chat,
      }
    },
  },
})

export const {
  setChats,
  pushChat,
} = chatSlice.actions

export const chatReducer = chatSlice.reducer
