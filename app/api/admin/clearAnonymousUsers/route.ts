import { checkAdminAuthorization } from '@/modules/firebaseAdmin/checkAdminAuthorization'
import { firebaseAdminAuth } from '@/modules/firebaseAdmin/firebaseAdmin'

export async function POST (request: Request) {
  const authResponse = await checkAdminAuthorization(request)
  if (authResponse.status !== 200) return authResponse

  await deleteAnonymousUsers()

  return Response.json('Anonymous users have been cleared successfully!')
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
