import { useState } from 'react'
import { useAxios } from './useAxios'
import { type Nullish } from '@/types/Nullish'

export function useSendChat (roomId: Nullish<string>) {
  const axios = useAxios()

  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function send () {
    if (!roomId) return

    setIsSending(true)
    setError(null)

    try {
      await axios.post(`/api/chat/${roomId}/create`, { message })
      setMessage('')
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsSending(false)
    }
  }

  return {
    message,
    setMessage,
    send,
    isSending,
    error,
  }
}
