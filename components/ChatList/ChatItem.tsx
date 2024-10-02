import { checkIsEmojiOnly } from '@/modules/checkIsEmojiOnly'
import { cn } from '@/modules/cn'
import { getVisibleLength } from '@/modules/getVisibleLength'
import { type Nullish } from '@/types/Nullish'
import dayjs from 'dayjs'

export function ChatItem ({ name, message, timestamp, hideName, self }: {
  name: Nullish<string>
  message: string
  timestamp: number
  hideName?: boolean
  self?: boolean
}) {
  const formattedDate = dayjs(timestamp).format('YYYY-MM-DD HH:mm')
  const briefTime = dayjs(timestamp).format('HH:mm')
  const shouldShowName = !hideName && !self
  const length = getVisibleLength(message)
  const isEmojiMessage = checkIsEmojiOnly(message)

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
          "max-w-full break-words rounded-xl bg-neutral-200 px-2 py-1 text-sm after:opacity-0 empty:after:content-['-'] dark:bg-neutral-800", {
            'text-3xl bg-transparent dark:bg-transparent': isEmojiMessage,
            'text-6xl': isEmojiMessage && length === 1,
          })}
        >
          {message}
        </span>
        <span className="select-none text-xs text-neutral-600 opacity-0 duration-100 group-hover:opacity-100 dark:text-neutral-400">
          {briefTime}
        </span>
      </span>
    </li>
  )
}
