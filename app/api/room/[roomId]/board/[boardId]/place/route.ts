import { type BoardRecord } from '@/types/BoardRecord'
import { ServerValue } from 'firebase-admin/database'
import { generateBoardGrid } from '@/modules/generateBoard'
import { getNextAvailablePiece, judgeCanPlace } from '@/modules/boardGrid'
import { fetchPlayerState } from '@/modules/firebaseAdmin/fetchPlayerState'
import { fetchBoard } from '@/modules/firebaseAdmin/fetchBoard'
import { fetchAndJudgeBoard } from '@/modules/firebaseAdmin/fetchAndJudgeBoard'
import { createBoardResult } from '@/modules/firebaseAdmin/createBoardResult'
import { createChat } from '@/modules/firebaseAdmin/createChat'
import { findRoomPlayerByPiece } from '@/modules/findRoomPlayerByPiece'
import { getBoardRecordsRef, getPlayerRecordDrawCountRef, getPlayerRecordLoseCountRef, getPlayerRecordWinCountRef } from '@/modules/firebaseAdmin/refs'
import { runParallel } from '@/modules/runParallel'
import { fetchRoom } from '@/modules/firebaseAdmin/fetchRoom'
import { withAuth } from '@/modules/firebaseAdmin/withAuth'

export const POST = withAuth(async (
  request,
  { params: { boardId, roomId } }: { params: { boardId: string, roomId: string } }
) => {
  const { auth } = request
  const { x, y } = (await request.json()) as { x: number, y: number }

  const playerId = auth.uid

  const [playerState, room, board] = await runParallel(
    fetchPlayerState,
    async () => await fetchRoom(roomId),
    async () => await fetchBoard(boardId)
  )

  if (!playerState) {
    return Response.json('You are not in any room!', { status: 400 })
  }

  const roomPlayers = room?.players
  const roomPlayer = roomPlayers?.[playerId]
  if (!roomPlayers || !roomPlayer) {
    return Response.json('You are not in the correct room!', { status: 400 })
  }

  if (room?.boardId !== boardId) {
    return Response.json('You are not placing the correct board!', { status: 400 })
  }

  if (!board) {
    return Response.json(`Cannot find board \`${boardId}\`!`, { status: 400 })
  }

  const hasResult = Boolean(board.result)
  if (hasResult) {
    return Response.json(`Board \`${boardId}\` has already had a result!`, { status: 400 })
  }

  const boardGrid = generateBoardGrid(board.records)

  const nextAvailablePiece = getNextAvailablePiece(boardGrid, board.firstPiece)
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

  const recordsRef = getBoardRecordsRef(boardId)
  const createdAt = ServerValue.TIMESTAMP as number
  const newRecord: BoardRecord = {
    createdAt,
    createdBy: playerId,
    x,
    y,
    piece: nextAvailablePiece,
  }

  await recordsRef.push(newRecord)

  const result = await fetchAndJudgeBoard(boardId)
  if (result) {
    await createBoardResult(boardId, result)

    if (result.type === 'win') {
      const winner = findRoomPlayerByPiece(roomPlayers, result.piece)

      Object.values(roomPlayers).forEach((player) => {
        if (!winner) return

        if (player.id === winner.id) {
          void getPlayerRecordWinCountRef(player.id)
            .set(ServerValue.increment(1))
        } else {
          void getPlayerRecordLoseCountRef(player.id)
            .set(ServerValue.increment(1))
        }
      })

      void createChat(roomId, {
        message: `The winner is ${result.piece} (${winner?.name})`,
        isAdmin: true,

        systemMessage: {
          type: result.piece === 'black' ? 'winnerBlack' : 'winnerWhite',
          payload: { playerName: winner?.name },
        },
      })
    } else {
      Object.values(roomPlayers).forEach((player) => {
        void getPlayerRecordDrawCountRef(player.id)
          .set(ServerValue.increment(1))
      })
      void createChat(roomId, {
        message: 'It\'s a draw',
        isAdmin: true,

        systemMessage: { type: 'draw' },
      })
    }
  }

  return new Response(null, { status: 204 })
}
)
