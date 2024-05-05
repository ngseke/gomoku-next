import 'server-only'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { fetchPlayerState } from './fetchPlayerState'
import { fetchRoom } from './fetchRoom'
import { fetchPlayer } from './fetchPlayer'
import { createChat } from './createChat'
import { getPlayerStateRef, getRoomPlayerRef } from './refs'

export async function exitRoom (request: Request) {
  const auth = await parseAuthorization(request)
  if (!auth) return

  const [player, playerState] = await Promise.all([
    fetchPlayer(request),
    fetchPlayerState(request),
  ])

  if (!player || !playerState) return

  const { roomId } = playerState

  const room = await fetchRoom(request, roomId)
  if (room) {
    // Update Room
    const roomPlayerRef = getRoomPlayerRef(roomId, player.id)
    await roomPlayerRef.remove()
  }

  // Update Player State
  const playerStateRef = getPlayerStateRef(player.id)
  await playerStateRef.remove()

  if (room) {
    void createChat(roomId, {
      message: `${player.name} has left`,
      isAdmin: true,
    })
  }
}
