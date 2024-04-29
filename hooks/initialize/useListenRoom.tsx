'use client'

import { useEffect } from 'react'
import { useDatabase } from 'reactfire'
import { useAppDispatch } from '@/lib/hooks'
import { onValue, ref } from 'firebase/database'
import { setRoom } from '@/lib/features/gameSlice'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'

export function useListenRoom () {
  const dispatch = useAppDispatch()
  const database = useDatabase()

  const playerState = usePlayerStateStore()
  const roomId = playerState?.roomId

  useEffect(() => {
    if (!roomId) {
      dispatch(setRoom(null))
      return
    }

    const path = `rooms/${roomId}`
    const roomRef = ref(database, path)

    const unsubscribe = onValue(roomRef, async (snapshot) => {
      const value = snapshot.val()

      dispatch(setRoom(value))
    })

    return unsubscribe
  }, [database, dispatch, roomId])
}
