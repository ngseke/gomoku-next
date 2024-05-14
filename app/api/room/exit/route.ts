import { exitRoom } from '@/modules/firebaseAdmin/exitRoom'
import { parseAuthorization } from '@/modules/firebaseAdmin/parseAuthorization'

export async function POST (
  request: Request,
) {
  const auth = await parseAuthorization()
  if (!auth) return Response.json(null, { status: 403 })

  await exitRoom(request)
  return new Response(null, { status: 204 })
}
