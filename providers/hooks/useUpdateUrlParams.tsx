'use client'

import { useEffect } from 'react'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useRouter } from 'next/navigation'

export function useUpdateUrlParams () {
  const playerState = usePlayerStateStore()
  const type = playerState?.type
  const roomId = playerState?.roomId

  const router = useRouter()

  useEffect(() => {
    if (type === 'game') {
      router.replace(`/game/${roomId}`)
      return
    }

    router.replace('/')
  }, [roomId, router, type])
}
