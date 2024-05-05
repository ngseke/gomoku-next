import 'server-only'
import { firebaseAdminDatabase } from './firebaseAdmin'

export function getRoomRef (roomId: string) {
  return firebaseAdminDatabase.ref(`rooms/${roomId}`)
}

export function getRoomPlayersRef (roomId: string) {
  return getRoomRef(roomId).child('players')
}

export function getRoomPlayerRef (roomId: string, playerId: string) {
  return getRoomPlayersRef(roomId).child(playerId)
}

export function getBoardsRef () {
  return firebaseAdminDatabase.ref('boards')
}

export function getBoardRef (boardId: string) {
  return getBoardsRef().child(boardId)
}

export function getBoardRecordsRef (boardId: string) {
  return getBoardRef(boardId).child('records')
}

export function getBoardResultRef (boardId: string) {
  return getBoardRef(boardId).child('result')
}

export function getChatsRef (roomId: string) {
  return firebaseAdminDatabase.ref(`chats/${roomId}`)
}

export function getPlayerRef (playerId: string) {
  return firebaseAdminDatabase.ref(`players/${playerId}`)
}

export function getPlayerStateRef (playerId: string) {
  return firebaseAdminDatabase.ref(`playerStates/${playerId}`)
}
