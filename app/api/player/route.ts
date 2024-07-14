import { playerNameMaxLength } from '@/modules/constants'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { getPlayerRef } from '@/modules/firebaseAdmin/refs'
import { withAuth } from '@/modules/firebaseAdmin/withAuth'

export const GET = withAuth(async ({ auth }) => {
  const player = await fetchPlayer(auth)
  return Response.json(player)
})

export const PATCH = withAuth(async (request) => {
  const { auth } = request
  const player = await fetchPlayer(auth)
  const playerRef = getPlayerRef(player.id)

  const { name, emoji } = await request.json()

  if (typeof name === 'string') {
    await playerRef.child('name').set(name.slice(0, playerNameMaxLength))
  }

  if (typeof emoji === 'string') {
    await playerRef.child('emoji').set(emoji)
  }

  return new Response(null, { status: 204 })
})
