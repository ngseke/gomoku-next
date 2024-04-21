import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { type RoomPlayers } from '@/types/Room'

export async function fetchRoomPlayers (roomId: string) {
  const roomPlayersRef = firebaseAdminDatabase.ref(`rooms/${roomId}/players`)

  const roomPlayers = (await roomPlayersRef.get()).val() as RoomPlayers | null

  return roomPlayers
}
