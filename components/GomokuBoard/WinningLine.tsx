import { type Position } from '@/types/Position'
import { cn } from '@/modules/cn'
import { type Nullish } from '@/types/Nullish'
import { type WinningLine as WinningLineType } from '@/types/WinningLine'
import { type CSSProperties } from 'react'

export function WinningLine ({ direction, position }: {
  direction?: WinningLineType['direction']
  position?: Nullish<Position>
}) {
  if (!(direction && position)) return null

  const leftTopPosition: Position = {
    x: (position?.x ?? 0) - 2,
    y: (position?.y ?? 0) - 2,
  }

  const isDiagonal = direction?.includes('Diagonal')

  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-10 flex size-1/3 items-center justify-center"
      style={{
        left: `${(leftTopPosition.x / 15) * 100}%`,
        top: `${(leftTopPosition.y / 15) * 100}%`,
      }}
    >
      <div
        key={[direction, position?.x, position?.y].join()}
        className={cn(
          'w-[6%] animate-extend rounded-full bg-gradient-to-b from-[#00c6fb] to-[#005bea] opacity-70',
          {
            'rotate-90': direction === 'horizontal',
            '-rotate-45 ': direction === 'majorDiagonal',
            'rotate-45': direction === 'minorDiagonal',
          },
          isDiagonal ? 'h-[140%]' : 'h-full'
        )}
        style={{
          '--from-height': '0%',
          '--to-height': isDiagonal ? '140%' : '100%',
        } as CSSProperties}
      />
    </div>
  )
}
