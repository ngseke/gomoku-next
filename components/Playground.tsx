'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { NewRoomButton } from './GradientButton/NewRoomButton'
import { JoinRoomButton } from './GradientButton/JoinRoomButton'
import { Logo } from './LogoText'
import { ProfileButton } from './GradientButton/ProfileButton'
import { Button } from './Button'
import { useAxios } from '@/hooks/useAxios'
import { Input } from './Input'
import { type Room } from '@/types/Room'
import { Chat } from './Chat'
import { SignInPanel } from './SignInPanel'

dayjs.extend(localizedFormat)

export function Playground () {
  const axios = useAxios()

  const [roomId, setRoomId] = useState('room1')

  async function createRoom () {
    const { data } = await axios.post<Room>('/api/room/create/', {
      name: roomName,
    })
    setRoomId(data.id)
  }

  const [roomName, setRoomName] = useState('')

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <Logo />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <NewRoomButton />
          <JoinRoomButton />
          <ProfileButton />
        </div>

        <div className="flex justify-center">
          <SignInPanel />
        </div>

        <div className="flex gap-2">
          <div className="w-52">
            <Input
              value={roomName}
              onChange={event => { setRoomName(event.target.value) }}
            />
          </div>
          <Button onClick={createRoom}>
            Create Room
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <label>
            roomId:
            <Input
              value={roomId}
              onChange={event => { setRoomId(event.target.value) }}
            />
          </label>
          <div className="h-72 w-full max-w-96">
            <Chat roomId={roomId} />
          </div>
        </div>
      </div>

    </div>
  )
}
