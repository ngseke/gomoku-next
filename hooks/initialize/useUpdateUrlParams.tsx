'use client'

import { useEffect } from 'react'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useAppSelector } from '@/lib/hooks'
import { useRouter } from '@/navigation'

export function useUpdateUrlParams () {
  const playerState = usePlayerStateStore()
  const isPlayerStateInitialized =
    useAppSelector((state) => state.game.isPlayerStateInitialized)
  const type = playerState?.type
  const roomId = playerState?.roomId

  const router = useRouter()

  useEffect(() => {
    if (!isPlayerStateInitialized) return

    if (type === 'game') {
      router.replace(`/game/${roomId}`, { scroll: false })
    }
  }, [isPlayerStateInitialized, roomId, router, type])
}
