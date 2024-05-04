import { cn } from '@/modules/cn'
import { type Chat } from '@/types/Chat'
import { type Nullish } from '@/types/Nullish'
import dayjs from 'dayjs'

type Chats = Record<string, Chat>

function AdminChatItem ({ message, timestamp }: {
  message: string
  timestamp: number
}) {
  const formattedDate = dayjs(timestamp).format('YYYY-MM-DD HH:mm')

  return (
    <li
      className="max-w-full gap-0.5 self-center break-words py-0.5 text-center text-xs text-neutral-600 dark:text-neutral-400"
      title={formattedDate}
    >
      {message}
    </li>
  )
}

function ChatItem ({ name, message, timestamp, hideName, self }: {
  name: Nullish<string>
  message: string
  timestamp: number
  hideName?: boolean
  self?: boolean
}) {
  const formattedDate = dayjs(timestamp).format('YYYY-MM-DD HH:mm')
  const briefTime = dayjs(timestamp).format('HH:mm')
  const shouldShowName = !hideName && !self

  return (
    <li
      className={cn('group flex w-full max-w-[80%] flex-col items-start gap-0.5', {
        'self-end items-end': self,
      })}
      title={formattedDate}
    >
      {shouldShowName &&
        <span className="mt-2 max-w-full truncate text-xs font-medium text-neutral-600 dark:text-neutral-400" title={name ?? undefined}>
          {name}
        </span>}
      <span className={cn('relative flex max-w-full items-end gap-1', {
        'flex-row-reverse': self,
      })}
      >
        <span className={cn(
          "max-w-full break-words rounded-xl bg-neutral-200 px-2 py-1 text-sm after:opacity-0 empty:after:content-['-'] dark:bg-neutral-800",
        )}
        >
          {message}
        </span>
        <span className="text-xs text-neutral-600 opacity-0 duration-100 group-hover:opacity-100 dark:text-neutral-400">
          {briefTime}
        </span>
      </span>
    </li>
  )
}

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
