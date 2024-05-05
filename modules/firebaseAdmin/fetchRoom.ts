import 'server-only'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { type Room } from '@/types/Room'
import { getRoomRef } from './refs'

export async function fetchRoom (request: Request, roomId: string) {
  const auth = await parseAuthorization(request)

  if (!auth) return null

  const roomRef = getRoomRef(roomId)

  const room = (await roomRef.get()).val() as Room | null

  return room
}
