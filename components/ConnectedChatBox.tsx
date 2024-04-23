import { useChats } from '@/hooks/useChats'
import { useSendChat } from '@/hooks/useSendChat'
import { type Nullish } from '@/types/Nullish'
import { ChatBox } from './ChatBox'

export function ConnectedChatBox ({ roomId }: { roomId: Nullish<string> }) {
  const { chats } = useChats(roomId)

  const { message, setMessage, send, isSending, error } =
    useSendChat(roomId)

  return (
    <ChatBox
      chats={chats}
      disabled={isSending}
      error={error}
      message={message}
      setMessage={setMessage}
      onSubmit={send}
    />
  )
}
