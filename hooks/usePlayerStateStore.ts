import { useAppSelector } from '@/lib/hooks'

export function usePlayerStateStore () {
  return useAppSelector((state) => state.playerState.playerState)
}
