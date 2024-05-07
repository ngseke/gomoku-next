import { type BoardRecordWithId } from './BoardRecord'
import { type BoardResult } from './BoardResult'
import { type Nullish } from './Nullish'
import { type Piece } from './Piece'

export interface Board {
  createdAt: number
  records: BoardRecordWithId[]
  firstPiece: Piece
  result?: Nullish<BoardResult>
}
