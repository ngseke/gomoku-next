import { type Position } from '@/types/Position'

export function formatPosition (position: Position) {
  const x = String.fromCharCode(65 + position.x)
  const y = String(15 - position.y)

  return { x, y }
}
