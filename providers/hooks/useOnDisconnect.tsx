'use client'

import { useEffect } from 'react'
import { onDisconnect, ref } from 'firebase/database'
import { useDatabase } from 'reactfire'
import { useAuthStore } from '@/hooks/useAuthStore'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useMatchedSession } from '@/hooks/useMatchedSession'

export function useOnDisconnect () {
  const database = useDatabase()

  const { player } = useAuthStore()
  const playerId = player?.id

  const playerState = usePlayerStateStore()
  const roomId = playerState?.roomId

  const { isSessionMatched } = useMatchedSession()

  useEffect(() => {
    if (!isSessionMatched) return

    const playerStateRef = ref(database, `playerStates/${playerId}`)
    const playerStateOnDisconnectRef = onDisconnect(playerStateRef)
    void playerStateOnDisconnectRef.remove()

    const roomPlayerRef = ref(database, `rooms/${roomId}/players/${playerId}`)
    const roomPlayerOnDisconnectRef = onDisconnect(roomPlayerRef)
    void roomPlayerOnDisconnectRef.remove()

    return () => {
      void playerStateOnDisconnectRef.cancel()
      void roomPlayerOnDisconnectRef.cancel()
    }
  }, [database, isSessionMatched, playerId, roomId])
}
