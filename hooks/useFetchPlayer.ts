import { useCallback } from 'react'
import { useAxios } from './useAxios'
import { type Player } from '@/types/Player'
import { useAppDispatch } from '@/lib/hooks'
import { setPlayer } from '@/lib/features/authSlice'

export function useFetchPlayer () {
  const axios = useAxios()

  const fetchPlayer = useCallback(async () => {
    const { data: player } = await axios.get('/api/player')
    return player as Player
  }, [axios])

  const dispatch = useAppDispatch()
  const refetchGlobalPlayer = useCallback(async () => {
    const player = await fetchPlayer()
    dispatch?.(setPlayer(player))
  }, [dispatch, fetchPlayer])

  return {
    fetchPlayer,
    refetchGlobalPlayer,
  }
}
