import { useAppSelector } from '@/lib/hooks'

/** The player state that syncs with Firebase in realtime */
export function usePlayerStateStore () {
  return useAppSelector((state) => state.game.playerState)
}
