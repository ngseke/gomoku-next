import { type BoardRecordWithId } from '@/types/BoardRecord'
import { type Nullish } from '@/types/Nullish'
import { useEffect, useRef } from 'react'
import { BoardRecordList } from './BoardRecordList'

function NoMovesMessage () {
  return (
    <div className="flex h-full items-center justify-center p-4 text-sm text-neutral-600 dark:text-neutral-400">
      There are no moves yet.
    </div>
  )
}

export interface BoardRecordBoxProps {
  records: Nullish<BoardRecordWithId[]>
  onHover?: (record: BoardRecordWithId | null) => void
}

export function BoardRecordBox ({
  records,
  onHover,
}: BoardRecordBoxProps) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollableRef.current?.scrollTo(0, Number.MAX_SAFE_INTEGER)
  }, [records?.length])

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 px-3 transition-colors duration-300 dark:border-neutral-800">
      <div ref={scrollableRef} className="-mr-3 flex-1 overflow-auto scroll-smooth scrollbar">
        <div className="h-full max-w-full pr-3">
          {records?.length
            ? <BoardRecordList records={records} onHover={onHover} />
            : <NoMovesMessage />}
        </div>
      </div>
    </div>
  )
}
