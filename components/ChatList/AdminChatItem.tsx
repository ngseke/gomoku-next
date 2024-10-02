import dayjs from 'dayjs'

export function AdminChatItem ({ message, timestamp }: {
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
