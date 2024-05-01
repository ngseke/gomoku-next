import { type BoardRecordWithId } from './BoardRecord'
import { type BoardResult } from './BoardResult'
import { type Nullish } from './Nullish'

export interface Board {
  createdAt: number
  records: BoardRecordWithId[]
  result?: Nullish<BoardResult>
}
