import { checkAdminAuthorization } from '@/modules/firebaseAdmin/checkAdminAuthorization'
import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'

export async function POST (request: Request) {
  const authResponse = await checkAdminAuthorization(request)
  if (authResponse.status !== 200) return authResponse

  await firebaseAdminDatabase.ref().set({})

  return Response.json('The database has been cleared successfully!')
}
