import { type PlayerRecord } from '@/types/PlayerRecord'
import { type Nullish } from '@/types/Nullish'

export function formatPlayerRecord (record?: Nullish<PlayerRecord>) {
  const winCount = record?.winCount ?? 0
  const loseCount = record?.loseCount ?? 0
  const drawCount = record?.drawCount ?? 0
  const total = winCount + loseCount + drawCount
  const winRate = total
    ? `${Number(Number((winCount / total * 100)).toFixed(1))}%`
    : '-'

  return {
    winCount,
    loseCount,
    drawCount,
    total,
    winRate,
  }
}
