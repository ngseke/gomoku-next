'use client'

import { useDatabaseChat } from '@/hooks/useDatabaseChat'
import { useState } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useSignInWithGoogleAuth } from '@/hooks/useSignInWithGoogleAuth'
import { useAppSelector } from '@/lib/hooks'
import { useSignOut } from '@/hooks/useSignOut'
import { NewRoomButton } from './GradientButton/NewRoomButton'
import { JoinRoomButton } from './GradientButton/JoinRoomButton'
import { UserBadge } from './UserBadge'
import { Logo } from './LogoText'
import { ProfileButton } from './GradientButton/ProfileButton'
import { IconButton } from './IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

dayjs.extend(localizedFormat)

export function Playground () {
  const [roomId, setRoomId] = useState('room1')

  const { chats } = useDatabaseChat(roomId)

  const [message, setMessage] = useState('')

  async function send () {
    await axios.post(`/api/chat/send/${roomId}`, { message })
    setMessage('')
  }

  const { signIn } = useSignInWithGoogleAuth()

  const user = useAppSelector((state) => state.auth.user)
  const isInitializingUser =
    useAppSelector((state) => state.auth.isInitializingUser)

  const { signOut } = useSignOut()

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

        <div className="flex gap-2">
          <UserBadge />
          <UserBadge loading />
          <UserBadge loading={isInitializingUser} name="Sean" />
          <UserBadge image={user?.photoURL}loading={isInitializingUser} name={user?.displayName} />
          <UserBadge emoji="🍌️"loading={isInitializingUser} name={user?.displayName} />
          <UserBadge loading={isInitializingUser} name="Sean Sean Sean Sean " />
          <IconButton onClick={signOut}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </IconButton>
        </div>
      </div>

      <hr className="my-6" />

      <div>
        <code className="font-mono text-blue-500">
          {JSON.stringify({ isInitializingUser })}
        </code>

        <button onClick={signIn}>Sign in</button>
        <button onClick={signOut}>Sign out</button>
      </div>

      <label>
        roomId:
        <input
          className="rounded-md border px-2 py-1"
          value={roomId}
          onChange={event => { setRoomId(event.target.value) }}
        />
      </label>

      <ul className="list-inside list-disc">
        {
          chats &&
            Object.entries(chats).map(([key, chat]) => (
              <li key={key}>
                {chat.message}
                <span className="ml-2 text-sm opacity-70">
                  ({dayjs(chat.createdAt).format('llll')})
                </span>
              </li>
            ))
        }
      </ul>

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
