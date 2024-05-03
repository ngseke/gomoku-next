import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'

export async function GET (
  request: Request,
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  return Response.json(player)
}

export async function PATCH (
  request: Request,
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const id = player.id
  const playerRef = firebaseAdminDatabase.ref(`players/${id}`)

  const { name, emoji } = await request.json()

  if (typeof name === 'string') {
    await playerRef.child('name').set(name)
  }

  if (typeof emoji === 'string') {
    await playerRef.child('emoji').set(emoji)
  }

  return new Response(null, { status: 204 })
}
