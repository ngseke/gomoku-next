import { headers } from 'next/headers'

export function getSessionId () {
  const sessionId = headers().get('X-Session-Id')

  return sessionId
}
