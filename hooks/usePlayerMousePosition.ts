import { type MousePosition } from '@/types/MousePosition'
import { type Nullish } from '@/types/Nullish'
import { ref, onValue } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useDatabase } from 'reactfire'

export function usePlayerMousePosition (playerId: Nullish<string>) {
  const database = useDatabase()

  const [playerMousePosition, setPlayerMousePosition] = useState<MousePosition>(null)

  useEffect(() => {
    if (!playerId) {
      setPlayerMousePosition(null)
      return
    }

    const playerMousePositionRef = ref(database, `playerMousePositions/${playerId}`)

    const unsubscribe = onValue(
      playerMousePositionRef,
      (snapshot) => {
        const data = snapshot.val()
        setPlayerMousePosition(data)
      }
    )

    return unsubscribe
  }, [database, playerId])

  return {
    playerMousePosition,
  }
}
