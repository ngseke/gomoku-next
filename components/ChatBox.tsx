import { type SyntheticEvent, useEffect, useRef, type KeyboardEvent } from 'react'
import { ChatList } from './ChatList'
import { Input } from './Input'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type Chat } from '@/types/Chat'

export interface ChatBoxProps {
  chats: Record<string, Chat> | null
  message: string
  disabled: boolean
  setMessage: (message: string) => void
  onSubmit: () => Promise<void>
  error: unknown
}

export function ChatBox ({
  chats,
  message,
  disabled,
  onSubmit,
  setMessage,
  error,
}: ChatBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  function focusInput () {
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  async function handleSubmit (event: SyntheticEvent) {
    event.preventDefault()
    if (!message.trim()) return

    await onSubmit()
    focusInput()
  }

  const scrollableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollableRef.current?.scrollTo(0, Number.MAX_SAFE_INTEGER)
  }, [chats])

  function handleKeyDown (event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape' && !event.nativeEvent.isComposing) {
      inputRef.current?.blur()
    }
  }

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
          disabled={disabled}
          rightSection={Boolean(error) && (
            <FontAwesomeIcon
              className="text-rose-500"
              icon={faTriangleExclamation}
            />
          )}
          size="sm"
          value={message}
          onChange={event => { setMessage(event.target.value) }}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  )
}
