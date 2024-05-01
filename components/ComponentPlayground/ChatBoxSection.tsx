'use client'
import { useState } from 'react'
import { Input } from '../Input'
import { ChatBox } from '../ChatBox'
import { type Chat } from '@/types/Chat'
import { mockChats } from './mockChats'
import { Checkbox } from '../Checkbox'
import { Headline } from './Headline'

export function ChatBoxSection () {
  const defaultPlayerId = 'Sean Huang'
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState<Record<string, Chat>>(mockChats)
  const [isDisabled, setIsDisabled] = useState(false)
  const [error, setError] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [playerId, setPlayerId] = useState(defaultPlayerId)

  function handleSubmit () {
    const createdAt = +new Date()

    setChats({
      ...chats,
      [createdAt]: {
        createdAt,
        message,
        playerName: playerId,
        createdBy: playerId,
        isAdmin,
      },
    })
    setMessage('')
  }

  return (<>
    <Headline>Chat Box</Headline>
    <div className="flex flex-wrap gap-4">
      <div className="size-96 max-w-full">
        <ChatBox
          chats={chats}
          disabled={isDisabled}
          error={error}
          message={message}
          playerId={playerId}
          setMessage={setMessage}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Checkbox
          checked={isDisabled}
          onChange={event => { setIsDisabled(event.target.checked) }}
        >
          isDisabled
        </Checkbox>

        <Checkbox
          checked={error}
          onChange={event => { setError(event.target.checked) }}
        >
          error
        </Checkbox>

        <hr />
        <Input
          label="My Player Id"
          value={playerId}
          onChange={event => { setPlayerId(event.target.value) }}
        />
        <Checkbox
          checked={isAdmin}
          size="sm"
          onChange={event => { setIsAdmin(event.target.checked) }}
        >isAdmin</Checkbox>
      </div>
    </div>
  </>)
}
