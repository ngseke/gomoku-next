import { getPlayerRecordRef } from '@/modules/firebaseAdmin/refs'
import { withAuth } from '@/modules/firebaseAdmin/withAuth'
import { type PlayerRecord } from '@/types/PlayerRecord'

export const GET = withAuth(async (
  { auth },
  { params }: { params: { playerIds: string[] } }
) => {
  const playerId = params.playerIds?.[0] ?? auth.uid

  const ref = getPlayerRecordRef(playerId)
  const record = (await ref.get()).val() as PlayerRecord

  return Response.json(record)
})
