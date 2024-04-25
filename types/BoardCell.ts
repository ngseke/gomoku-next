import { type Piece } from './Piece'
import { type Position } from './Position'

export interface BoardCell extends Position {
  piece: Piece
}
