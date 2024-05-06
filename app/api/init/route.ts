import { firebaseAdminAuth, firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'

export async function POST () {
  await firebaseAdminDatabase.ref().set({})
  await setRules()
  await deleteAnonymousUsers()

  return new Response(null, { status: 204 })
}

async function deleteAnonymousUsers (nextPageToken?: string) {
  const { users, pageToken } =
    await firebaseAdminAuth.listUsers(20, nextPageToken)

  await Promise.allSettled(users.map(async (user) => {
    const isAnonymous = (user.providerData.length === 0)
    if (isAnonymous) {
      await firebaseAdminAuth.deleteUser(user.uid)
      console.log(`\`${user.uid}\` deleted.`)
    }
  }))

  if (pageToken) {
    await deleteAnonymousUsers(pageToken)
  }
}

async function setRules () {
  const rules = {
    rules: {
      chats: {
        '.read': true,
        '.write': false,
      },
      playerStates: {
        $playerId: {
          '.read': '$playerId === auth.uid',
          '.write': '$playerId === auth.uid',
        },
      },
      playerMousePositions: {
        $playerId: {
          '.write': '$playerId === auth.uid',
          '.read': true,
          0: { '.validate': 'newData.isNumber()' },
          1: { '.validate': 'newData.isNumber()' },
        },
      },
      rooms: {
        $roomId: {
          '.read': true,
          players: {
            $playerId: {
              '.write': '$playerId === auth.uid',
            },
          },
        },
      },
      boards: {
        '.read': true,
        '.write': false,
      },
    },
  }

  await firebaseAdminDatabase.setRules(
    JSON.stringify(rules, null, 2)
  )
}
