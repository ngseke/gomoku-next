import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { type Board } from '@/types/Board'
import { type Nullish } from '@/types/Nullish'
import { convertToArray } from '../convertToArray'
import { type RawBoard } from '@/types/RawBoard'

export async function fetchBoard (boardId: string) {
  const boardRef = firebaseAdminDatabase.ref(`boards/${boardId}`)
  const rawBoard = (await boardRef.get()).val() as Nullish<RawBoard>

  if (!rawBoard) return null

  const records = convertToArray(rawBoard.records)
  const board: Board = { ...rawBoard, records: records ?? [] }

  return board
}
