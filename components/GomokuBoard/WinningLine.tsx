import { type Position } from '@/types/Position'
import { cn } from '@/modules/cn'
import { type Nullish } from '@/types/Nullish'
import { type WinningLine as WinningLineType } from '@/types/WinningLine'

export function WinningLine ({ direction, position }: {
  direction?: WinningLineType['direction']
  position?: Nullish<Position>
}) {
  if (!position) return null

  const leftTopPosition: Position = {
    x: position.x - 3,
    y: position.y - 3,
  }

  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-10 flex size-1/3 items-center justify-center"
      style={{
        left: `${(leftTopPosition.x / 15) * 100}%`,
        top: `${(leftTopPosition.y / 15) * 100}%`,
      }}
    >
      <div
        className={cn(
          'size-[6%] rounded-full bg-gradient-to-b from-[#fcb69f] to-[#ffecd2] opacity-70',
          {
            'h-full': direction === 'vertical',
            'w-full bg-gradient-to-r': direction === 'horizontal',
            'h-[140%] -rotate-45 ': direction === 'majorDiagonal',
            'h-[140%] rotate-45': direction === 'minorDiagonal',
          }
        )}
      />
    </div>
  )
}
