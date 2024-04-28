import { useAuthStore } from './useAuthStore'
import { usePlayerStateStore } from './usePlayerStateStore'

export function useIsCurrentSession () {
  const { sessionId } = useAuthStore()
  const playerState = usePlayerStateStore()

  const isCurrentSession = sessionId === playerState?.sessionId

  return { isCurrentSession }
}
