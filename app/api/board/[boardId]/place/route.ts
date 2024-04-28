import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { type BoardRecord } from '@/types/BoardRecord'
import { ServerValue } from 'firebase-admin/database'
import { generateBoardGrid } from '@/modules/generateBoard'
import { getNextAvailablePiece, judgeCanPlace } from '@/modules/boardGrid'
import { fetchPlayerState } from '@/modules/firebaseAdmin/fetchPlayerState'
import { fetchRoomPlayers } from '@/modules/firebaseAdmin/fetchRoomPlayers'
import { fetchBoard } from '@/modules/firebaseAdmin/fetchBoard'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { fetchAndJudgeBoard } from '@/modules/firebaseAdmin/fetchAndJudgeBoard'
import { createBoardResult } from '@/modules/firebaseAdmin/createBoardResult'

export async function POST (
  request: Request,
  { params: { boardId } }: { params: { boardId: string } }
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const playerState = await fetchPlayerState(request)
  if (!playerState) {
    return Response.json('You are not in any room!', { status: 400 })
  }

  const roomId = playerState?.roomId
  const roomPlayers = await fetchRoomPlayers(roomId)

  const roomPlayer = roomPlayers?.[player.id]
  if (!roomPlayer) {
    return Response.json('You are not in the correct room!', { status: 400 })
  }

  const { x, y } = await request.json()

  const board = await fetchBoard(boardId)
  if (!board) {
    return Response.json(`Cannot find board \`${boardId}\`!`, { status: 400 })
  }

  const hasResult = Boolean(board.result)
  if (hasResult) {
    return Response.json(`Board \`${boardId}\` has already had a result!`, { status: 400 })
  }

  const boardGrid = generateBoardGrid(board.records)

  const nextAvailablePiece = getNextAvailablePiece(boardGrid)
  const isPieceMatched = nextAvailablePiece !== roomPlayer.piece
  if (isPieceMatched) {
    return Response.json(
      `It's not your turn yet! Expected piece: ${nextAvailablePiece}, your piece: ${roomPlayer.piece}.`,
      { status: 400 }
    )
  }

  const canPlace = judgeCanPlace(boardGrid, { x, y })
  if (!canPlace) {
    return Response.json(
      `You cannot place on the position \`${JSON.stringify({ x, y })}\`.`,
      { status: 400 }
    )
  }

  const recordsRef = firebaseAdminDatabase.ref(`boards/${boardId}/records`)
  const createdAt = ServerValue.TIMESTAMP as number
  const newRecord: BoardRecord = {
    createdAt,
    createdBy: player.id,
    x,
    y,
    piece: nextAvailablePiece,
  }

  await recordsRef.push(newRecord)

  const result = await fetchAndJudgeBoard(boardId)
  if (result) {
    await createBoardResult(boardId, result)
  }

  return new Response(null, { status: 204 })
}
