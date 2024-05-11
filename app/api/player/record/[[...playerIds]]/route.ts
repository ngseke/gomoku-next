import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { getPlayerRecordRef } from '@/modules/firebaseAdmin/refs'
import { type PlayerRecord } from '@/types/PlayerRecord'

export async function GET (
  request: Request,
  { params }: { params: { playerIds: string[] } }
) {
  const auth = await parseAuthorization(request)
  if (!auth) return Response.json(null, { status: 403 })

  const playerId = params.playerIds?.[0] ?? auth.uid

  const ref = getPlayerRecordRef(playerId)
  const record = (await ref.get()).val() as PlayerRecord

  return Response.json(record)
}
