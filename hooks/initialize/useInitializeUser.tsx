'use client'
import { useEffect } from 'react'
import { type User, onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { clearAuth, setUser } from '@/lib/features/authSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useFetchPlayer } from '../useFetchPlayer'

export function useInitializeUser () {
  const auth = useAuth()
  const dispatch = useAppDispatch()
  const { refetchGlobalPlayer } = useFetchPlayer()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        dispatch?.(clearAuth())
        return
      }
      const serializedUser = user?.toJSON() as User
      dispatch?.(setUser(serializedUser))

      await refetchGlobalPlayer()
    })

    return unsubscribe
  }, [auth, dispatch, refetchGlobalPlayer])
}
