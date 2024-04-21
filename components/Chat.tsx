import { useDatabaseChat } from '@/hooks/useDatabaseChat'
import { type SyntheticEvent, useEffect, useRef } from 'react'
import { ChatList } from './ChatList'
import { Input } from './Input'
import { useSendChat } from '@/hooks/useSendChat'

export function Chat ({ roomId }: { roomId: string }) {
  const { chats } = useDatabaseChat(roomId)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const { message, setMessage, send, isSending } =
    useSendChat(roomId)

  function focusInput () {
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  async function handleSubmit (event: SyntheticEvent) {
    event.preventDefault()
    if (!message.trim()) return

    await send()
    focusInput()
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

      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          disabled={isSending}
          size="sm"
          value={message}
          onChange={event => { setMessage(event.target.value) }}
        />
      </form>
    </div>
  )
}
