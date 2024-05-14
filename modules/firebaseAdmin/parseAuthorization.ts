import 'server-only'
import { firebaseAdminAuth } from '@/modules/firebaseAdmin/firebaseAdmin'
import { headers } from 'next/headers'

export async function parseAuthorization () {
  const authorization = headers().get('Authorization')

  const token = authorization?.split('Bearer ').pop()

  if (!token) return null

  try {
    const decodedIdToken = await firebaseAdminAuth.verifyIdToken(token)
    return decodedIdToken
  } catch (err) {}

  return null
}
