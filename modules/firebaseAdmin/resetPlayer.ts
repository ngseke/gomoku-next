import { type Player } from '@/types/Player'
import { firebaseAdminDatabase } from './firebaseAdmin'
import { parseAuthorization } from './parseAuthorization'
import * as emoji from 'node-emoji'

export async function resetPlayer (
  request: Request,
) {
  const auth = await parseAuthorization(request)

  const id = auth?.uid

  if (!id) throw new Error('No auth id')

  const name = auth?.name ?? `Player ${id.slice(0, 5)}`

  const player = {
    id,
    name,
    emoji: emoji.random().emoji,
  } satisfies Player

  const playerRef = firebaseAdminDatabase.ref(`players/${id}`)

  await playerRef.set(player)
}
