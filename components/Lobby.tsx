'use client'

import { useState } from 'react'
import { NewRoomButton } from './GradientButton/NewRoomButton'
import { JoinRoomButton } from './GradientButton/JoinRoomButton'
import { Logo } from './LogoText'
import { ProfileButton } from './GradientButton/ProfileButton'
import { useAxios } from '@/hooks/useAxios'
import { type Room } from '@/types/Room'
import { PlayerPanel } from './PlayerPanel'
import { useAuthStore } from '@/hooks/useAuthStore'

export function Lobby () {
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

  const { player } = useAuthStore()

  return (
    <div className="container flex min-h-full max-w-[1000px] items-center px-2 py-8">
      <div className="flex w-full flex-col gap-6">
        <div>
          <Logo />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NewRoomButton onClick={handleClickCreateRoom} />
          <div>
            <JoinRoomButton onClick={handleClickJoinRoom} />
          </div>
          <ProfileButton disabled={!player} />
        </div>

        {/* <hr className="my-4 border-neutral-200 dark:border-neutral-800" /> */}

        <div className="mt-6 flex">
          <PlayerPanel />
        </div>
      </div>
    </div>
  )
}
