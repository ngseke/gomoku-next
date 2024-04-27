'use client'

import { type SyntheticEvent, useState } from 'react'
import { NewRoomButton } from '../GradientButton/NewRoomButton'
import { JoinRoomButton } from '../GradientButton/JoinRoomButton'
import { Logo } from '../LogoText'
import { ProfileButton } from '../GradientButton/ProfileButton'
import { useAxios } from '@/hooks/useAxios'
import { type Room } from '@/types/Room'
import { PlayerPanel } from '../PlayerPanel'
import { useAuthStore } from '@/hooks/useAuthStore'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Input } from '../Input'
import { DebugView } from '../DebugView'

export function Lobby () {
  const axios = useAxios()

  const [roomId, setRoomId] = useState('')

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

  const [isOpen, setIsOpen] = useState(false)

  async function handleClickJoinRoom () {
    setIsOpen(true)
  }

  async function handleSubmitJoinRoom (event: SyntheticEvent) {
    event.preventDefault()

    try {
      await joinRoom(roomId)
    } catch (err) {
      console.error(err)
    }
  }

  const { player } = useAuthStore()

  return (
    <div className="container flex min-h-full max-w-[1000px] items-center px-4 py-8">
      <div className="flex w-full flex-col gap-8">
        <div>
          <Logo size="lg" />
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <NewRoomButton onClick={handleClickCreateRoom} />
          <div>
            <JoinRoomButton onClick={handleClickJoinRoom} />
          </div>
          <ProfileButton disabled={!player} />
        </div>

        <div className="flex">
          <PlayerPanel />
        </div>

        <DebugView />
      </div>

      <Dialog
        open={isOpen}
        title="Join Room"
        onClose={() => { setIsOpen(false) }}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmitJoinRoom}>
          <p className="text-sm opacity-60">
            Enter the room ID to join
          </p>
          <Input
            value={roomId}
            onChange={event => { setRoomId(event.target.value) }}
          />
          <Button block type="submit">
            Join
          </Button>
        </form>
      </Dialog>

    </div>
  )
}
