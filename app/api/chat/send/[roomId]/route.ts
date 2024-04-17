import { firebaseDatabase } from '@/modules/firebase'
import { push, ref, serverTimestamp } from 'firebase/database'

export async function POST (
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const { roomId } = params
  const { message } = await request.json()

  const chatRef = ref(firebaseDatabase, `chats/${roomId}`)
  const { key } = await push(chatRef, {
    message,
    createdAt: serverTimestamp(),
  })

  return Response.json({
    key,
  })
}
