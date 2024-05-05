import { useTranslations } from 'next-intl'
import { Stat } from './Stat'

export function PlayerRecord () {
  const t = useTranslations()

  return (
    <div className="relative flex size-full items-center justify-center rounded-2xl bg-neutral-100 p-4 disabled:opacity-50 dark:bg-neutral-900 sm:py-0">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        <Stat label={t('playerRecord.winCount')}>123</Stat>
        <Stat label={t('playerRecord.loseCount')}>123</Stat>
        <Stat label={t('playerRecord.winRate')}>100%</Stat>
      </div>
    </div>
  )
}
