import { useState } from 'react'
import { useAxios } from './useAxios'

export function useSendChat (roomId: string) {
  const axios = useAxios()

  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  async function send () {
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
