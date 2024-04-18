'use client'

import { useDatabaseChat } from '@/hooks/useDatabaseChat'
import { useState } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useSignInWithGoogleAuth } from '@/hooks/useSignInWithGoogleAuth'
import { useAppSelector } from '@/lib/hooks'

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

  return (
    <div className="container">
      <code className="font-mono text-pink-500">
        {JSON.stringify(user)}
      </code>

      <label>
        roomId:
        <input
          value={roomId}
          onChange={event => { setRoomId(event.target.value) }}
          className="rounded-md border px-2 py-1"
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
          value={message}
          onChange={event => { setMessage(event.target.value) }}
          className="rounded-md border px-2 py-1"
          placeholder="Aa"
        />
      </form>
      <button onClick={signIn}>Sign in</button>
    </div>
  )
}
