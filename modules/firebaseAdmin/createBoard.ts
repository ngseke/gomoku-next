import 'server-only'
import { ServerValue } from 'firebase-admin/database'
import { firebaseAdminDatabase } from './firebaseAdmin'
import { type Board } from '@/types/Board'

export async function createBoard () {
  const boardsRef = firebaseAdminDatabase.ref('boards')
  const createdAt = ServerValue.TIMESTAMP as number

  const { key } = await boardsRef.push({
    createdAt,
    records: [],
    result: null,
  } satisfies Board)

  if (!key) throw Error('Failed to get board key!')

  return key
}
