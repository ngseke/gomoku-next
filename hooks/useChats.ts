import { useAppSelector } from '@/lib/hooks'

export function useChats () {
  const chats = useAppSelector(state => state.chat.chats)

  return {
    chats,
  }
}
