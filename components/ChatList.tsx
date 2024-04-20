import { usePlayer } from '@/hooks/usePlayer'
import { cn } from '@/modules/cn'
import { type Chat } from '@/types/Chat'
import dayjs from 'dayjs'

type Chats = Record<string, Chat>

export function ChatList ({ chats }: { chats: Chats | null }) {
  const { getIsSelf } = usePlayer()

  return (
    <ul className="">
      {
        chats &&
          Object.entries(chats).map(([key, chat]) => (
            <li
              key={key}
              className={cn({ 'text-right': getIsSelf(chat.createdBy) })}
            >
              {chat.playerName}: {chat.message}
              <span className="ml-2 text-sm opacity-70">
                ({dayjs(chat.createdAt).format('llll')})
              </span>
            </li>
          ))
        }
    </ul>
  )
}
