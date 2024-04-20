import { type Player } from '@/types/Player'
import { firebaseAdminDatabase } from './firebaseAdmin'
import { parseAuthorization } from './parseAuthorization'

export async function resetPlayer (
  request: Request,
) {
  const auth = await parseAuthorization(request)

  const id = auth?.uid

  if (!id) throw new Error('No auth id')

  const name = auth?.name

  const player = {
    id,
    name,
    avatar: auth?.picture ?? null,
  } satisfies Player

  const playerRef = firebaseAdminDatabase.ref(`players/${id}`)

  await playerRef.set(player)
}
