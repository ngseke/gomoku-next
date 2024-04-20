import { useDatabaseChat } from '@/hooks/useDatabaseChat'
import { useEffect, useRef, useState } from 'react'
import { ChatList } from './ChatList'
import { useAxios } from '@/hooks/useAxios'
import { Input } from './Input'

export function Chat ({ roomId }: { roomId: string }) {
  const { chats } = useDatabaseChat(roomId)

  const [message, setMessage] = useState('')

  const axios = useAxios()

  async function send () {
    await axios.post(`/api/chat/create/${roomId}`, { message })
    setMessage('')
  }

  const scrollableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollableRef.current?.scrollTo(0, Number.MAX_SAFE_INTEGER)
  }, [chats])

  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-200 px-3 pb-3">
      <div ref={scrollableRef} className="-mr-3 flex-1 overflow-auto scroll-smooth">
        <div className="py-4 pr-3">
          <ChatList chats={chats} />
        </div>
      </div>

      <form
        className="flex-none"
        onSubmit={async (event) => {
          event.preventDefault()
          await send()
        }}
      >
        <Input
          size="sm"
          value={message}
          onChange={event => { setMessage(event.target.value) }}
        />
      </form>
    </div>
  )
}
