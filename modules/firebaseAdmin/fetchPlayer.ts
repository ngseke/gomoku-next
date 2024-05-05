import 'server-only'
import { type Player } from '@/types/Player'
import { parseAuthorization } from './parseAuthorization'
import { resetPlayer } from './resetPlayer'
import { getPlayerRef } from './refs'

export async function fetchPlayer (request: Request) {
  const auth = await parseAuthorization(request)

  if (!auth) return null

  const playerRef = getPlayerRef(auth.uid)

  let player = (await playerRef.get()).val() as Player

  if (!player) {
    await resetPlayer(request)
    player = (await playerRef.get()).val() as Player
  }

  return player
}
