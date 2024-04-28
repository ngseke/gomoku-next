import { useAxios } from './useAxios'
import { useRoomStore } from './useRoomStore'

export function useRoomActions () {
  const room = useRoomStore()
  const roomId = room?.id
  const axios = useAxios()

  async function exitRoom () {
    await axios.post('/api/room/exit')
  }

  async function createNewBoard () {
    if (!roomId) return
    await axios.post(`/api/room/${roomId}/new-board`)
  }

  return {
    exitRoom,
    createNewBoard,
  }
}
