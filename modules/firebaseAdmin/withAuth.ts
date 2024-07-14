import 'server-only'
import { parseAuthorization } from './parseAuthorization'
import { type DecodedIdToken } from 'firebase-admin/auth'

interface RequestWithAuth extends Request {
  auth: DecodedIdToken
}

export function withAuth<Args extends any[]> (
  handler: (request: RequestWithAuth, ...args: Args) => unknown,
) {
  return async function (request: RequestWithAuth, ...args: Args) {
    const auth = await parseAuthorization()
    if (!auth) return Response.json(null, { status: 403 })

    request.auth = auth
    return handler(request, ...args)
  }
}
