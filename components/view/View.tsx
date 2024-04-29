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
      title={
        <div className="flex w-full flex-col gap-3 text-center">
          <FontAwesomeIcon spin className="text-4xl text-neutral-600 dark:text-neutral-400" icon={faCircleNotch} />
          <span>
            Joining The Room
          </span>
        </div>
      }
    >
      <div className="text-center text-neutral-600 dark:text-neutral-400">
        Almost there...
      </div>
    </Dialog>
  </>)
}
