import { useCreateOrJoinRoom } from './useCreateOrJoinRoom'
import { useEffect, useRef } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { useAuthStore } from './useAuthStore'
import { useRouter } from '@/navigation'
import { useParams } from 'next/navigation'

export function useAutoJoinRoom () {
  const {
    joinRoom,
    isCreatingOrJoiningRoom,
    joinError,
    clearJoinError,
  } = useCreateOrJoinRoom()
  const isPlayerStateInitialized =
    useAppSelector((state) => state.game.isPlayerStateInitialized)
  const { isInitializingPlayer } = useAuthStore()
  const router = useRouter()
  const { slugs } = useParams<{ slugs?: string[] }>()
  const isExecuted = useRef(false)

  useEffect(() => {
    if (
      isExecuted.current ||
      isInitializingPlayer ||
      isPlayerStateInitialized
    ) return

    isExecuted.current = true

    if (slugs?.[0] !== 'game') return

    const roomId = slugs?.[1]
    if (!roomId) {
      router.replace('/', { scroll: false })
      return
    }

    void (async () => {
      const isSuccessful = await joinRoom(roomId)

      if (!isSuccessful) {
        router.replace('/', { scroll: false })
      }
    })()
  }, [isInitializingPlayer, isPlayerStateInitialized, joinRoom, router, slugs])

  return {
    isAutoJoiningRoom: isCreatingOrJoiningRoom,
    joinError,
    clearJoinError,
  }
}
