import { firebaseDatabase } from '@/modules/firebase'
import { ref, set } from 'firebase/database'

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
  await set(ref(firebaseDatabase), database)

  return new Response(null, { status: 204 })
}
