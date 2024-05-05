import { type Piece } from '@/types/Piece'
import { type RoomPlayers } from '@/types/Room'

export function findRoomPlayerByPiece (players: RoomPlayers | null, piece: Piece) {
  if (!players) return null

  return Object.values(players)
    .find(player => player.piece === piece) ?? null
}
