import 'server-only'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { type Room } from '@/types/Room'
import { getRoomRef } from './refs'

export async function fetchRoom (roomId: string) {
  const auth = await parseAuthorization()

  if (!auth) return null

  const roomRef = getRoomRef(roomId)

  const room = (await roomRef.get()).val() as Room | null

  return room
}
