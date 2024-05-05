import 'server-only'
import { firebaseAdminAuth } from '@/modules/firebaseAdmin/firebaseAdmin'

export async function parseAuthorization (request: Request) {
  const authorization = request.headers.get('Authorization')

  const token = authorization?.split('Bearer ').pop()

  if (!token) return null

  try {
    const decodedIdToken = await firebaseAdminAuth.verifyIdToken(token)
    return decodedIdToken
  } catch (err) {}

  return null
}
