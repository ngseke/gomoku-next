'use client'

import { type SyntheticEvent, useState, useEffect, useRef } from 'react'
import { NewRoomButton } from '../GradientButton/NewRoomButton'
import { JoinRoomButton } from '../GradientButton/JoinRoomButton'
import { LogoText } from '../LogoText'
import { PlayerPanel } from '../PlayerPanel'
import { Dialog } from '../Dialog'
import { Button } from '../Button'
import { Input } from '../Input'
import { useCreateOrJoinRoom } from '@/hooks/useCreateOrJoinRoom'
import { LoadingDialog } from '../LoadingDialog'
import { LogoIcon } from '../LogoIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { Footer } from '../Footer'

export function Lobby () {
  const {
    createRoom,
    joinRoom,
    isCreatingOrJoiningRoom,
  } = useCreateOrJoinRoom()

  const roomIdInputRef = useRef<HTMLInputElement | null>(null)
  const [roomId, setRoomId] = useState('')

  async function handleClickCreateRoom () {
    const room = await createRoom()
    if (!room) return

    await joinRoom(room.id)
  }

  const [isOpen, setIsOpen] = useState(false)

  function focusInput () {
    setTimeout(() => {
      roomIdInputRef.current?.focus()
    }, 0)
  }

  useEffect(function resetRoomIdAndFocus () {
    if (!isOpen) return

    setRoomId('')
    focusInput()
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

    }
  }

  return (<>
    <div className="flex min-h-full flex-col">
      <div className="container flex h-full max-w-[1000px] flex-1 px-4 py-8 sm:items-center">
        <div className="flex w-full flex-col gap-6 sm:gap-8">
          <div className="flex items-center gap-3">
            <LogoIcon className="size-12 sm:size-16" />
            <LogoText className="text-3xl sm:text-5xl" />
          </div>

          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <NewRoomButton
              disabled={isCreatingOrJoiningRoom}
              onClick={handleClickCreateRoom}
            />
            <JoinRoomButton
              disabled={isCreatingOrJoiningRoom}
              onClick={handleClickJoinRoom}
            />
          </div>

          <div className="flex">
            <PlayerPanel />
          </div>
        </div>
      </div>

      <Footer />
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
          leftSection={<FontAwesomeIcon icon={faHashtag} />}
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

    <LoadingDialog
      open={isCreatingOrJoiningRoom && !isOpen}
      title="Creating a New Room"
    />
  </>)
}
