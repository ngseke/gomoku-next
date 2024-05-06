import { useQuery } from '@tanstack/react-query'
import { useAxios } from '@/hooks/useAxios'
import { type PlayerRecord as TPlayerRecord } from '@/types/PlayerRecord'
import { usePlayer } from '@/hooks/usePlayer'
import { PlayerRecord } from './PlayerRecord'

export function ConnectedPlayerRecord () {
  const axios = useAxios()
  const { player } = usePlayer()

  const { isPending, data: record } = useQuery<TPlayerRecord>({
    queryKey: [],
    queryFn: async () => (await axios.get('/api/player/record')).data,
  })

  if (!player) return null

  const winCount = record?.winCount ?? 0
  const loseCount = record?.loseCount ?? 0
  const drawCount = record?.drawCount ?? 0
  const total = winCount + loseCount + drawCount
  const winRate = total
    ? `${Number(Number((winCount / total * 100)).toFixed(1))}%`
    : '-'

  return (
    <PlayerRecord
      emoji={player.emoji}
      loading={isPending}
      loseCount={loseCount}
      winCount={winCount}
      winRate={winRate}
    />
  )
}
