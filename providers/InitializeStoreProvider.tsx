'use client'

import { type PropsWithChildren, useEffect } from 'react'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { useAuth, useDatabase } from 'reactfire'
import { clearAuth, setPlayer, setSessionId, setUser } from '@/lib/features/authSlice'
import axios from 'axios'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch } from '@/lib/hooks'
import { onValue, ref } from 'firebase/database'
import { useAuthStore } from '@/hooks/useAuthStore'
import { setPlayerState } from '@/lib/features/playerStateSlice'

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

export function useInitializePlayerState () {
  const dispatch = useAppDispatch()

  const database = useDatabase()
  const { player } = useAuthStore()

  useEffect(() => {
    if (!player) return

    const path = `playerStates/${player?.id}`
    const playerStateRef = ref(database, path)

    const unsubscribe = onValue(playerStateRef, async (snapshot) => {
      const value = snapshot.val()

      dispatch(setPlayerState(value))
    })

    return unsubscribe
  }, [database, dispatch, player])
}

export function InitializeStoreProvider ({ children }: PropsWithChildren) {
  useInitializeUser()
  useInitializeSessionId()
  useInitializePlayerState()

  return children
}
