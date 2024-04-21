import { cn } from '@/modules/cn'
import { type PropsWithChildren } from 'react'

const size = 15
const dotPositions = [[3, 3], [11, 3], [3, 11], [11, 11], [7, 7]]

function Cell ({ children, x, y }: PropsWithChildren<{
  x: number
  y: number
} >) {
  const shouldShowDot = dotPositions.some(
    position => x === position[0] && y === position[1]
  )

  return (
    <div className="relative aspect-square">
      <span
        className={cn(
          'absolute left-1/2 h-full -translate-x-1/2 border-l border-neutral-300', {
            'h-1/2 top-1/2': y === 0,
            'h-1/2': y === size - 1,
          }
        )}
      />
      <span
        className={cn(
          'absolute top-1/2 w-full -translate-y-1/2 border-t border-neutral-300', {
            'w-1/2 left-1/2': x === 0,
            'w-1/2': x === size - 1,
          }
        )}
      />
      {shouldShowDot && (
        <span className="absolute left-1/2 top-1/2 size-1/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-300" />
      )}
      {children}
    </div>
  )
}

export function Board () {
  return (
    <div className="grid w-[500px] max-w-full grid-cols-15">
      {
        Array.from({ length: size ** 2 }).map((_, index) => (
          <Cell
            key={index}
            x={index % size}
            y={Math.floor(index / size)}
          />
        ))
      }
    </div>
  )
}
