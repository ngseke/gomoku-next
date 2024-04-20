import { useAppSelector } from '@/lib/hooks'
import { type Nullish } from '@/types/Nullish'

export function usePlayer () {
  const player = useAppSelector((state) => state.auth.player)

  function getIsSelf (playerId: Nullish<string>) {
    if (!playerId) return false

    return player?.id === playerId
  }

  return {
    player,
    getIsSelf,
  }
}
