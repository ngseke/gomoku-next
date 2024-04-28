import { convertToArray } from '@/modules/convertToArray'
import { type Board } from '@/types/Board'
import { type Nullish } from '@/types/Nullish'
import { type Position } from '@/types/Position'
import { ref, onValue } from 'firebase/database'
import { useEffect, useMemo, useState } from 'react'
import { useDatabase } from 'reactfire'
import { useAxios } from './useAxios'
import { generateBoardGrid } from '@/modules/generateBoard'
import { getNextAvailablePiece } from '@/modules/boardGrid'
import { type BoardRecord } from '@/types/BoardRecord'
import { type Piece } from '@/types/Piece'

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
  const [placedPiece, setPlacedPiece] = useState<BoardRecord | null>(null)

  /** Place a new piece. */
  async function place (position: Position, piece?: Piece) {
    if (!boardId || isPlacing || !piece) return

    setIsPlacing(true)
    setPlacedPiece({ ...position, piece, createdAt: +new Date() })

    try {
      await axios.post(`/api/board/${boardId}/place`, position)
    } finally {
      setIsPlacing(false)
      setPlacedPiece(null)
    }
  }

  const optimisticRecords = useMemo(() => {
    const newRecords = structuredClone(records) ?? []
    if (placedPiece) {
      newRecords.push(placedPiece)
    }
    return newRecords
  }, [placedPiece, records])

  const optimisticBoardGrid = generateBoardGrid(optimisticRecords)

  return {
    board,
    boardGrid,
    optimisticBoardGrid,
    records,
    result,
    nextAvailablePiece,
    winningLine,
    place,
  }
}
