import { useChats } from '@/hooks/useChats'
import { useSendChat } from '@/hooks/useSendChat'
import { type Nullish } from '@/types/Nullish'
import { ChatBox } from './ChatBox'
import { usePlayer } from '@/hooks/usePlayer'

export function ConnectedChatBox ({ roomId, disabled }: {
  roomId: Nullish<string>
  disabled?: boolean
}) {
  const { chats } = useChats(roomId)

  const { message, setMessage, send, isSending, error } =
    useSendChat(roomId)

  const { player } = usePlayer()

  return (
    <ChatBox
      chats={chats}
      disabled={Boolean(isSending || disabled)}
      error={error}
      message={message}
      playerId={player?.id}
      setMessage={setMessage}
      onSubmit={send}
    />
  )
}
