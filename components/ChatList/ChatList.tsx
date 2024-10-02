import { type Chat } from '@/types/Chat'
import { type Nullish } from '@/types/Nullish'
import { AdminChatItem } from './AdminChatItem'
import { SystemChatItem } from './SystemChatItem'
import { ChatItem } from './ChatItem'

type Chats = Record<string, Chat>

export function ChatList ({ chats, playerId }: {
  chats: Chats | null
  playerId: Nullish<string>
}) {
  function getIsSelf (id: Nullish<string>) {
    if (!playerId) return false
    return id === playerId
  }

  const entries = chats ? Object.entries(chats) : []

  const hideNameThreshold = 1000 * 10

  return (
    <ul className="flex h-full flex-col items-start gap-1">
      {
        entries.map(([key, chat], index) => {
          if (chat.systemMessage) {
            return (
              <SystemChatItem
                key={key}
                systemMessage={chat.systemMessage}
                timestamp={chat.createdAt}
              />
            )
          }

          if (chat.isAdmin) {
            return (
              <AdminChatItem
                key={key}
                message={chat.message}
                timestamp={chat.createdAt}
              />
            )
          }

          const previousChat = entries[index - 1]?.[1] as Chat | undefined
          const shouldHideName =
            previousChat &&
            (chat.createdBy === previousChat.createdBy) &&
            (chat.createdAt - previousChat.createdAt <= hideNameThreshold)

          return (
            <ChatItem
              key={key}
              hideName={shouldHideName}
              message={chat.message}
              name={chat.playerName}
              self={getIsSelf(chat.createdBy)}
              timestamp={chat.createdAt}
            />
          )
        })
      }
    </ul>
  )
}
