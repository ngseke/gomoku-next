import { createChat } from '@/modules/firebaseAdmin/createChat'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { type Room } from '@/types/Room'
import { nanoid } from '@reduxjs/toolkit'
import { ServerValue } from 'firebase-admin/database'

export async function POST (
  request: Request,
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const body = await request.json()

  const roomId = nanoid(6)
  const roomRef = firebaseAdminDatabase.ref(`rooms/${roomId}`)

  const name = String(body.name).trim() || `Room ${roomId}`
  const createdAt = ServerValue.TIMESTAMP as number

  const room = {
    id: roomId,
    name,
    createdAt,
    createdBy: player.id,
  } satisfies Room

  await roomRef.set(room)

  const message = `"${name}" has been created`

  await createChat(roomId, {
    message,
    isAdmin: true,
  })

  const createdRoom = (await roomRef.get()).val()

  return Response.json(createdRoom)
}
