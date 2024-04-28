import { type BoardRecord } from './BoardRecord'
import { type BoardResult } from './BoardResult'
import { type Nullish } from './Nullish'

export interface Board {
  createdAt: number
  records: BoardRecord[]
  result?: Nullish<BoardResult>
}
