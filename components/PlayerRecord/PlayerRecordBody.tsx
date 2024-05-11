import { useTranslations } from 'next-intl'
import { Stat } from '../Stat'
import { cn } from '@/modules/cn'
import { type ReactNode } from 'react'

export function PlayerRecordBody ({
  winCount,
  loseCount,
  winRate,
  loading,
}: {

  winCount?: ReactNode
  loseCount?: ReactNode
  winRate?: ReactNode
  loading?: boolean
}) {
  const t = useTranslations()

  return (
    <div
      className={cn('flex flex-wrap gap-x-4 gap-y-1 duration-500', {
        'opacity-0 select-none': loading,
      })}
    >
      <Stat label={t('playerRecord.winCount')}>{winCount}</Stat>
      <Stat label={t('playerRecord.loseCount')}>{loseCount}</Stat>
      <Stat label={t('playerRecord.winRate')}>{winRate}</Stat>
    </div>
  )
}
