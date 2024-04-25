import { type Piece } from './Piece'
import { type Player } from './Player'

export interface RoomPlayer extends Player {
  sessionId: string
  joinedAt: number
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
