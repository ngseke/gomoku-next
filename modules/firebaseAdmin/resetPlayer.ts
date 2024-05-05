import 'server-only'
import { type Player } from '@/types/Player'
import { parseAuthorization } from './parseAuthorization'
import { ServerValue } from 'firebase-admin/database'
import { generateRandomPlayer } from '../generateRandomPlayer'
import { getLocaleFromCookie } from '../getLocaleFromCookie'
import { getPlayerRef } from './refs'

export async function resetPlayer (
  request: Request,
) {
  const auth = await parseAuthorization(request)

  const id = auth?.uid

  if (!id) throw new Error('No auth id')

  const locale = getLocaleFromCookie()

  const randomPlayer = await generateRandomPlayer(locale)
  const name: string = auth?.name ?? randomPlayer.name
  const emoji = randomPlayer.emoji

  const player = {
    id,
    createdAt: ServerValue.TIMESTAMP as number,
    name,
    emoji,
  } satisfies Player

  const playerRef = getPlayerRef(id)

  await playerRef.set(player)
}
