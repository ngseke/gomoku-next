import { type Piece } from './Piece'
import { type WinningLine } from './WinningLine'

export interface BoardResult extends WinningLine {
  piece: Piece
}
