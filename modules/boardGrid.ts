import { type BoardGrid } from '@/types/BoardGrid'
import { type BoardResult } from '@/types/BoardResult'
import { type Nullish } from '@/types/Nullish'
import { type Piece } from '@/types/Piece'
import { type Position } from '@/types/Position'

const size = 15

function isInRange (
  value: number,
  min = 0,
  max = size - 1
) {
  return min <= value && value <= max
}

export function judgeCanPlace (boardGrid: BoardGrid, position: Position) {
  return (
    isInRange(position.x) &&
    isInRange(position.y) &&
    boardGrid[position.x][position.y] == null
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

export function judgeResult (boardGrid: BoardGrid): BoardResult | null {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!boardGrid[x][y]) continue

      for (const { offsets, direction } of patterns) {
        const line = []
        for (const [dx, dy] of offsets) {
          const target = boardGrid[x + dx]?.[y + dy]
          if (!target) break
          if (line.length && target.piece !== line[0]?.piece) break

          line.push(target)
        }

        if (line.length === 5) {
          const center = line[2]

          return {
            type: 'win',
            piece: center.piece,
            position: { x: center.x, y: center.y },
            direction,
          }
        }
      }
    }
  }

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!boardGrid[x][y]) return null
    }
  }

  return {
    type: 'draw',
  }
}

export function getAvailablePositions (boardGrid: BoardGrid) {
  const list: Position[] = []

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!boardGrid[x][y]) list.push({ x, y })
    }
  }

  return list
}

export function getNextAvailablePiece (
  boardGrid: BoardGrid,
  firstPiece: Nullish<Piece> = 'black'
): Piece | null {
  if (judgeResult(boardGrid)) return null

  let blackCount = 0
  let whiteCount = 0

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const target = boardGrid[x][y]
      if (!target) continue

      if (target.piece === 'black') blackCount++
      if (target.piece === 'white') whiteCount++
    }
  }

  if (firstPiece === 'black') {
    if (blackCount > whiteCount) return 'white'
    return 'black'
  }

  if (firstPiece === 'white') {
    if (whiteCount > blackCount) return 'black'
    return 'white'
  }

  return null
}

export function getNextBoardFirstPiece (piece: Nullish<Piece>): Piece {
  if (piece === 'black') return 'white'
  return 'black'
}
