import { createBoard } from '@/modules/firebaseAdmin/createBoard'
import { createChat } from '@/modules/firebaseAdmin/createChat'
import { getRoomRef } from '@/modules/firebaseAdmin/refs'
import { withAuth } from '@/modules/firebaseAdmin/withAuth'
import { generateRoomId } from '@/modules/generateRoomId'
import { type Room } from '@/types/Room'
import { ServerValue } from 'firebase-admin/database'

export const POST = withAuth(async (request) => {
  const { auth } = request
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
})
