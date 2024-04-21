import { useAppSelector } from '@/lib/hooks'

export function useRoomStore () {
  return useAppSelector((state) => state.game.room)
}
