import { exitRoom } from '@/modules/firebaseAdmin/exitRoom'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { parseSessionId } from '@/modules/firebaseAdmin/parseSessionId'

export async function POST (
  request: Request,
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const sessionId = parseSessionId(request)
  if (!sessionId) {
    return Response.json(
      'Missing header `X-Session-Id`',
      { status: 400 }
    )
  }

  await exitRoom(request)
  return new Response(null, { status: 204 })
}
