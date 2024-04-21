import { useState } from 'react'
import { useAxios } from './useAxios'

export function useSendChat (roomId: string) {
  const axios = useAxios()

  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  async function send () {
    setIsSending(true)

    try {
      await axios.post(`/api/chat/create/${roomId}`, { message })
      setMessage('')
    } catch (err) {
      console.error(err)
    } finally {
      setIsSending(false)
    }
  }

  return {
    message,
    setMessage,
    send,
    isSending,
  }
}
