import 'server-only'
import { ServerValue } from 'firebase-admin/database'
import { firebaseAdminDatabase } from './firebaseAdmin'
import { type BoardResult } from '@/types/BoardResult'

export async function createBoardResult (
  boardId: string,
  result: BoardResult
) {
  const boardResultRef = firebaseAdminDatabase.ref(`boards/${boardId}/result`)
  const createdAt = ServerValue.TIMESTAMP as number

  await boardResultRef.set({
    createdAt,
    ...result,
  } satisfies BoardResult)
}
