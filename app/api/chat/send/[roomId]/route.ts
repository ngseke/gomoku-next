import { firebaseAdminDatabase } from '@/modules/firebaseAdmin'
import { ServerValue } from 'firebase-admin/database'

export async function POST (
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const { roomId } = params
  const { message } = await request.json()

  const chatRef = firebaseAdminDatabase.ref(`chats/${roomId}`)
  const { key } = await chatRef.push({
    message,
    createdAt: ServerValue.TIMESTAMP,
  })

  return Response.json({
    key,
  })
}
