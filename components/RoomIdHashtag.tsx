import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type PropsWithChildren } from 'react'

export function RoomIdHashtag ({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-lg border border-neutral-200 px-1 py-0.5 font-mono text-xs text-neutral-200 duration-300 dark:border-neutral-800 dark:text-neutral-800">
      <FontAwesomeIcon icon={faHashtag} />
      <span className="text-neutral-600 dark:text-neutral-400">
        {children}
      </span>
    </span>
  )
}
