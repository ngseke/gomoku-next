'use client'

import { type SyntheticEvent, useState, useEffect } from 'react'
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
import { useSignInAnonymously } from '@/hooks/useSignInAnonymously '

function useCreateOrJoinRoom () {
  const axios = useAxios()
  const { player } = useAuthStore()

  const [isCreatingOrJoiningRoom, setIsCreatingOrJoiningRoom] = useState(false)

  const { signInAnonymously } = useSignInAnonymously()

  async function ensurePlayer () {
    if (player) return
    await signInAnonymously()
  }

  async function createRoom () {
    setIsCreatingOrJoiningRoom(true)

    try {
      await ensurePlayer()
      const { data } = await axios.post<Room>('/api/room/create', {})
      return data
    } finally {
      setIsCreatingOrJoiningRoom(false)
    }
  }

  async function joinRoom (id: string) {
    setIsCreatingOrJoiningRoom(true)

    try {
      await ensurePlayer()
      await axios.post(`/api/room/${id}/join`)
    } finally {
      setIsCreatingOrJoiningRoom(false)
    }
  }

  return {
    createRoom,
    joinRoom,
    isCreatingOrJoiningRoom,
  }
}

export function Lobby () {
  const {
    createRoom,
    joinRoom,
    isCreatingOrJoiningRoom,
  } = useCreateOrJoinRoom()

  const [roomId, setRoomId] = useState('')

  async function handleClickCreateRoom () {
    const { id } = await createRoom()
    await joinRoom(id)
  }

  const [isOpen, setIsOpen] = useState(false)

  useEffect(function resetRoomId () {
    if (!isOpen) return
    setRoomId('')
  }, [isOpen])

  function handleCloseDialog () {
    setIsOpen(false)
  }

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
          <NewRoomButton
            disabled={isCreatingOrJoiningRoom}
            onClick={handleClickCreateRoom}
          />
          <JoinRoomButton
            disabled={isCreatingOrJoiningRoom}
            onClick={handleClickJoinRoom}
          />
          <ProfileButton disabled={isCreatingOrJoiningRoom || !player} />
        </div>

        <div className="flex">
          <PlayerPanel />
        </div>
      </div>

      <Dialog
        open={isOpen}
        title="Join Room"
        onClose={handleCloseDialog}
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
