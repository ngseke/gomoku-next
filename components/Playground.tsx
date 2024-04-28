'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { NewRoomButton } from './GradientButton/NewRoomButton'
import { JoinRoomButton } from './GradientButton/JoinRoomButton'
import { Logo } from './LogoText'
import { ProfileButton } from './GradientButton/ProfileButton'
import { useAxios } from '@/hooks/useAxios'
import { Input } from './Input'
import { type Room } from '@/types/Room'
import { ConnectedChatBox } from './ConnectedChatBox'
import { PlayerPanel } from './PlayerPanel'
import { useAuthStore } from '@/hooks/useAuthStore'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { Button } from './Button'
import { useRoomStore } from '@/hooks/useRoomStore'
import { PlayerPill } from './PlayerPill'
import { DebugView } from './DebugView'
import { GomokuBoard } from './GomokuBoard/GomokuBoard'
import { type BoardRecord } from '@/types/BoardRecord'
import { generateBoardGrid } from '@/modules/generateBoard'
import { formatPosition } from '@/modules/formatPosition'

dayjs.extend(localizedFormat)

export function Playground () {
  const axios = useAxios()

  const [roomId, setRoomId] = useState('1')

  async function createRoom () {
    const { data } = await axios.post<Room>('/api/room/create', {})
    setRoomId(data.id)

    return data
  }

  async function joinRoom (roomId: string) {
    await axios.post(`/api/room/${roomId}/join`)
  }

  async function handleClickCreateRoom () {
    const { id } = await createRoom()
    await joinRoom(id)

    setRoomId(id)
  }

  async function handleClickJoinRoom () {
    try {
      await joinRoom(roomId)
    } catch (err) {
      console.error(err)
    }
  }

  const { sessionId } = useAuthStore()
  const playerState = usePlayerStateStore()
  const room = useRoomStore()

  async function handleClickExitRoom () {
    await axios.post('/api/room/exit')
  }

  const roomPlayers = room?.players
    ? Object.values(room?.players).sort((a, b) => (
      a.piece?.localeCompare(b.piece)
    ))
    : []

  const [boardRecords, setBoardRecords] = useState<BoardRecord[]>([])
  const [highlight, setHighlight] = useState<{ x: number, y: number }>()
  const [isBlack, setIsBlack] = useState(true)

  return (
    <div className="container max-w-[1000px] px-2 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <Logo />
          <span className="ml-3 text-xs opacity-50">
            {sessionId}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
          <NewRoomButton onClick={handleClickCreateRoom} />
          <div>
            <JoinRoomButton onClick={handleClickJoinRoom} />
            <Input
              label="Room Id"
              value={roomId}
              onChange={event => { setRoomId(event.target.value) }}
            />
          </div>
          <ProfileButton />
        </div>

        <div className="flex justify-center">
          <PlayerPanel />
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="w-[550px]">
            <GomokuBoard
              boardGrid={generateBoardGrid(boardRecords)}
              highlight={highlight}
              showLabels={!!isBlack}
              onHover={(position) => { console.log(formatPosition(position)) }}
              onPlace={({ x, y }) => {
                setBoardRecords([
                  ...boardRecords,
                  { piece: isBlack ? 'black' : 'white', x, y },
                ])
                setIsBlack(!isBlack)
                setHighlight({ x, y })
              }}
            />

          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex gap-2">
              {roomPlayers?.map((player, index) => (
                <PlayerPill
                  key={player.id}
                  active={!!index === isBlack}
                  color={player.piece}
                  emoji={player?.emoji}
                  name={player?.name}
                />
              ))}
            </div>

            {playerState?.type === 'game' && (
              <Button onClick={handleClickExitRoom}>Exit Room</Button>
            )}

            <div className="h-96 w-full ">
              <ConnectedChatBox roomId={playerState?.roomId} />
            </div>
          </div>
        </div>

        <DebugView />
      </div>
    </div>
  )
}
