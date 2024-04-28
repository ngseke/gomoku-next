import { type BoardCell } from './BoardCell'

/** Describes the information for each move taken on the board */
export interface BoardRecord extends BoardCell {
  createdBy?: string
  createdAt?: number
}
