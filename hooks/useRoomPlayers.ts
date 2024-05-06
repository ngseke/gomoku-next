import { usePlayer } from './usePlayer'
import { useRoomStore } from './useRoomStore'

export function useRoomPlayers () {
  const room = useRoomStore()
  const rawRoomPlayers = room?.players ?? null

  const roomPlayers = rawRoomPlayers
    ? Object.values(rawRoomPlayers).sort((a, b) => (
      a.piece?.localeCompare(b.piece)
    ))
    : []

  const isAwaitingPlayer = roomPlayers.length < 2

  const { player } = usePlayer()
  const opponent = rawRoomPlayers
    ? Object.values(rawRoomPlayers)
      .find(roomPlayer => player?.id !== roomPlayer.id) ?? null
    : null

  return {
    rawRoomPlayers,
    roomPlayers,
    isAwaitingPlayer,
    opponent,
  }
}
