import { firebaseAdminAuth } from '@/modules/firebaseAdmin/firebaseAdmin'
import { withAuth } from '@/modules/firebaseAdmin/withAuth'

export const POST = withAuth(async ({ auth }) => {
  const user = await firebaseAdminAuth.getUser(auth.uid)
  const isAnonymous = !user.providerData.length

  if (isAnonymous) {
    void firebaseAdminAuth.deleteUser(user.uid)
  }

  return new Response(null, { status: 204 })
})
