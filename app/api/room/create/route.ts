import { createBoard } from '@/modules/firebaseAdmin/createBoard'
import { createChat } from '@/modules/firebaseAdmin/createChat'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { generateRoomId } from '@/modules/generateRoomId'
import { type Room } from '@/types/Room'
import { ServerValue } from 'firebase-admin/database'

export async function POST (
  request: Request,
) {
  const auth = await parseAuthorization(request)
  if (!auth) return Response.json(null, { status: 403 })

  const playerId = auth.uid

  const body = await request.json()

  const roomId = generateRoomId()
  const roomRef = firebaseAdminDatabase.ref(`rooms/${roomId}`)

  const name = body.name?.trim() || `Room ${roomId}`
  const createdAt = ServerValue.TIMESTAMP as number

  const boardId = await createBoard()

  const room = {
    id: roomId,
    name,
    createdAt,
    createdBy: playerId,
    boardId,
  } satisfies Room

  await roomRef.set(room)

  const message = `The room has been created (${roomId})`
  void createChat(roomId, {
    message,
    isAdmin: true,
  })

  const createdRoom = (await roomRef.get()).val()

  return Response.json(createdRoom)
}
