import { type BoardGrid } from '@/types/BoardGrid'
import { type BoardRecord } from '@/types/BoardRecord'
import { type Nullish } from '@/types/Nullish'

const size = 15

export function generateBoardGrid (records: Nullish<BoardRecord[]>) {
  const boardGrid =
    Array.from({ length: size }).map(() => (
      Array.from({ length: size }).fill(null)
    )) as BoardGrid

  records?.forEach((record) => {
    boardGrid[record.x][record.y] = record
  })

  return boardGrid
}
