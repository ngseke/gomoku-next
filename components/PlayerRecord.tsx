import { useTranslations } from 'next-intl'
import { Stat } from './Stat'
import { useQuery } from '@tanstack/react-query'
import { useAxios } from '@/hooks/useAxios'
import { type PlayerRecord as TPlayerRecord } from '@/types/PlayerRecord'
import { cn } from '@/modules/cn'
import { usePlayer } from '@/hooks/usePlayer'

export function PlayerRecord () {
  const t = useTranslations()
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
    <div className="relative flex size-full items-center justify-center rounded-2xl bg-neutral-100 p-4 disabled:opacity-50 dark:bg-neutral-900 sm:py-0">
      <div
        className={cn('flex flex-wrap gap-x-4 gap-y-1', {
          invisible: isPending,
        })}
      >
        <Stat label={t('playerRecord.winCount')}>{winCount}</Stat>
        <Stat label={t('playerRecord.loseCount')}>{loseCount}</Stat>
        <Stat label={t('playerRecord.winRate')}>{winRate}</Stat>
      </div>
    </div>
  )
}
