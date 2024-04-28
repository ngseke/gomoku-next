import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { type BoardRecord } from '@/types/BoardRecord'
import { ServerValue } from 'firebase-admin/database'

export async function POST (
  request: Request,
  { params }: { params: { boardId: string } }
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const { boardId } = params
  const { x, y } = await request.json()

  const boardRef = firebaseAdminDatabase.ref(`boards/${boardId}`)
  if (!(await boardRef.get()).val()) return Response.json(null, { status: 400 })

  const recordsRef = boardRef.child('records')
  const createdAt = ServerValue.TIMESTAMP as number

  const newRecord: BoardRecord = {
    createdAt,
    createdBy: player.id,
    x,
    y,
    piece: 'white',
  }

  await recordsRef.push(newRecord)

  return new Response(null, { status: 204 })
}
