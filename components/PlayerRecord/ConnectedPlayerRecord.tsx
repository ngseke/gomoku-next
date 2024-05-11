import { usePlayer } from '@/hooks/usePlayer'
import { PlayerRecord } from './PlayerRecord'
import { usePlayerRecord } from '../../hooks/usePlayerRecord'
import { formatPlayerRecord } from '@/modules/formatPlayerRecord'

export function ConnectedPlayerRecord () {
  const { player } = usePlayer()

  const { record, isRecordPending } = usePlayerRecord({ playerId: player?.id })

  if (!player) return null

  const { winCount, loseCount, winRate } = formatPlayerRecord(record)

  return (
    <PlayerRecord
      emoji={player.emoji}
      loading={isRecordPending}
      loseCount={loseCount}
      winCount={winCount}
      winRate={winRate}
    />
  )
}
