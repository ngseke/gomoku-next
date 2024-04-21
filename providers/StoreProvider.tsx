'use client'

import { type PropsWithChildren, useRef, useEffect, type MutableRefObject } from 'react'
import { Provider } from 'react-redux'
import { makeStore, type AppStore } from '../lib/store'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { clearAuth, setPlayer, setUser } from '@/lib/features/authSlice'
import axios from 'axios'

function useInitializeUser (
  storeRef: MutableRefObject<AppStore | undefined>
) {
  const auth = useAuth()
  const dispatch = storeRef?.current?.dispatch

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch?.(clearAuth())
        return
      }
      const serializedUser = user?.toJSON() as User

      const token = await user?.getIdToken()
      const { data: player } = await axios.get('/api/player', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(player)

      dispatch?.(setUser(serializedUser))
      dispatch?.(setPlayer(player))
    })

    return unsubscribe
  }, [auth, dispatch])
}

export function StoreProvider ({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useInitializeUser(storeRef)

  return <Provider store={storeRef.current}>{children}</Provider>
}
