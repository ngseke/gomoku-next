'use client'

import { Logo } from '../LogoText'
import { Button } from '../Button'
import { useAxios } from '@/hooks/useAxios'
import { GomokuBoard } from '../GomokuBoard/GomokuBoard'
import { ConnectedChatBox } from '../ConnectedChatBox'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'

export function Game () {
  const axios = useAxios()
  const playerState = usePlayerStateStore()

  async function handleClickExitRoom () {
    await axios.post('/api/room/exit')
  }

  return (
    <div className="container flex min-h-full max-w-[1000px] items-center px-4 py-8">
      <div className="flex w-full flex-col gap-8">
        <div>
          <Logo />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="w-full flex-none sm:w-3/5">
            <GomokuBoard showLabels />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="h-96">
              <ConnectedChatBox roomId={playerState?.roomId} />
            </div>
            <Button onClick={handleClickExitRoom}>Exit Room</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
