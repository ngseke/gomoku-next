import { type Nullish } from '@/types/Nullish'
import { Tag } from './Tag'
import { type Piece } from '@/types/Piece'
import { useTranslations } from 'next-intl'

export function FirstPieceTag ({ piece }: { piece: Nullish<Piece> }) {
  const t = useTranslations()

  if (!piece) return null

  return (
    <Tag
      text={{
        black: t('game.blackFirst'),
        white: t('game.whiteFirst'),
      }[piece]}
    />
  )
}
