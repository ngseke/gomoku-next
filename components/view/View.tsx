'use client'

import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { Game } from './Game'
import { Lobby } from './Lobby'
import { useAutoJoinRoom } from '@/hooks/useAutoJoinRoom'
import { Dialog } from '../Dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useInitializeStore } from '@/hooks/useInitializeStore'

export function View () {
  useInitializeStore()

  const playerState = usePlayerStateStore()

  const isInGame = playerState?.type === 'game'

  const { isAutoJoiningRoom } = useAutoJoinRoom()

  return (<>
    {isInGame ? <Game /> : <Lobby />}

    <Dialog
      open={isAutoJoiningRoom}
      title="Joining The Room"
    >
      <FontAwesomeIcon spin className="mr-2 text-lg text-neutral-600 dark:text-neutral-400" icon={faCircleNotch} />
      Almost there...
    </Dialog>
  </>)
}
