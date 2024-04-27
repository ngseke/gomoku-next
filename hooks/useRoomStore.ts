import { useAppSelector } from '@/lib/hooks'

/** The room state that syncs with Firebase in realtime */
export function useRoomStore () {
  return useAppSelector((state) => state.game.room)
}
