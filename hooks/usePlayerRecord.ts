import { useQuery } from '@tanstack/react-query'
import { useAxios } from '@/hooks/useAxios'
import { type PlayerRecord as TPlayerRecord } from '@/types/PlayerRecord'
import { usePlayer } from '@/hooks/usePlayer'
import { type Nullish } from '@/types/Nullish'

export function usePlayerRecord ({ playerId }: { playerId?: Nullish<string> }) {
  const axios = useAxios()
  const { player } = usePlayer()

  const {
    isPending: isRecordPending, data: record,
  } = useQuery<TPlayerRecord>({
    queryKey: [playerId],
    queryFn: async ({ queryKey }) => (
      await axios.get(`/api/player/record/${queryKey[0] as string}`)
    ).data,
    enabled: Boolean(player),
  })

  return {
    record,
    isRecordPending,
  }
}
