'use client'

import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { Game } from './Game'
import { Lobby } from './Lobby'
import { useAutoJoinRoom } from '@/hooks/useAutoJoinRoom'

export function View () {
  const playerState = usePlayerStateStore()

  const isInGame = playerState?.type === 'game'

  useAutoJoinRoom()

  return (<>
    {isInGame ? <Game /> : <Lobby />}
  </>)
}
