import 'server-only'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'
import { fetchPlayerState } from './fetchPlayerState'
import { fetchRoom } from './fetchRoom'
import { fetchPlayer } from './fetchPlayer'
import { createChat } from './createChat'
import { getPlayerStateRef, getRoomPlayerRef } from './refs'
import { runParallel } from '../runParallel'

export async function exitRoom (request: Request) {
  const auth = await parseAuthorization()
  if (!auth) return

  const [player, playerState] = await Promise.all([
    fetchPlayer(auth),
    fetchPlayerState(),
  ])

  if (!player || !playerState) return

  const { roomId } = playerState

  await runParallel(
    async function updateRoom () {
      const roomPlayerRef = getRoomPlayerRef(roomId, player.id)
      await roomPlayerRef.remove()
    },
    async function updatePlayerState () {
      const playerStateRef = getPlayerStateRef(player.id)
      await playerStateRef.remove()
    },
  )

  const room = await fetchRoom(roomId)

  if (room) {
    void createChat(roomId, {
      message: `${player.name} has left`,
      isAdmin: true,

      systemMessage: {
        type: 'playerLeft',
        payload: { playerName: player.name },
      },
    })
  }
}
