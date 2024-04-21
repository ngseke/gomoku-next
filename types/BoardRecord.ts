import { type BoardCell } from './BoardCell'

export interface BoardRecord extends BoardCell {
  createdBy?: string
  createdAt?: number
}
