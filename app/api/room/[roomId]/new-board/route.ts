import { getNextBoardFirstPiece } from '@/modules/boardGrid'
import { createBoard } from '@/modules/firebaseAdmin/createBoard'
import { createChat } from '@/modules/firebaseAdmin/createChat'
import { fetchBoard } from '@/modules/firebaseAdmin/fetchBoard'
import { getRoomRef } from '@/modules/firebaseAdmin/refs'
import { withAuth } from '@/modules/firebaseAdmin/withAuth'

export const POST = withAuth(async (
  _request,
  { params: { roomId } }: { params: { roomId: string } }
) => {
  const roomRef = getRoomRef(roomId)
  const boardIdRef = roomRef.child('boardId')

  const oldBoardId = (await boardIdRef.get()).val()
  const board = await fetchBoard(oldBoardId)
  const nextPiece = getNextBoardFirstPiece(board?.firstPiece)

  const newBoardId = await createBoard(nextPiece)
  await boardIdRef.set(newBoardId)

  const message = 'A new round has started'
  void createChat(roomId, {
    message,
    isAdmin: true,

    systemMessage: { type: 'newRoundStarted' },
  })

  return new Response(null, { status: 204 })
})
