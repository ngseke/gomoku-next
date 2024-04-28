import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { type Board } from '@/types/Board'
import { type BoardRecord } from '@/types/BoardRecord'
import { type Nullish } from '@/types/Nullish'
import { convertToArray } from '../convertToArray'

export async function fetchBoard (boardId: string) {
  const boardRef = firebaseAdminDatabase.ref(`boards/${boardId}`)
  const rawBoard = (await boardRef.get()).val() as Nullish<Board>

  if (!rawBoard) {
    return null
  }

  const board: Board = {
    ...rawBoard,
    records: convertToArray(rawBoard.records) as BoardRecord[],
  }

  return board
}
