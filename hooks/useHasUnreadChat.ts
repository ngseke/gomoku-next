import { useChats } from './useChats'
import { useEffect, useState } from 'react'
import { usePrevious } from './usePrevious'

export function useHasUnreadChat ({ active }: { active: boolean }) {
  const { chats } = useChats()
  const previousChats = usePrevious(chats)

  const [hasUnreadChat, setHasUnreadChat] = useState(false)

  useEffect(() => {
    if (!active) return
    if (!chats || !previousChats) {
      setHasUnreadChat(false)
      return
    }
    const previousLength = Object.values(previousChats).length
    const length = Object.values(chats).length

    if (length > previousLength) {
      setHasUnreadChat(true)
    }
  }, [active, chats, previousChats])

  return {
    hasUnreadChat,
    setHasUnreadChat,
  }
}
