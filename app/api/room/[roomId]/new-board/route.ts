import { createBoard } from '@/modules/firebaseAdmin/createBoard'
import { createChat } from '@/modules/firebaseAdmin/createChat'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { getRoomRef } from '@/modules/firebaseAdmin/refs'

export async function POST (
  request: Request,
  { params: { roomId } }: { params: { roomId: string } }
) {
  const auth = await parseAuthorization(request)
  if (!auth) return Response.json(null, { status: 403 })

  const roomRef = getRoomRef(roomId)
  const boardIdRef = roomRef.child('boardId')

  const boardId = await createBoard()
  await boardIdRef.set(boardId)

  const message = 'A new round has started'
  void createChat(roomId, {
    message,
    isAdmin: true,
  })

  return new Response(null, { status: 204 })
}
