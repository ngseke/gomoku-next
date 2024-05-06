import { type BoardGrid } from '@/types/BoardGrid'
import { Cell } from './Cell'
import { Piece } from './Piece'
import { type Position } from '@/types/Position'
import { GridWithLabel } from './GridWithLabel'
import { type Nullish } from '@/types/Nullish'
import { WinningLine } from './WinningLine'
import { type WinningLine as WinningLineType } from '@/types/WinningLine'
import { type MouseEvent } from 'react'
import { type MousePosition } from '@/types/MousePosition'
import { cn } from '@/modules/cn'

const size = 15

export function GomokuBoard ({
  boardGrid,
  highlight,
  emphasis,
  dimmedPositions,
  winningLine,
  disabled,
  showLabels,
  playerMousePosition,
  onPlace,
  onHover,
  onMouseMove,
}: {
  boardGrid?: Nullish<BoardGrid>
  disabled?: boolean
  showLabels?: boolean
  highlight?: Nullish<Position>
  emphasis?: Nullish<Position>
  dimmedPositions?: Nullish<Position[]>
  winningLine?: Nullish<WinningLineType>
  playerMousePosition?: MousePosition
  onPlace?: (position: Position) => void
  onHover?: (position: Position) => void
  onMouseMove?: (position: MousePosition) => void
}) {
  const dimmedPositionSet = new Set(dimmedPositions?.map(
    ({ x, y }) => `${x},${y}`)
  )

  function handleMouseMove (event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget?.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    onMouseMove?.([(x / rect.width) * 100, (y / rect.height) * 100])
  }

  return (
    <div
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseOut={() => { onMouseMove?.(null) }}
    >
      <GridWithLabel showLabels={showLabels}>
        <div className="relative grid w-full grid-cols-15">
          {Array.from({ length: size ** 2 }).map((_, index) => {
            const x = index % size
            const y = Math.floor(index / size)

            const piece = boardGrid?.[x]?.[y]
            const isHighlight = highlight?.x === x && highlight?.y === y
            const isEmphasis = emphasis?.x === x && emphasis?.y === y
            const isDimmed = dimmedPositionSet.has(`${x},${y}`)

            return (
              <Cell
                key={index}
                disabled={Boolean(piece) || disabled}
                highlight={!dimmedPositionSet.size && isHighlight}
                x={x}
                y={y}
                onClick={() => { onPlace?.({ x, y }) }}
                onHover={() => { onHover?.({ x, y }) }}
              >
                {piece && (
                  <Piece
                    animate={isHighlight}
                    color={piece.piece}
                    dimmed={isDimmed}
                    emphasis={isEmphasis}
                  />
                )}
              </Cell>
            )
          })}

          <WinningLine
            direction={winningLine?.direction}
            position={winningLine?.position}
          />
        </div>
      </GridWithLabel>

      <div
        className={cn('absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-400/50 duration-500 dark:bg-neutral-600/50', {
          'opacity-0': !playerMousePosition,
        })}
        style={{
          left: `${playerMousePosition?.[0]}%`,
          top: `${playerMousePosition?.[1]}%`,
        }}
      />
    </div>
  )
}
