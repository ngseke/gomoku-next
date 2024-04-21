export function parseSessionId (request: Request) {
  const sessionId = request.headers.get('X-Session-Id')

  return sessionId
}
