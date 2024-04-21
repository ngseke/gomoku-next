import { type Piece } from './PieceType'

export interface BoardCell {
  piece: Piece
  x: number
  y: number
}
