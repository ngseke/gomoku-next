import { cn } from '@/modules/cn'
import { type Position } from '@/types/Position'
import { type PropsWithChildren } from 'react'
import { PieceGhost } from './Piece'

const size = 15

const starPointPositions = [[3, 3], [11, 3], [3, 11], [11, 11], [7, 7]]

const cornerPositions = [[0, 0], [0, size - 1], [size - 1, 0], [size - 1, size - 1]]

function StarPoint () {
  return (
    <span className="absolute left-1/2 top-1/2 -z-10 size-1/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-300" />
  )
}

function Corner ({ x, y }: Position) {
  const isTopLeft = !x && !y
  const isTopRight = x === size - 1 && !y
  const isBottomLeft = !x && y === size - 1
  const isBottomRight = x === size - 1 && y === size - 1

  return (
    <span
      className={cn('absolute -z-10 size-full border-neutral-300', {
        'left-1/2 top-1/2 translate-x-[-.5px] translate-y-[-.5px] rounded-tl-[50%] border-l border-t': isTopLeft,
        'right-1/2 top-1/2 translate-x-[.5px] translate-y-[-.5px] rounded-tr-[50%] border-r border-t': isTopRight,
        'bottom-1/2 left-1/2 translate-x-[-.5px] translate-y-[.5px] rounded-bl-[50%] border-b border-l': isBottomLeft,
        'bottom-1/2 right-1/2 translate-x-[.5px] translate-y-[.5px] rounded-br-[50%] border-b border-r': isBottomRight,
      })}
    />
  )
}

function VerticalLine ({ x, y }: Position) {
  return (
    <span
      className={cn(
        'absolute left-1/2 -z-10 h-full -translate-x-1/2 border-l border-neutral-300', {
          'h-1/2 top-1/2': y === 0,
          'h-1/2': y === size - 1,
        }
      )}
    />
  )
}

function HorizontalLine ({ x, y }: Position) {
  return (
    <span
      className={cn(
        'absolute top-1/2 -z-10 w-full -translate-y-1/2 border-t border-neutral-300', {
          'w-1/2 left-1/2': x === 0,
          'w-1/2': x === size - 1,
        }
      )}
    />
  )
}

function Highlight ({ show }: { show: boolean }) {
  return (
    <span
      className={cn('absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 scale-75 rounded-[25%] bg-neutral-300/90 opacity-0', {
        'opacity-100 duration-300 scale-100': show,
      })}
    />
  )
}

export function Cell ({
  children,
  x,
  y,
  onClick,
  onHover,
  disabled,
  highlight,
}: PropsWithChildren<{
  x: number
  y: number
  onClick?: () => void
  onHover?: () => void
  disabled?: boolean
  highlight?: boolean
}>) {
  const shouldShowStarPoint = starPointPositions.some(
    position => x === position[0] && y === position[1]
  )

  const isCorner = cornerPositions.some(
    position => x === position[0] && y === position[1]
  )

  return (
    <button
      className="group relative flex aspect-square"
      disabled={disabled}
      onClick={onClick}
      onMouseOver={onHover}
    >
      {(isCorner)
        ? <Corner x={x} y={y} />
        : <>
          <VerticalLine x={x} y={y} />
          <HorizontalLine x={x} y={y} />
        </>}

      {shouldShowStarPoint && (<StarPoint />)}

      <Highlight show={Boolean(highlight)} />

      <div className="z-10 flex size-full items-center justify-center">
        {children ??
          <PieceGhost className="opacity-0 group-enabled:group-hover:opacity-100 group-enabled:group-focus:opacity-100" />}
      </div>
    </button>
  )
}
