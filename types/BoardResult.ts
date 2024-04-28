import { type Piece } from './Piece'
import { type WinningLine } from './WinningLine'

export type BoardResult = (WinningLine & {
  type: 'win'
  piece: Piece
  createdAt?: number
}) | {
  type: 'draw'
  createdAt?: number
}
