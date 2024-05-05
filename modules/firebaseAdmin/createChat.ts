import 'server-only'
import { ServerValue } from 'firebase-admin/database'
import { type Chat } from '@/types/Chat'
import { getChatsRef } from './refs'

export async function createChat (
  roomId: string,
  chat: Pick<Chat, 'createdBy' | 'message' | 'playerName' | 'isAdmin'>
) {
  const chatsRef = getChatsRef(roomId)
  const createdAt = ServerValue.TIMESTAMP as number

  await chatsRef.push({
    createdAt,
    ...chat,
  } satisfies Chat)
}
