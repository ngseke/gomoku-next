'use client'
import { useEffect } from 'react'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { clearAuth, setPlayer, setUser } from '@/lib/features/authSlice'
import axios from 'axios'
import { useAppDispatch } from '@/lib/hooks'

export function useInitializeUser () {
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
