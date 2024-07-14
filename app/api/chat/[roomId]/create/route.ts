import { chatMessageMaxLength } from '@/modules/constants'
import { createChat } from '@/modules/firebaseAdmin/createChat'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'
import { withAuth } from '@/modules/firebaseAdmin/withAuth'

export const POST = withAuth(async (
  request,
  { params }: { params: { roomId: string } }
) => {
  const { auth } = request
  const player = await fetchPlayer(auth)

  const { roomId } = params
  const { message } = await request.json()

  const slicedMessage = (message as string).slice(0, chatMessageMaxLength)

  await createChat(roomId, {
    message: slicedMessage,
    createdBy: player.id,
    playerName: player.name,
  })

  return new Response(null, { status: 204 })
}
)
