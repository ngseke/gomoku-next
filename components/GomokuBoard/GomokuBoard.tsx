import { type Board } from '@/types/Board'
import { Cell } from './Cell'
import { Piece } from './Piece'
import { type Position } from '@/types/Position'
import { GridWithLabel } from './GridWithLabel'
import { type Nullish } from '@/types/Nullish'
import { WinningLine } from './WinningLine'
import { type WinningLine as WinningLineType } from '@/types/WinningLine'

const size = 15

export function GomokuBoard ({
  board,
  highlight,
  winningLine,
  disabled,
  showLabels,
  onPlace,
  onHover,
}: {
  board?: Nullish<Board>
  disabled?: boolean
  showLabels?: boolean
  highlight?: Nullish<Position>
  winningLine?: Nullish<WinningLineType>
  onPlace?: (position: Position) => void
  onHover?: (position: Position) => void
}) {
  return (
    <GridWithLabel showLabels={showLabels}>
      <div className="relative grid w-full grid-cols-15">
        {Array.from({ length: size ** 2 }).map((_, index) => {
          const x = index % size
          const y = Math.floor(index / size)

          const piece = board?.[x]?.[y]
          const shouldHighlight = highlight?.x === x && highlight?.y === y

          return (
            <Cell
              key={index}
              disabled={Boolean(piece) || disabled}
              highlight={shouldHighlight}
              x={x}
              y={y}
              onClick={() => { onPlace?.({ x, y }) }}
              onHover={() => { onHover?.({ x, y }) }}
            >
              {piece && <Piece color={piece.piece} />}
            </Cell>
          )
        })}

        <WinningLine
          direction={winningLine?.direction}
          position={winningLine?.position}
        />
      </div>
    </GridWithLabel>
  )
}
