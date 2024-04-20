import { usePlayer } from '@/hooks/usePlayer'
import { cn } from '@/modules/cn'
import { type Chat } from '@/types/Chat'
import dayjs from 'dayjs'

type Chats = Record<string, Chat>

function ChatItem ({ name, message, timestamp, hideName, self }: {
  name: string | null
  message: string
  timestamp: number
  hideName?: boolean
  self?: boolean
}) {
  const formattedDate = dayjs(timestamp).format('YYYY-MM-DD HH:mm')
  const shouldShowName = !hideName && !self

  return (
    <li
      className={cn('flex flex-col items-start gap-0.5', {
        'self-end items-end': self,
      })}
      title={formattedDate}
    >
      {
        shouldShowName &&
          <span className="text-xs font-medium text-neutral-600">
            {name}
          </span>
      }

      <span className={cn(
        "rounded-xl bg-neutral-200 px-2 py-1 text-sm after:opacity-0 empty:after:content-['-']",
      )}
      >
        {message}
      </span>
    </li>
  )
}

export function ChatList ({ chats }: { chats: Chats | null }) {
  const { getIsSelf } = usePlayer()

  const entries = chats ? Object.entries(chats) : []

  return (
    <ul className="flex h-full flex-col items-start gap-1">
      {
        entries.map(([key, chat]) => (
          <ChatItem
            key={key}
            message={chat.message}
            name={chat.playerName}
            self={getIsSelf(chat.createdBy)}
            timestamp={chat.createdAt}
          />
        ))
      }
    </ul>
  )
}
