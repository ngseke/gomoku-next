import { type BoardRecordWithId } from '@/types/BoardRecord'
import { type Nullish } from '@/types/Nullish'
import { Piece } from './GomokuBoard/Piece'
import { formatPosition } from '@/modules/formatPosition'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { cn } from '@/modules/cn'

dayjs.extend(localizedFormat)

export function BoardRecordList ({ records, onHover }: {
  records: Nullish<BoardRecordWithId[]>
  onHover?: (record: BoardRecordWithId | null) => void
}) {
  return (
    <ul className="divide-y divide-neutral-200 py-4 dark:divide-neutral-800">
      {records?.map((record, index) => {
        const formatted = formatPosition(record)
        const isLast = index === records.length - 1

        return (
          <li
            key={record.id}
            className="p-2 text-sm hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
            onMouseOut={() => onHover?.(null)}
            onMouseOver={() => onHover?.(record)}
          >
            <div className="grid grid-cols-[1.75rem_1.5rem_2.5rem_1fr] items-center gap-4">
              <div
                className={cn('text-right font-mono duration-200', {
                  'text-[#fcb69f] font-bold': isLast,
                })}
              >
                {index + 1}
              </div>
              <div className="flex items-center">
                <Piece color={record.piece} />
              </div>
              <div
                className={cn('font-mono duration-200', {
                  'text-[#fcb69f] font-bold': isLast,
                })}
              >
                {formatted.x}{formatted.y}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                {dayjs(record.createdAt).format('HH:mm:ss')}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
