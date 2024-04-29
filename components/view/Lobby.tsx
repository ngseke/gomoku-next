'use client'

import { type SyntheticEvent, useState, useEffect, useRef } from 'react'
import { NewRoomButton } from '../GradientButton/NewRoomButton'
import { JoinRoomButton } from '../GradientButton/JoinRoomButton'
import { Logo } from '../LogoText'
import { ProfileButton } from '../GradientButton/ProfileButton'
import { PlayerPanel } from '../PlayerPanel'
import { useAuthStore } from '@/hooks/useAuthStore'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Input } from '../Input'
import { useCreateOrJoinRoom } from '@/hooks/useCreateOrJoinRoom'

export function Lobby () {
  const {
    createRoom,
    joinRoom,
    isCreatingOrJoiningRoom,
  } = useCreateOrJoinRoom()

  const roomIdInputRef = useRef<HTMLInputElement | null>(null)
  const [roomId, setRoomId] = useState('')

  async function handleClickCreateRoom () {
    const { id } = await createRoom()
    await joinRoom(id)
  }

  const [isOpen, setIsOpen] = useState(false)

  useEffect(function resetRoomIdAndFocus () {
    if (!isOpen) return

    setRoomId('')
    setTimeout(() => {
      roomIdInputRef.current?.focus()
    }, 0)
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
      if (!roomId) return
      await joinRoom(roomId.trim())
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

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
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
            ref={roomIdInputRef}
            value={roomId}
            onChange={event => { setRoomId(event.target.value) }}
          />
          <Button
            block
            disabled={!roomId}
            loading={isCreatingOrJoiningRoom}
            type="submit"
          >
            Join
          </Button>
        </form>
      </Dialog>
    </div>
  )
}
