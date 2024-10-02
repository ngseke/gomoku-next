import { type SystemMessage } from '@/types/Chat'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { type ReactNode } from 'react'

export function SystemChatItem ({ systemMessage, timestamp }: {
  systemMessage: SystemMessage
  timestamp: number
}) {
  const formattedDate = dayjs(timestamp).format('YYYY-MM-DD HH:mm')
  const t = useTranslations()

  const { type, payload } = systemMessage

  const values = {
    ...payload,
    tag: (chunks: ReactNode) => (
      <span className="font-mono font-bold">
        <FontAwesomeIcon icon={faHashtag} />{chunks}
      </span>
    ),
    mono: (chunks: ReactNode) => <span className="font-mono">{chunks}</span>,
    b: (chunks: ReactNode) => <b className="font-bold">{chunks}</b>,
    hashtag: () => <FontAwesomeIcon icon={faHashtag} />,
  }

  const message = t.rich(`chat.${type}`, values)

  return (
    <li
      className="flex max-w-full items-center gap-0.5 self-center break-words py-0.5 text-center text-xs text-neutral-600 dark:text-neutral-400"
      title={formattedDate}
    >
      {message}
    </li>
  )
}
