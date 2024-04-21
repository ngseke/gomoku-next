import { type Piece } from './PieceType'

export interface RoomPlayer {
  sessionId: string
  createdAt: number
  piece: Piece
}

export type RoomPlayers = Record<string, RoomPlayer>

export interface Room {
  id: string
  createdBy: string
  createdAt: number
  name: string
  players?: RoomPlayers
}
