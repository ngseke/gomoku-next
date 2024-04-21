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
import { Chat } from './Chat'
import { SignInPanel } from './SignInPanel'
import { useAuthStore } from '@/hooks/useAuthStore'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { Button } from './Button'
import { useRoomStore } from '@/hooks/useRoomStore'
import { UserPill } from './UserPill'

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

  return (
    <div className="container max-w-[1000px] px-2 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <Logo />
          <span className="ml-3 text-xs opacity-50">
            {sessionId}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <NewRoomButton onClick={handleClickCreateRoom} />
          <div>
            <JoinRoomButton onClick={handleClickJoinRoom} />
            <label>
              roomId:
              <Input
                value={roomId}
                onChange={event => { setRoomId(event.target.value) }}
              />
            </label>
          </div>
          <ProfileButton />
        </div>

        <div className="flex justify-center">
          <SignInPanel />
        </div>

        <div className="flex gap-4">
          <div className="h-72 w-full max-w-96">
            <Chat roomId={playerState?.roomId} />
          </div>
          <div className="flex gap-2">
            {
              roomPlayers?.map(player => (
                <UserPill
                  key={player.id}
                  color={player.piece}
                  emoji={player?.emoji}
                  name={player?.name}
                />
              ))
            }
          </div>
        </div>

        <div>
          <pre>{JSON.stringify(playerState, null, 2)}</pre>
          <pre>{JSON.stringify(room, null, 2)}</pre>

          {playerState?.type === 'game' && (
            <Button onClick={handleClickExitRoom}>Exit Room</Button>
          )}
        </div>
      </div>
    </div>
  )
}
