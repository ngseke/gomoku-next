import { unique } from '@/modules/unique'
import { type Chat } from '@/types/Chat'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatState {
  chats: Record<string, Chat> | null
  hasUnreadChats: boolean
  watchers: string[]
}

const initialState: ChatState = {
  chats: null,
  hasUnreadChats: false,
  watchers: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats (state, action: PayloadAction<Record<string, Chat> | null>) {
      const chats = action.payload
      state.chats = chats

      state.hasUnreadChats =
        Boolean(chats && Object.values(chats).length) &&
        !state.watchers.length
    },

    pushChat (
      state,
      { payload: { key, chat } }: PayloadAction<{ key: string, chat: Chat }>
    ) {
      state.chats = {
        ...state.chats,
        [key]: chat,
      }

      if (!state.watchers.length) state.hasUnreadChats = true
    },

    addWatcher (state, { payload }: PayloadAction<string>) {
      state.watchers = unique([...state.watchers, payload])
      state.hasUnreadChats = false
    },

    removeWatcher (state, { payload }: PayloadAction<string>) {
      state.watchers = state.watchers.filter(watcher => watcher !== payload)
    },
  },
})

export const {
  setChats,
  pushChat,
  addWatcher,
  removeWatcher,
} = chatSlice.actions

export const chatReducer = chatSlice.reducer
