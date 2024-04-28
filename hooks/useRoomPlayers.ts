import { useRoomStore } from './useRoomStore'

export function useRoomPlayers () {
  const room = useRoomStore()
  const rawRoomPlayers = room?.players ?? null

  const roomPlayers = rawRoomPlayers
    ? Object.values(rawRoomPlayers).sort((a, b) => (
      a.piece?.localeCompare(b.piece)
    ))
    : []

  return {
    rawRoomPlayers,
    roomPlayers,
  }
}
