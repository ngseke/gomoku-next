import { ServerValue } from 'firebase-admin/database'
import { firebaseAdminDatabase } from './firebaseAdmin'
import { type Chat } from '@/types/Chat'

export async function createChat (
  roomId: string,
  chat: Pick<Chat, 'createdBy' | 'message' | 'playerName' | 'isAdmin'>
) {
  const chatsRef = firebaseAdminDatabase.ref(`chats/${roomId}`)
  const createdAt = ServerValue.TIMESTAMP as number

  await chatsRef.push({
    createdAt,
    ...chat,
  } satisfies Chat)
}
