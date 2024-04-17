'use client'

import { useDatabaseChat } from '@/hooks/useDatabaseChat'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { useSignInWithGoogleAuth } from '@/hooks/useSignInWithGoogleAuth'

dayjs.extend(localizedFormat)

export function Playground () {
  const [roomId, setRoomId] = useState('room1')

  const { chats } = useDatabaseChat(roomId)

  const [message, setMessage] = useState('')

  async function send () {
    await axios.post(`/api/chat/send/${roomId}`, { message })
    setMessage('')
  }

  const auth = useAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
    })
  }, [auth])

  const { signIn } = useSignInWithGoogleAuth()

  return (
    <div className="container">
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
