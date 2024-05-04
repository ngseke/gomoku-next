import { firebaseAdminAuth, firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'

export async function POST () {
  await firebaseAdminDatabase.ref().set({})
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
