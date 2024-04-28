import { convertToArray } from '@/modules/convertToArray'
import { type Board } from '@/types/Board'
import { type Nullish } from '@/types/Nullish'
import { type Position } from '@/types/Position'
import { ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useDatabase } from 'reactfire'
import { useAxios } from './useAxios'
import { generateBoardGrid } from '@/modules/generateBoard'
import { getNextAvailablePiece } from '@/modules/boardGrid'

export function useBoard (boardId: Nullish<string>) {
  const database = useDatabase()

  const [board, setBoard] = useState<Board | null>(null)

  const records = board?.records ?? null
  const result = board?.result ?? null
  const boardGrid = generateBoardGrid(records)
  const winningLine = result?.type === 'win' ? result : null
  const nextAvailablePiece = getNextAvailablePiece(boardGrid)

  useEffect(() => {
    if (!boardId) {
      setBoard(null)
      return
    }

    const boardRef = ref(database, `boards/${boardId}`)
    const unsubscribe = onValue(
      boardRef,
      (snapshot) => {
        const data = snapshot.val()
        setBoard({
          ...data,
          records: convertToArray(data.records),
        })
      }
    )

    return unsubscribe
  }, [boardId, database])

  const axios = useAxios()

  const [isPlacing, setIsPlacing] = useState(false)

  /** Place a new piece. */
  async function place (position: Position) {
    if (!boardId || isPlacing) return

    setIsPlacing(true)
    try {
      await axios.post(`/api/board/${boardId}/place`, position)
    } finally {
      setIsPlacing(false)
    }
  }

  return {
    board,
    boardGrid,
    records,
    result,
    nextAvailablePiece,
    winningLine,
    place,
  }
}
