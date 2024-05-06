import { useTranslations } from 'next-intl'
import { Stat } from './Stat'
import { cn } from '@/modules/cn'
import { type ReactNode } from 'react'

export function PlayerRecord ({
  winCount,
  loseCount,
  winRate,
  loading: isLoading,
}: {

  winCount?: ReactNode
  loseCount?: ReactNode
  winRate?: ReactNode
  loading?: boolean
}) {
  const t = useTranslations()

  return (
    <div className="relative flex size-full items-center justify-center rounded-2xl bg-neutral-100 p-4 disabled:opacity-50 dark:bg-neutral-900 sm:py-0">
      <div
        className={cn('flex flex-wrap gap-x-4 gap-y-1', {
          invisible: isLoading,
        })}
      >
        <Stat label={t('playerRecord.winCount')}>{winCount}</Stat>
        <Stat label={t('playerRecord.loseCount')}>{loseCount}</Stat>
        <Stat label={t('playerRecord.winRate')}>{winRate}</Stat>
      </div>
    </div>
  )
}
