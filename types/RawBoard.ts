import { type BoardRecord } from './BoardRecord'
import { type BoardResult } from './BoardResult'
import { type Nullish } from './Nullish'

/** The board state stored in the database */
export interface RawBoard {
  createdAt: number
  records: Record<string, BoardRecord>
  result?: Nullish<BoardResult>
}
