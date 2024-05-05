import 'server-only'
import { parseAuthorization } from './parseAuthorization'
import { type PlayerState } from '@/types/PlayerState'
import { getPlayerStateRef } from './refs'

export async function fetchPlayerState (request: Request) {
  const auth = await parseAuthorization(request)
  if (!auth) return null

  const playerStateRef = getPlayerStateRef(auth.uid)

  const player = (await playerStateRef.get()).val() as PlayerState

  return player
}
