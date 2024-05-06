import { useTranslations } from 'next-intl'
import { Stat } from './Stat'
import { cn } from '@/modules/cn'
import { type CSSProperties, type ReactNode } from 'react'
import { type Nullish } from '@/types/Nullish'

export function PlayerRecord ({
  winCount,
  loseCount,
  winRate,
  loading: isLoading,
  emoji,
}: {

  winCount?: ReactNode
  loseCount?: ReactNode
  winRate?: ReactNode
  loading?: boolean
  emoji?: Nullish<string>
}) {
  const t = useTranslations()

  return (
    <div className={cn(
      'relative flex size-full items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 p-4 disabled:opacity-50 dark:bg-neutral-900 sm:py-0',
      'after:pointer-events-none after:absolute after:-bottom-4 after:right-0 after:select-none after:text-9xl after:opacity-20 after:content-[var(--emoji)] dark:after:opacity-10'
    )}
      style={{ '--emoji': `"${emoji}"` } as CSSProperties}
    >
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
