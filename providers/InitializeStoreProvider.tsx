'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { clearAuth, setPlayer, setSessionId, setUser } from '@/lib/features/authSlice'
import axios from 'axios'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch } from '@/lib/hooks'

function useInitializeUser () {
  const auth = useAuth()
  const dispatch = useAppDispatch()

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

      dispatch?.(setUser(serializedUser))
      dispatch?.(setPlayer(player))
    })

    return unsubscribe
  }, [auth, dispatch])
}

function useInitializeSessionId () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const sessionId = nanoid(6)
    dispatch?.(setSessionId(sessionId))
  }, [dispatch])
}

export function InitializeStoreProvider ({ children }: PropsWithChildren) {
  useInitializeUser()
  useInitializeSessionId()

  return children
}
