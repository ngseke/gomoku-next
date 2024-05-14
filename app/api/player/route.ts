import { playerNameMaxLength } from '@/modules/constants'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { getPlayerRef } from '@/modules/firebaseAdmin/refs'

export async function GET (
  request: Request,
) {
  const player = await fetchPlayer()
  if (!player) return Response.json(null, { status: 403 })

  return Response.json(player)
}

export async function PATCH (
  request: Request,
) {
  const player = await fetchPlayer()
  if (!player) return Response.json(null, { status: 403 })

  const playerRef = getPlayerRef(player.id)

  const { name, emoji } = await request.json()

  if (typeof name === 'string') {
    await playerRef.child('name').set(name.slice(0, playerNameMaxLength))
  }

  if (typeof emoji === 'string') {
    await playerRef.child('emoji').set(emoji)
  }

  return new Response(null, { status: 204 })
}
