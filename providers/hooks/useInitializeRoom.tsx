'use client'

import { useEffect } from 'react'
import { useDatabase } from 'reactfire'
import { useAppDispatch } from '@/lib/hooks'
import { onValue, ref } from 'firebase/database'
import { useAuthStore } from '@/hooks/useAuthStore'
import { setPlayerState } from '@/lib/features/gameSlice'

export function useInitializeRoom () {
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
