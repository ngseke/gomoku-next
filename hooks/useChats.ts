import { addWatcher, removeWatcher } from '@/lib/features/chatSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'

export function useChats () {
  const chats = useAppSelector(state => state.chat.chats)
  const unreadChatCount = useAppSelector(state => state.chat.unreadChatCount)

  const dispatch = useAppDispatch()

  const watcherId = useRef(nanoid())

  function watch () {
    dispatch(addWatcher(watcherId.current))
  }

  function unwatch () {
    dispatch(removeWatcher(watcherId.current))
  }

  useEffect(() => {
    const id = watcherId.current
    return () => {
      dispatch(removeWatcher(id))
    }
  }, [dispatch])

  return {
    chats,
    unreadChatCount,
    watch,
    unwatch,
  }
}
