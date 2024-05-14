import { firebaseAdminAuth } from '@/modules/firebaseAdmin/firebaseAdmin'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'

export async function POST (request: Request) {
  const auth = await parseAuthorization()
  if (!auth) return Response.json(null, { status: 403 })

  const user = await firebaseAdminAuth.getUser(auth.uid)
  const isAnonymous = !user.providerData.length

  if (isAnonymous) {
    void firebaseAdminAuth.deleteUser(user.uid)
  }

  return new Response(null, { status: 204 })
}
