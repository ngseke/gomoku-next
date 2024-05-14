import 'server-only'
import { parseAuthorization } from './parseAuthorization'
import { type PlayerState } from '@/types/PlayerState'
import { getPlayerStateRef } from './refs'

export async function fetchPlayerState () {
  const auth = await parseAuthorization()
  if (!auth) return null

  const playerStateRef = getPlayerStateRef(auth.uid)

  const player = (await playerStateRef.get()).val() as PlayerState

  return player
}
