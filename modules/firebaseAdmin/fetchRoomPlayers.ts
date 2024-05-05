import 'server-only'
import { type RoomPlayers } from '@/types/Room'
import { getRoomPlayersRef } from './refs'

export async function fetchRoomPlayers (roomId: string) {
  const roomPlayersRef = getRoomPlayersRef(roomId)

  const roomPlayers = (await roomPlayersRef.get()).val() as RoomPlayers | null

  return roomPlayers
}
