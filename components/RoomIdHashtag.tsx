import { type Nullish } from '@/types/Nullish'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Skeleton () {
  return (
    <span className="my-0.5 h-3 w-10 rounded-md bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800" />
  )
}

export function RoomIdHashtag ({ roomId }: { roomId: Nullish<string> }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-1 py-0.5 font-mono text-xs text-neutral-200 dark:border-neutral-800 dark:text-neutral-800"
      title={`Room ID: ${roomId}`}
    >
      <FontAwesomeIcon icon={faHashtag} />

      {roomId
        ? <span className="text-neutral-600 dark:text-neutral-400">
          {roomId}
        </span>
        : <Skeleton />}
    </span>
  )
}
