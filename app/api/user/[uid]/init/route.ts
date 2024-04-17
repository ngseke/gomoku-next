import { firebaseDatabase } from '@/modules/firebase'
import { type User } from 'firebase/auth'
import { get, ref, set } from 'firebase/database'

export async function POST (
  request: Request,
  { params }: { params: { uid: string } }
) {
  const user = await request.json() as User
  const userRef = ref(firebaseDatabase, `users/${params.uid}`)

  const userSnapshot = await get(userRef)

  const shouldInit = !userSnapshot.val()

  if (!shouldInit) {
    return Response.json(false)
  }

  await set(userRef, user)

  return new Response(null, { status: 204 })
}
