import { firebaseAdminDatabase } from '@/modules/firebaseAdmin'

const database = {
  users: {
  },
  userStates: {
  },
  rooms: {
    room1: {
      name: 'Room 1',
    },
  },
  roomStates: {
    room1: {
      users: {
      },
      boards: {

      },
    },
  },
  boards: {},
  chats: {
    room1: {},
  },

}

export async function POST () {
  await firebaseAdminDatabase.ref().set(database)

  return new Response(null, { status: 204 })
}
