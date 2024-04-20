import { firebaseAdminAuth } from '@/modules/firebaseAdmin'

export async function parseAuthorization (request: Request) {
  const authorization = request.headers.get('Authorization')

  const token = authorization?.split('Bearer ').pop()

  if (!token) return null

  const decodedIdToken = await firebaseAdminAuth.verifyIdToken(token)

  return decodedIdToken
}
