'use client'

import { Logo } from '../LogoText'
import { Button } from '../Button'
import { useAxios } from '@/hooks/useAxios'
import { GomokuBoard } from '../GomokuBoard/GomokuBoard'
import { ConnectedChatBox } from '../ConnectedChatBox'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useRoomStore } from '@/hooks/useRoomStore'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useRoomPlayers } from '@/hooks/useRoomPlayers'
import { PlayerPillWithLabel } from '../PlayerPillWithLabel'
import { useBoard } from '@/hooks/useBoard'
import { generateBoardGrid } from '@/modules/generateBoard'

export function Game () {
  const axios = useAxios()
  const { player } = useAuthStore()
  const playerState = usePlayerStateStore()
  const room = useRoomStore()

  async function handleClickExitRoom () {
    await axios.post('/api/room/exit')
  }

  const roomPlayers = useRoomPlayers()

  const boardId = room?.boardId
  const { boardState, place } = useBoard(boardId)

  const boardGrid = generateBoardGrid(boardState?.records)

  return (
    <div className="container flex min-h-screen max-w-[1000px] items-center px-4 py-8">
      <div className="flex size-full flex-col gap-8">
        <div className="flex-none">
          <Logo />
          {room?.name}
        </div>

        <div className="flex h-full flex-1 flex-wrap items-center gap-x-8 sm:flex-nowrap">
          <div className="w-full sm:w-[60%]">
            <GomokuBoard
              showLabels
              boardGrid={boardGrid}
              onPlace={place}
            />
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div className="-mx-2 flex w-full">
              {roomPlayers?.map((roomPlayer) => (
                <div key={roomPlayer.id} className="max-w-[50%] flex-none px-2">
                  <PlayerPillWithLabel
                    active={true}
                    color={roomPlayer.piece}
                    emoji={roomPlayer?.emoji}
                    label={roomPlayer.id === player?.id ? 'You' : 'Opponent'}
                    name={roomPlayer?.name}
                  />
                </div>
              ))}
            </div>

            <div className="h-[350px]">
              <ConnectedChatBox roomId={playerState?.roomId} />
            </div>
            <Button onClick={handleClickExitRoom}>Exit Room</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
