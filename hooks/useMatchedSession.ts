import { useAuthStore } from './useAuthStore'
import { usePlayerStateStore } from './usePlayerStateStore'

export function useMatchedSession () {
  const { sessionId } = useAuthStore()
  const playerState = usePlayerStateStore()

  const isSessionMatched = playerState?.sessionId
    ? sessionId === playerState?.sessionId
    : null

  return {
    isSessionMatched,
  }
}
