'use client'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { clearAuth } from '@/lib/features/authSlice'
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

      await refetchGlobalPlayer()
    })

    return unsubscribe
  }, [auth, dispatch, refetchGlobalPlayer])
}
