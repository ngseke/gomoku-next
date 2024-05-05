import 'server-only'
import { firebaseAdminDatabase } from './firebaseAdmin'
import { parseAuthorization } from './parseAuthorization'
import { type PlayerState } from '@/types/PlayerState'

export async function fetchPlayerState (request: Request) {
  const auth = await parseAuthorization(request)
  if (!auth) return null

  const id = auth.uid

  const playerStateRef = firebaseAdminDatabase.ref(`playerStates/${id}`)

  const player = (await playerStateRef.get()).val() as PlayerState

  return player
}
