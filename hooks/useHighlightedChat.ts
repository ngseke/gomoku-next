import { type Chat } from '@/types/Chat'
import { useEffect, useState } from 'react'
import { usePlayer } from './usePlayer'

export function useHighlightedChat (chats: Record<string, Chat> | null) {
  const [highlightedChat, setHighlightedChat] = useState<Chat | null>(null)

  const latestChat = chats ? Object.values(chats).at(-1) ?? null : null

  const { player } = usePlayer()

  useEffect(() => {
    if (
      Boolean(latestChat?.isAdmin) ||
      latestChat?.createdBy === player?.id ||
      latestChat?.systemMessage
    ) return

    setHighlightedChat(latestChat)
    setTimeout(() => {
      setHighlightedChat(chat => {
        if (chat?.createdAt === latestChat?.createdAt) return null
        return chat
      })
    }, 3000)
  }, [latestChat, player?.id])

  return {
    highlightedChat,
  }
}
