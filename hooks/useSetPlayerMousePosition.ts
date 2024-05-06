import { ref, set } from 'firebase/database'
import { useDatabase } from 'reactfire'
import { usePlayer } from './usePlayer'
import { type MousePosition } from '@/types/MousePosition'
import { useMemo } from 'react'
import { throttle } from 'throttle-debounce'

export function useSetPlayerMousePosition () {
  const { player } = usePlayer()
  const database = useDatabase()

  const playerId = player?.id

  const setPlayerMousePosition = useMemo(() => throttle(
    500,
    async function setPlayerMousePosition (position: MousePosition) {
      const playerMousePositionRef =
      ref(database, `playerMousePositions/${playerId}`)

      await set(playerMousePositionRef, position)
    },
  ), [database, playerId])

  return {
    setPlayerMousePosition,
  }
}
