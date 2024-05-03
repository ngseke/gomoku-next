import { useCallback } from 'react'
import { useAxios } from './useAxios'
import { type Player } from '@/types/Player'

export function useFetchPlayer () {
  const axios = useAxios()

  const fetchPlayer = useCallback(async () => {
    const { data: player } = await axios.get('/api/player')
    return player as Player
  }, [axios])

  return { fetchPlayer }
}
