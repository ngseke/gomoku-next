import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'

export async function checkAdminAuthorization (request: Request) {
  const adminUid = process.env.ADMIN_UID
  if (!adminUid) {
    return Response.json(
      'Missing env `ADMIN_UID`!',
      { status: 500 }
    )
  }

  const auth = await parseAuthorization()
  if (auth?.uid !== adminUid) {
    return Response.json(
      'Unauthorized! (`ADMIN_UID` is not matched)',
      { status: 403 }
    )
  }

  return new Response(null, { status: 200 })
}
