import { useAuthStore } from './useAuthStore'
import { usePlayerStateStore } from './usePlayerStateStore'

export function useMatchedSession () {
  const { sessionId } = useAuthStore()
  const playerState = usePlayerStateStore()

  const isSessionMatched = Boolean(
    playerState?.sessionId &&
      sessionId === playerState?.sessionId
  )

  return {
    isSessionMatched,
  }
}
