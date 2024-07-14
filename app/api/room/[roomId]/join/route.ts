import { createChat } from '@/modules/firebaseAdmin/createChat'
import { exitRoom } from '@/modules/firebaseAdmin/exitRoom'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { fetchRoom } from '@/modules/firebaseAdmin/fetchRoom'
import { fetchRoomPlayers } from '@/modules/firebaseAdmin/fetchRoomPlayers'
import { getSessionId } from '@/modules/firebaseAdmin/parseSessionId'
import { getPlayerStateRef, getRoomPlayerRef } from '@/modules/firebaseAdmin/refs'
import { withAuth } from '@/modules/firebaseAdmin/withAuth'
import { runParallel } from '@/modules/runParallel'
import { type Piece } from '@/types/Piece'
import { type PlayerState } from '@/types/PlayerState'
import { type RoomPlayers, type RoomPlayer } from '@/types/Room'
import { ServerValue } from 'firebase-admin/database'

function getNextPiece (roomPlayers: RoomPlayers | null): Piece | null {
  if (!roomPlayers) return 'black'

  const players = Object.values(roomPlayers)
  if (players.length >= 2) return null

  const [anotherPlayer] = players
  return anotherPlayer.piece === 'black' ? 'white' : 'black'
}

export const POST = withAuth(async (
  request,
  { params }: { params: { roomId: string } }
) => {
  const { auth } = request
  const player = await fetchPlayer(auth)

  const sessionId = getSessionId()
  if (!sessionId) {
    return Response.json(
      'Missing header `X-Session-Id`',
      { status: 400 }
    )
  }

  const { roomId } = params

  const room = await fetchRoom(roomId)
  if (!room) {
    return Response.json(
      `Room \`${roomId}\` does not exist!`,
      { status: 400 }
    )
  }

  await exitRoom(request)

  const roomPlayers = await fetchRoomPlayers(roomId)

  // Get available piece
  const piece = getNextPiece(roomPlayers)
  if (!piece) {
    return Response.json('The room is full!', { status: 400 })
  }

  await runParallel(
    async function updateRoom () {
      const roomPlayerRef = getRoomPlayerRef(roomId, player.id)
      await roomPlayerRef.set({
        ...player,
        sessionId,
        joinedAt: ServerValue.TIMESTAMP as number,
        piece,
      } satisfies RoomPlayer)
    },
    async function updatePlayerState () {
      const playerStateRef = getPlayerStateRef(player.id)
      await playerStateRef.set({
        sessionId,
        roomId,
        type: 'game',
      } satisfies PlayerState)
    }
  )

  void createChat(roomId, {
    message: `${player.name} has joined`,
    isAdmin: true,

    systemMessage: {
      type: 'playerJoined',
      payload: { playerName: player.name },
    },
  })

  return new Response(null, { status: 204 })
})
