import { createBoard } from '@/modules/firebaseAdmin/createBoard'
import { createChat } from '@/modules/firebaseAdmin/createChat'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'

export async function POST (
  request: Request,
  { params: { roomId } }: { params: { roomId: string } }
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const roomRef = firebaseAdminDatabase.ref(`rooms/${roomId}`)
  const boardIdRef = roomRef.child('boardId')

  const boardId = await createBoard()
  await boardIdRef.set(boardId)

  const message = 'A new round has started'

  await createChat(roomId, {
    message,
    isAdmin: true,
  })

  return new Response(null, { status: 204 })
}
