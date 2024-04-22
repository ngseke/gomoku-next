import { type Board } from '@/types/Board'
import { Cell } from './Cell'
import { Piece } from './Piece'
import { type Position } from '@/types/Position'

const size = 15

export function GomokuBoard ({ board, highlight, disabled, onPlace, onHover }: {
  board?: Board
  disabled?: boolean
  highlight?: Position
  onPlace?: (position: Position) => void
  onHover?: (position: Position) => void
}) {
  return (
    <div className="grid w-[500px] max-w-full grid-cols-15">
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
    </div>
  )
}
