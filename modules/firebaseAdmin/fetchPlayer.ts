import { type Player } from '@/types/Player'
import { firebaseAdminDatabase } from './firebaseAdmin'
import { parseAuthorization } from './parseAuthorization'

export async function fetchPlayer (request: Request) {
  const auth = await parseAuthorization(request)

  if (!auth) return null

  const id = auth.uid

  const playerRef = firebaseAdminDatabase.ref(`players/${id}`)

  const player = (await playerRef.get()).val() as Player

  return player
}
