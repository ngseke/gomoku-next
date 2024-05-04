import { type Player } from '@/types/Player'
import { firebaseAdminDatabase } from './firebaseAdmin'
import { parseAuthorization } from './parseAuthorization'
import { random, search } from 'node-emoji'
import { ServerValue } from 'firebase-admin/database'
import { generatePlayerName } from '../generatePlayerName'

export async function resetPlayer (
  request: Request,
) {
  const auth = await parseAuthorization(request)

  const id = auth?.uid

  if (!id) throw new Error('No auth id')

  const name: string = auth?.name ?? generatePlayerName()
  const maybeRelatedEmoji = search(name.toLowerCase()).at(0)?.emoji

  const player = {
    id,
    createdAt: ServerValue.TIMESTAMP as number,
    name,
    emoji: maybeRelatedEmoji ?? random().emoji,
  } satisfies Player

  const playerRef = firebaseAdminDatabase.ref(`players/${id}`)

  await playerRef.set(player)
}
