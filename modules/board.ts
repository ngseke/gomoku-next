import { type Board } from '@/types/Board'
import { type BoardResult } from '@/types/BoardResult'
import { type Position } from '@/types/Position'

const size = 15

function isInRange (
  value: number,
  min = 0,
  max = size - 1
) {
  return min <= value && value <= max
}

export function judgeCanPlace (board: Board, position: Position) {
  return (
    isInRange(position.x) &&
    isInRange(position.y) &&
    board[position.x][position.y] == null
  )
}

const verticalOffsets: Array<[number, number]> =
  [[0, -2], [0, -1], [0, 0], [0, 1], [0, 2]]
const horizontalOffsets: Array<[number, number]> =
  [[-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]]
const majorDiagonalOffsets: Array<[number, number]> =
  [[-2, -2], [-1, -1], [0, 0], [1, 1], [2, 2]]
const minorDiagonalOffsets: Array<[number, number]> =
  [[-2, 2], [-1, 1], [0, 0], [1, -1], [2, -2]]

const patterns = [
  { offsets: verticalOffsets, direction: 'vertical' },
  { offsets: horizontalOffsets, direction: 'horizontal' },
  { offsets: majorDiagonalOffsets, direction: 'majorDiagonal' },
  { offsets: minorDiagonalOffsets, direction: 'minorDiagonal' },
] as const

export function judgeResult (board: Board) {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!board[x][y]) continue

      for (const { offsets, direction } of patterns) {
        const line = []
        for (const [dx, dy] of offsets) {
          const target = board[x + dx]?.[y + dy]
          if (!target) break
          if (line.length && target.piece !== line[0]?.piece) break

          line.push(target)
        }

        if (line.length === 5) {
          const center = line[2]

          return {
            piece: center.piece,
            position: { x: center.x, y: center.y },
            direction,
          } satisfies BoardResult
        }
      }
    }
  }

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!board[x][y]) return null
    }
  }

  return 'fair'
}

export function getAvailablePositions (board: Board) {
  const list: Position[] = []

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!board[x][y]) list.push({ x, y })
    }
  }

  return list
}

export function getNextAvailablePiece (board: Board) {
  let blackCount = 0
  let whiteCount = 0

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const target = board[x][y]
      if (!target) continue

      if (target.piece === 'black') blackCount++
      if (target.piece === 'white') whiteCount++
    }
  }
  if (!blackCount && !whiteCount) return 'black'
  if (blackCount > whiteCount) return 'white'

  return 'black'
}
