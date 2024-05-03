'use client'
import { useEffect } from 'react'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { clearAuth, setPlayer, setUser } from '@/lib/features/authSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useFetchPlayer } from '../useFetchPlayer'

export function useInitializeUser () {
  const auth = useAuth()
  const dispatch = useAppDispatch()
  const { fetchPlayer } = useFetchPlayer()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch?.(clearAuth())
        return
      }
      const serializedUser = user?.toJSON() as User
      dispatch?.(setUser(serializedUser))

      const player = await fetchPlayer()

      dispatch?.(setPlayer(player))
    })

    return unsubscribe
  }, [auth, dispatch, fetchPlayer])
}
