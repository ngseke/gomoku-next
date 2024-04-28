'use client'

import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { Game } from './Game'
import { Lobby } from './Lobby'

export function View () {
  const playerState = usePlayerStateStore()

  const isInGame = playerState?.type === 'game'

  return (<>
    {isInGame ? <Game /> : <Lobby />}
  </>)
}
