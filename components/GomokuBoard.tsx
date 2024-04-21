import { cn } from '@/modules/cn'
import { type Board } from '@/types/Board'
import { type PropsWithChildren } from 'react'

const size = 15
const dotPositions = [[3, 3], [11, 3], [3, 11], [11, 11], [7, 7]]

function Piece ({
  color,
}: { color: 'black' | 'white' }) {
  return (
    <div
      className={cn('size-9/12 rounded-full border border-transparent bg-gradient-to-tr from-neutral-200 to-neutral-200', {
        'from-[#000] to-[#434343] bg-gradient-to-tr': color === 'black',
        'from-[#cfd4d7] to-[#fdfbfb] border-neutral-300': color === 'white',
      })}
    />
  )
}

function Cell ({ children, x, y, onClick, disabled }: PropsWithChildren<{
  x: number
  y: number
  onClick?: () => void
  disabled?: boolean
} >) {
  const shouldShowDot = dotPositions.some(
    position => x === position[0] && y === position[1]
  )

  return (
    <button
      className="relative flex aspect-square"
      disabled={disabled}
      onClick={onClick}
    >
      <span
        className={cn(
          'absolute left-1/2 -z-10 h-full -translate-x-1/2 border-l border-neutral-300', {
            'h-1/2 top-1/2': y === 0,
            'h-1/2': y === size - 1,
          }
        )}
      />
      <span
        className={cn(
          'absolute top-1/2 -z-10 w-full -translate-y-1/2 border-t border-neutral-300', {
            'w-1/2 left-1/2': x === 0,
            'w-1/2': x === size - 1,
          }
        )}
      />
      {shouldShowDot && (
        <span className="absolute left-1/2 top-1/2 -z-10 size-1/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-300" />
      )}

      <div className="z-10 flex size-full items-center justify-center">
        {children}
      </div>
    </button>
  )
}

export function GomokuBoard ({ board, onPlace, disabled }: {
  board?: Board
  onPlace?: (x: number, y: number) => void
  disabled?: boolean
}) {
  function handleClick (x: number, y: number) {
    onPlace?.(x, y)
  }

  return (
    <div className="grid w-[500px] max-w-full grid-cols-15">
      {Array.from({ length: size ** 2 }).map((_, index) => {
        const x = index % size
        const y = Math.floor(index / size)

        const piece = board?.[x]?.[y]

        return (
          <Cell
            key={index}
            disabled={Boolean(piece) || disabled}
            x={x}
            y={y}
            onClick={() => { handleClick(x, y) }}
          >
            {piece && <Piece color={piece.piece} />}
          </Cell>
        )
      })}
    </div>
  )
}
