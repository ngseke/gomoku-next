import 'server-only'
import { type Player } from '@/types/Player'
import { resetPlayer } from './resetPlayer'
import { getPlayerRef } from './refs'
import { type DecodedIdToken } from 'firebase-admin/auth'

export async function fetchPlayer (auth: DecodedIdToken) {
  const playerRef = getPlayerRef(auth.uid)

  let player = (await playerRef.get()).val() as Player

  if (!player) {
    await resetPlayer()
    player = (await playerRef.get()).val() as Player
  }

  return player
}
