import { createChat } from '@/modules/firebaseAdmin/createChat'
import { exitRoom } from '@/modules/firebaseAdmin/exitRoom'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { fetchRoom } from '@/modules/firebaseAdmin/fetchRoom'
import { fetchRoomPlayers } from '@/modules/firebaseAdmin/fetchRoomPlayers'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { parseSessionId } from '@/modules/firebaseAdmin/parseSessionId'
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

export async function POST (
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const sessionId = parseSessionId(request)
  if (!sessionId) {
    return Response.json(
      'Missing header `X-Session-Id`',
      { status: 400 }
    )
  }

  const { roomId } = params

  const room = await fetchRoom(request, roomId)
  if (!room) {
    return Response.json(
      `Room \`${roomId}\` does not exist!`,
      { status: 400 }
    )
  }

  await exitRoom(request)

  const roomPlayers = await fetchRoomPlayers(roomId)

  // Check if has joined
  const hasSelfJoined = roomPlayers?.[player.id]
  if (hasSelfJoined) {
    return Response.json('You have joined this room!', { status: 400 })
  }

  // Get available piece
  const piece = getNextPiece(roomPlayers)
  if (!piece) {
    return Response.json('The room is full!', { status: 400 })
  }

  // Update Room
  const roomRef = firebaseAdminDatabase.ref(`rooms/${roomId}`)
  const roomPlayerRef = roomRef.child(`players/${player.id}`)
  await roomPlayerRef.set({
    ...player,
    sessionId,
    joinedAt: ServerValue.TIMESTAMP as number,
    piece,
  } satisfies RoomPlayer)

  // Update Player State
  const playerStateRef = firebaseAdminDatabase.ref(`playerStates/${player.id}`)
  await playerStateRef.set({
    sessionId,
    roomId,
    type: 'game',
  } satisfies PlayerState)

  void createChat(roomId, {
    message: `${player.name} has joined`,
    isAdmin: true,
  })

  return new Response(null, { status: 204 })
}
