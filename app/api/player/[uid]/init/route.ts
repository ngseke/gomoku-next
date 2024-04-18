import { firebaseDatabase } from '@/modules/firebase'
import { type Player } from '@/types/Player'
import { type User } from 'firebase/auth'
import { get, ref, set } from 'firebase/database'

export async function POST (
  request: Request,
  { params }: { params: { uid: string } }
) {
  const user = await request.json() as User
  const playerRef = ref(firebaseDatabase, `players/${params.uid}`)

  const snapshot = await get(playerRef)

  const shouldInit = !snapshot.val()

  if (!shouldInit) {
    return Response.json(false)
  }

  const player = {
    id: user.uid,
    name: user.displayName,
    photoUrl: user.photoURL,
  } satisfies Player

  await set(playerRef, player)

  return new Response(null, { status: 204 })
}
