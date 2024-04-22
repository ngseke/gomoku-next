import { type Piece } from './PieceType'
import { type Position } from './Position'

export interface BoardCell extends Position {
  piece: Piece
}
