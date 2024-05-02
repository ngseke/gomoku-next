'use client'
import { useEffect } from 'react'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { clearAuth, setPlayer, setUser } from '@/lib/features/authSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useAxios } from '../useAxios'

export function useInitializeUser () {
  const auth = useAuth()
  const dispatch = useAppDispatch()
  const axios = useAxios()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch?.(clearAuth())
        return
      }
      const serializedUser = user?.toJSON() as User
      dispatch?.(setUser(serializedUser))

      const { data: player } = await axios.get('/api/player')
      dispatch?.(setPlayer(player))
    })

    return unsubscribe
  }, [auth, axios, dispatch])
}
