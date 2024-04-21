import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'

const database = {
  users: {
  },
  userStates: {
  },
  rooms: {
    1: {
      name: 'Default Room',
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
