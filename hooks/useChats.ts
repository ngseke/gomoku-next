import { type Nullish } from '@/types/Nullish'
import { ref, limitToLast, query, onChildAdded } from 'firebase/database'
import { produce } from 'immer'
import { useEffect, useState } from 'react'
import { useDatabase } from 'reactfire'

export function useChats (roomId: Nullish<string>) {
  const database = useDatabase()

  const [chats, setChats] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    if (!roomId) {
      setChats(null)
      return
    }
    const chatsRef = ref(database, `chats/${roomId}`)
    setChats(null)

    const unsubscribe = onChildAdded(
      query(chatsRef, limitToLast(10)),
      (snapshot) => {
        const key = snapshot.key
        const data = snapshot.val()

        if (!key) return

        setChats((chats) => (
          produce(chats, (draft) => ({
            ...draft,
            [key]: data,
          }))
        ))
      }
    )

    return unsubscribe
  }, [database, roomId])

  return {
    chats,
  }
}
