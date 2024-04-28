import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { type BoardRecord } from '@/types/BoardRecord'
import { type Board } from '@/types/Board'
import { type Nullish } from '@/types/Nullish'
import { ServerValue } from 'firebase-admin/database'

export async function POST (
  request: Request,
  { params: { boardId } }: { params: { boardId: string } }
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const { x, y } = await request.json()

  const boardRef = firebaseAdminDatabase.ref(`boards/${boardId}`)
  const board = (await boardRef.get()).val() as Nullish<Board>
  if (!board) {
    return Response.json(`Cannot find board \`${boardId}\`!`, { status: 400 })
  }

  const hasResult = Boolean(board.result)
  if (hasResult) {
    return Response.json(`Board \`${boardId}\` has already had a result!`, { status: 400 })
  }

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
