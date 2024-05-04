import { type SyntheticEvent, useEffect, useRef, type KeyboardEvent, useCallback, useState, Fragment } from 'react'
import { ChatList } from './ChatList'
import { Input } from './Input'
import { faArrowDown, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type Chat } from '@/types/Chat'
import { type Nullish } from '@/types/Nullish'
import { chatMessageMaxLength } from '@/modules/constants'
import { Button } from './Button'
import { Transition } from '@headlessui/react'

export interface ChatBoxProps {
  chats: Record<string, Chat> | null
  playerId: Nullish<string>
  message: string
  disabled: boolean
  visible?: boolean
  setMessage: (message: string) => void
  onSubmit?: () => void | Promise<void>
  error: unknown
}

export function ChatBox ({
  chats,
  playerId,
  message,
  disabled,
  visible,
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

    await onSubmit?.()
    focusInput()
  }

  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const [scrollBottom, setScrollBottom] = useState(0)
  const shouldShowScrollToBottomButton = scrollBottom > 50

  const handleScroll = useCallback(() => {
    const element = scrollableRef.current
    const height = element?.clientHeight ?? 0
    const scrollHeight = element?.scrollHeight ?? 0
    const scrollTop = element?.scrollTop ?? 0

    setScrollBottom(scrollHeight - (scrollTop + height))
  }, [])

  useEffect(() => {
    if (!visible) return
    setTimeout(handleScroll, 0)
  }, [handleScroll, visible])

  const scrollToBottom = useCallback(() => {
    scrollableRef.current?.scrollTo(0, Number.MAX_SAFE_INTEGER)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [chats, scrollToBottom])

  function handleKeyDown (event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape' && !event.nativeEvent.isComposing) {
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-neutral-200 px-3 pb-3 transition-colors dark:border-neutral-800">
      <div
        ref={scrollableRef}
        className="-mr-3 flex-1 overflow-auto scroll-smooth"
        onScroll={handleScroll}
      >
        <div className="py-4 pr-3">
          <ChatList chats={chats} playerId={playerId} />
        </div>

      </div>

      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          disabled={disabled}
          maxLength={chatMessageMaxLength}
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

      <Transition
        as={Fragment}
        enter="duration-300"
        enterFrom="opacity-0 scale-75"
        leave="duration-200"
        leaveTo="opacity-0"
        show={shouldShowScrollToBottomButton}
      >
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2">
          <Button
            icon={<FontAwesomeIcon icon={faArrowDown} />}
            onClick={scrollToBottom}
          />
        </div>
      </Transition>
    </div>
  )
}
