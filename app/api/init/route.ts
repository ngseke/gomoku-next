import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'

const database = {
  players: {},
  playerStates: {},
  rooms: {},
  boards: {},
  chats: {},
}

export async function POST () {
  await firebaseAdminDatabase.ref().set(database)

  return new Response(null, { status: 204 })
}
