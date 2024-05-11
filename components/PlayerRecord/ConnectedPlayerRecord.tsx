import { usePlayer } from '@/hooks/usePlayer'
import { PlayerRecord } from './PlayerRecord'
import { usePlayerRecord } from '../../hooks/usePlayerRecord'

export function ConnectedPlayerRecord () {
  const { player } = usePlayer()

  const { record, isRecordPending } = usePlayerRecord({ playerId: player?.id })

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
      loading={isRecordPending}
      loseCount={loseCount}
      winCount={winCount}
      winRate={winRate}
    />
  )
}
