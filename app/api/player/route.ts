import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'

export async function GET (
  request: Request,
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  return Response.json(player)
}
