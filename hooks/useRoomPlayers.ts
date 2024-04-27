import { useRoomStore } from './useRoomStore'

export function useRoomPlayers () {
  const room = useRoomStore()

  const roomPlayers = room?.players
    ? Object.values(room?.players).sort((a, b) => (
      a.piece?.localeCompare(b.piece)
    ))
    : []

  return roomPlayers
}
