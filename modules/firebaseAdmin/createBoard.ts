import 'server-only'
import { ServerValue } from 'firebase-admin/database'
import { type Board } from '@/types/Board'
import { getBoardsRef } from './refs'
import { type Nullish } from '@/types/Nullish'
import { type Piece } from '@/types/Piece'

export async function createBoard (firstPiece?: Nullish<Piece>) {
  const boardsRef = getBoardsRef()
  const createdAt = ServerValue.TIMESTAMP as number

  const { key } = await boardsRef.push({
    createdAt,
    records: [],
    firstPiece: firstPiece ?? 'black',
    result: null,
  } satisfies Board)

  if (!key) throw Error('Failed to get board key!')

  return key
}
