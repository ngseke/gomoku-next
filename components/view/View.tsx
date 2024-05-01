'use client'

import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { Game } from './Game'
import { Lobby } from './Lobby'
import { useAutoJoinRoom } from '@/hooks/useAutoJoinRoom'
import { useInitializeStore } from '@/hooks/useInitializeStore'
import { LoadingDialog } from '../LoadingDialog'
import { ErrorDialog } from '../ErrorDialog'

export function View () {
  useInitializeStore()

  const playerState = usePlayerStateStore()

  const isInGame = playerState?.type === 'game'

  const { isAutoJoiningRoom, joinError, clearJoinError } = useAutoJoinRoom()

  return (<>
    {isInGame ? <Game /> : <Lobby />}

    <LoadingDialog open={isAutoJoiningRoom} title="Joining The Room" />
    <ErrorDialog
      open={Boolean(joinError)}
      title="Failed to Join the Room"
      onClose={clearJoinError}
    >
      {joinError}
    </ErrorDialog>
  </>)
}
