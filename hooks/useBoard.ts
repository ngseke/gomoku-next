import { convertToArray } from '@/modules/convertToArray'
import { type BoardState } from '@/types/BoardState'
import { type Nullish } from '@/types/Nullish'
import { ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useDatabase } from 'reactfire'

export function useBoard (boardId: Nullish<string>) {
  const database = useDatabase()

  const [boardState, setBoard] = useState<BoardState | null>(null)

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

  return {
    boardState,
  }
}
