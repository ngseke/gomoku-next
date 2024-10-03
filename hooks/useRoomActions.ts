import { useRouter } from '@/navigation'
import { useAxios } from './useAxios'
import { useRoomStore } from './useRoomStore'
import { useState } from 'react'

export function useRoomActions () {
  const room = useRoomStore()
  const roomId = room?.id
  const axios = useAxios()
  const router = useRouter()

  const [isSubmittingRoomAction, setSubmittingRoomAction] = useState(false)

  async function exitRoom () {
    try {
      setSubmittingRoomAction(true)
      await axios.post('/api/room/exit')
      router.replace('/')
    } catch (err) {
      console.error(err)
    } finally {
      setSubmittingRoomAction(false)
    }
  }

  async function createNewBoard () {
    if (!roomId) return

    try {
      setSubmittingRoomAction(true)
      await axios.post(`/api/room/${roomId}/new-board`)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmittingRoomAction(false)
    }
  }

  return {
    exitRoom,
    createNewBoard,
    isSubmittingRoomAction,
  }
}
