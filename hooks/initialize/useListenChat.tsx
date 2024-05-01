'use client'

import { useEffect } from 'react'
import { useDatabase } from 'reactfire'
import { useAppDispatch } from '@/lib/hooks'
import { limitToLast, onChildAdded, query, ref } from 'firebase/database'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { pushChat, setChats } from '@/lib/features/chatSlice'

export function useListenChat () {
  const dispatch = useAppDispatch()
  const database = useDatabase()

  const playerState = usePlayerStateStore()
  const roomId = playerState?.roomId

  useEffect(() => {
    if (!roomId) {
      dispatch(setChats(null))
      return
    }
    const chatsRef = ref(database, `chats/${roomId}`)
    setChats(null)

    const unsubscribe = onChildAdded(
      query(chatsRef, limitToLast(10)),
      (snapshot) => {
        const key = snapshot.key
        const chat = snapshot.val()

        if (!key) return
        dispatch(pushChat({ key, chat }))
      }
    )

    return unsubscribe
  }, [database, dispatch, roomId])
}
