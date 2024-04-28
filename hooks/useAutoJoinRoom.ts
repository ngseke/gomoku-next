import { useParams, useRouter } from 'next/navigation'
import { useCreateOrJoinRoom } from './useCreateOrJoinRoom'
import { useEffect, useRef } from 'react'
import { useAppSelector } from '@/lib/hooks'

export function useAutoJoinRoom () {
  const { joinRoom, isCreatingOrJoiningRoom } = useCreateOrJoinRoom()
  const isPlayerStateInitialized =
    useAppSelector((state) => state.game.isPlayerStateInitialized)

  const router = useRouter()
  const { slugs } = useParams<{ slugs?: string[] }>()
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current || isPlayerStateInitialized) return
    isMounted.current = true

    if (slugs?.[0] !== 'game') return

    const roomId = slugs?.[1]
    if (!roomId) {
      router.replace('/')
      return
    }

    void joinRoom(roomId)
  }, [isPlayerStateInitialized, joinRoom, router, slugs])

  return {
    isAutoJoiningRoom: isCreatingOrJoiningRoom,
  }
}
