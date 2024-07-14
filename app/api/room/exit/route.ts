import { exitRoom } from '@/modules/firebaseAdmin/exitRoom'
import { withAuth } from '@/modules/firebaseAdmin/withAuth'

export const POST = withAuth(async (request) => {
  await exitRoom(request)
  return new Response(null, { status: 204 })
})
