import { firebaseAdminDatabase } from '@/modules/firebaseAdmin'
import { type Player } from '@/types/Player'
import { type User } from 'firebase/auth'

export async function POST (
  request: Request,
  { params }: { params: { uid: string } }
) {
  const user = await request.json() as User
  const playerRef = firebaseAdminDatabase.ref(`players/${params.uid}`)

  const snapshot = await playerRef.get()

  const shouldInit = !snapshot.val()

  if (!shouldInit) {
    return Response.json(false)
  }

  const player = {
    id: user.uid,
    name: user.displayName,
    avatar: user.photoURL,
  } satisfies Player

  await playerRef.set(player)

  return new Response(null, { status: 204 })
}
