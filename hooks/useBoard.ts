import { convertToArray } from '@/modules/convertToArray'
import { type Board } from '@/types/Board'
import { type Nullish } from '@/types/Nullish'
import { type Position } from '@/types/Position'
import { ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useDatabase } from 'reactfire'
import { useAxios } from './useAxios'

export function useBoard (boardId: Nullish<string>) {
  const database = useDatabase()

  const [boardState, setBoard] = useState<Board | null>(null)

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

  async function place (position: Position) {
    if (!boardId) return

    await axios.post(`/api/board/${boardId}/place`, position)
  }

  return {
    boardState,
    place,
  }
}
