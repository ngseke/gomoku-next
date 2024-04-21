import { type BoardCell } from './BoardCell'
import { type Piece } from './PieceType'

export interface BoardRecord extends BoardCell {
  piece: Piece
  x: number
  y: number
}
