import { chatMessageMaxLength } from '@/modules/constants'
import { createChat } from '@/modules/firebaseAdmin/createChat'
import { fetchPlayer } from '@/modules/firebaseAdmin/fetchPlayer'

export async function POST (
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const player = await fetchPlayer(request)
  if (!player) return Response.json(null, { status: 403 })

  const { roomId } = params
  const { message } = await request.json()

  const slicedMessage = (message as string).slice(0, chatMessageMaxLength)

  const chat = await createChat(roomId, {
    message: slicedMessage,
    createdBy: player.id,
    playerName: player.name,
  })

  return Response.json(chat)
}
