import { type Nullish } from '@/types/Nullish'
import { useAuthStore } from './useAuthStore'

export function usePlayer () {
  const { player } = useAuthStore()

  function getIsSelf (playerId: Nullish<string>) {
    if (!playerId) return false

    return player?.id === playerId
  }

  return {
    player,
    getIsSelf,
  }
}
