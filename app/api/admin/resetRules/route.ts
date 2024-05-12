import { firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { rules } from '@/modules/firebaseAdmin/rules'
import { checkAdminAuthorization } from '@/modules/firebaseAdmin/checkAdminAuthorization'

export async function POST (request: Request) {
  const authResponse = await checkAdminAuthorization(request)
  if (authResponse.status !== 200) return authResponse

  await firebaseAdminDatabase.setRules(
    JSON.stringify(rules, null, 2)
  )

  return Response.json('The rules has been reset successfully!')
}
