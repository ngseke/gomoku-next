import { judgeResult } from '../boardGrid'
import { generateBoardGrid } from '../generateBoard'
import { fetchBoard } from './fetchBoard'

export async function fetchAndJudgeBoard (boardId: string) {
  const board = await fetchBoard(boardId)
  if (!board) return null

  const boardGrid = generateBoardGrid(board.records)
  const result = judgeResult(boardGrid)

  return result
}
