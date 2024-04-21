import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { type Room } from '@/types/Room'

export async function fetchRoom (request: Request, roomId: string) {
  const auth = await parseAuthorization(request)

  if (!auth) return null

  const roomRef = firebaseAdminDatabase.ref(`rooms/${roomId}`)

  const room = (await roomRef.get()).val() as Room | null

  return room
}
