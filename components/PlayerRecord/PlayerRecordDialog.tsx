import { useTranslations } from 'next-intl'
import { Dialog } from '../Dialog'
import { PlayerRecordBody } from './PlayerRecordBody'
import { usePlayerRecord } from '@/hooks/usePlayerRecord'
import { type Player } from '@/types/Player'
import { formatPlayerRecord } from '../../modules/formatPlayerRecord'
import { type Nullish } from '@/types/Nullish'
import { useCachedState } from '@/hooks/useCachedState'
import { type CSSProperties } from 'react'

export function PlayerRecordDialog ({ open, onClose, player }: {
  open?: boolean
  onClose?: () => void
  player?: Nullish<Player>
}) {
  const t = useTranslations()

  const cachedPlayer = useCachedState(player)
  const { record, isRecordPending } = usePlayerRecord({ playerId: cachedPlayer?.id })
  const { winCount, loseCount, winRate } = formatPlayerRecord(record)

  return (
    <Dialog open={Boolean(open)} title={t('playerRecord.title')} onClose={onClose}>
      <div
        className="relative flex flex-col gap-4 after:pointer-events-none after:absolute after:-bottom-4 after:right-0 after:select-none after:text-9xl after:opacity-20 after:content-[var(--emoji)] dark:after:opacity-10"
        style={{ '--emoji': `"${cachedPlayer?.emoji}"` } as CSSProperties}
      >
        <h3 className="text-2xl font-bold">{cachedPlayer?.name}</h3>

        <PlayerRecordBody
          loading={isRecordPending}
          loseCount={loseCount}
          winCount={winCount}
          winRate={winRate}
        />

      </div>
    </Dialog>
  )
}
