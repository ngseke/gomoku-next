import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './features/authSlice'
import { playerStateReducer } from './features/playerStateSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      playerState: playerStateReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
