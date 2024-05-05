import 'server-only'
import { ServerValue } from 'firebase-admin/database'
import { type Board } from '@/types/Board'
import { getBoardsRef } from './refs'

export async function createBoard () {
  const boardsRef = getBoardsRef()
  const createdAt = ServerValue.TIMESTAMP as number

  const { key } = await boardsRef.push({
    createdAt,
    records: [],
    result: null,
  } satisfies Board)

  if (!key) throw Error('Failed to get board key!')

  return key
}
