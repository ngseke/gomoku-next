import { createBoard } from '@/modules/firebaseAdmin/createBoard'
import { createChat } from '@/modules/firebaseAdmin/createChat'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { getRoomRef } from '@/modules/firebaseAdmin/refs'
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
  const roomRef = getRoomRef(roomId)

  const name = body.name?.trim() || `Room ${roomId}`
  const createdAt = ServerValue.TIMESTAMP as number

  const boardId = await createBoard('black')

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

    systemMessage: {
      type: 'roomCreated',
      payload: { roomId },
    },
  })

  const createdRoom = (await roomRef.get()).val()

  return Response.json(createdRoom)
}
