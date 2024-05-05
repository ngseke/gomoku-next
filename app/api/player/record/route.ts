import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { getPlayerRecordRef } from '@/modules/firebaseAdmin/refs'
import { type PlayerRecord } from '@/types/PlayerRecord'

export async function GET (request: Request) {
  const auth = await parseAuthorization(request)
  if (!auth) return Response.json(null, { status: 403 })

  const ref = getPlayerRecordRef(auth.uid)
  const record = (await ref.get()).val() as PlayerRecord

  return Response.json(record)
}
