import { createChat } from '@/modules/firebaseAdmin/createChat'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { fetchRoom } from '@/modules/firebaseAdmin/fetchRoom'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { parseSessionId } from '@/modules/firebaseAdmin/parseSessionId'

export async function POST (
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const sessionId = parseSessionId(request)
  if (!sessionId) {
    return Response.json(
      'Missing header `X-Session-Id`',
      { status: 400 }
    )
  }

  const { roomId } = params

  const room = await fetchRoom(request, roomId)
  if (!room) {
    return new Response(null, { status: 204 })
  }

  // Update Room
  const roomRef = firebaseAdminDatabase.ref(`rooms/${roomId}`)
  const roomPlayerRef = roomRef.child(`players/${player.id}`)
  await roomPlayerRef.remove()

  // Update Player State
  const playerStateRef = firebaseAdminDatabase.ref(`playerStates/${player.id}`)
  await playerStateRef.remove()

  await createChat(roomId, {
    message: `${player.name} has left`,
    isAdmin: true,
  })

  return new Response(null, { status: 204 })
}
