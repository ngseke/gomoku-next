import 'server-only'
import { ServerValue } from 'firebase-admin/database'
import { type BoardResult } from '@/types/BoardResult'
import { getBoardResultRef } from './refs'

export async function createBoardResult (
  boardId: string,
  result: BoardResult
) {
  const boardResultRef = getBoardResultRef(boardId)
  const createdAt = ServerValue.TIMESTAMP as number

  await boardResultRef.set({
    createdAt,
    ...result,
  } satisfies BoardResult)
}
