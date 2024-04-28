import { type Board } from '@/types/Board'
import { type BoardRecord } from '@/types/BoardRecord'
import { type Nullish } from '@/types/Nullish'

const size = 15

export function generateBoard (records: Nullish<BoardRecord[]>) {
  const board =
    Array.from({ length: size }).map(() => (
      Array.from({ length: size }).fill(null)
    )) as Board

  records?.forEach((record) => {
    board[record.x][record.y] = record
  })

  return board
}
