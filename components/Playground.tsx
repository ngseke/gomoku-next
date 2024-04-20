'use client'

import { useDatabaseChat } from '@/hooks/useDatabaseChat'
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
import { IconButton } from './IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { RoundButton } from './RoundButton'
import { useAxios } from '@/hooks/useAxios'
import { Input } from './Input'
import { type Room } from '@/types/Room'
import { ChatList } from './ChatList'

dayjs.extend(localizedFormat)

export function Playground () {
  const axios = useAxios()

  const [roomId, setRoomId] = useState('room1')

  const { chats } = useDatabaseChat(roomId)

  const [message, setMessage] = useState('')

  async function send () {
    await axios.post(`/api/chat/create/${roomId}`, { message })
    setMessage('')
  }

  async function createRoom () {
    const { data } = await axios.post<Room>('/api/room/create/', {
      name: roomName,
    })
    setRoomId(data.id)
  }

  const { signIn } = useSignInWithGoogleAuth()

  const user = useAppSelector((state) => state.auth.user)
  const isInitializingUser =
    useAppSelector((state) => state.auth.isInitializingUser)

  const { signOut } = useSignOut()

  const [isActive, setIsActive] = useState(true)

  const [roomName, setRoomName] = useState('')

  return (
    <div className="container pt-8">
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
          <UserPill loading={isInitializingUser} name="Sean" />
          <UserPill image={user?.photoURL}loading={isInitializingUser} name={user?.displayName} />
          <UserPill emoji="🍌️"loading={isInitializingUser} name={user?.displayName} />
          <UserPill loading={isInitializingUser} name="Sean Sean Sean Sean " />
          <UserPill active={isActive} color="black" image={user?.photoURL} loading={isInitializingUser} name={user?.displayName} />
          <UserPill active={isActive} color="white" image={user?.photoURL} loading={isInitializingUser} name={user?.displayName} />

          <IconButton onClick={signOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </IconButton>

          <RoundButton
            icon={<FontAwesomeIcon icon={faRightToBracket} />}
            onClick={signIn}
          >
            Sign In
          </RoundButton>
        </div>

        <div className="flex gap-2">
          <div className="w-52">
            <Input
              value={roomName}
              onChange={event => { setRoomName(event.target.value) }}
            />
          </div>
          <RoundButton onClick={createRoom}>
            Create Room
          </RoundButton>
        </div>
      </div>

      <hr className="my-6" />

      <label>
        roomId:
        <input
          className="rounded-md border px-2 py-1"
          value={roomId}
          onChange={event => { setRoomId(event.target.value) }}
        />
      </label>

      <ChatList chats={chats} />

      <form onSubmit={async (event) => {
        event.preventDefault()
        await send()
      }}
      >
        <input
          className="rounded-md border px-2 py-1"
          placeholder="Aa"
          value={message}
          onChange={event => { setMessage(event.target.value) }}
        />
      </form>
    </div>
  )
}
