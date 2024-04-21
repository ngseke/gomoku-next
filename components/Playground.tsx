'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useSignInWithGoogleAuth } from '@/hooks/useSignInWithGoogleAuth'
import { useAppSelector } from '@/lib/hooks'
import { useSignOut } from '@/hooks/useSignOut'
import { NewRoomButton } from './GradientButton/NewRoomButton'
import { JoinRoomButton } from './GradientButton/JoinRoomButton'
import { UserPill } from './UserPill'
import { Logo } from './LogoText'
import { ProfileButton } from './GradientButton/ProfileButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from './Button'
import { useAxios } from '@/hooks/useAxios'
import { Input } from './Input'
import { type Room } from '@/types/Room'
import { Chat } from './Chat'
import { useSignInAnonymously } from '@/hooks/useSignInAnonymously '

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

  const { signIn } = useSignInWithGoogleAuth()
  const { signIn: signInAnonymously } = useSignInAnonymously()

  const player = useAppSelector((state) => state.auth.player)
  const isInitializingUser =
    useAppSelector((state) => state.auth.isInitializingUser)

  const { signOut } = useSignOut()

  const [isActive, setIsActive] = useState(true)

  const [roomName, setRoomName] = useState('')

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <div>
          <Logo />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <NewRoomButton />
          <JoinRoomButton />
          <ProfileButton />
        </div>

        <div className="flex flex-wrap gap-2">
          <input checked={isActive} type="checkbox" onChange={() => { setIsActive(!isActive) }} />
          <UserPill />
          <UserPill loading />
          <UserPill loading={isInitializingUser} name={player?.name} />
          <UserPill emoji={player?.emoji} image={player?.avatar}loading={isInitializingUser} name={player?.name} />
          <UserPill emoji={player?.emoji} loading={isInitializingUser} name={player?.name} />
          <UserPill loading={isInitializingUser} name={player?.name?.repeat(5)} />
          <UserPill active={isActive} color="black" emoji={player?.emoji} image={player?.avatar} loading={isInitializingUser} name={player?.name} />
          <UserPill active={isActive} color="white" emoji={player?.emoji} image={player?.avatar} loading={isInitializingUser} name={player?.name} />

          <Button
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            onClick={signOut}
          />

          <Button
            icon={<FontAwesomeIcon icon={faGoogle} />}
            onClick={signIn}
          >
            Sign In
          </Button>
          <Button
            icon={<FontAwesomeIcon icon={faUser} />}
            onClick={signInAnonymously}
          >
            Sign In
          </Button>
          <Button
            icon={<FontAwesomeIcon icon={faUser} />}
          />
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
