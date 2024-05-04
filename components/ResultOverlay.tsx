import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Button } from './Button'
import { ResultSign } from './ResultSign'
import { type BoardResult } from '@/types/BoardResult'
import { type Nullish } from '@/types/Nullish'
import { type Piece } from '@/types/Piece'
import { useTranslations } from 'next-intl'

export function ResultOverlay ({ result, onClickNewRound, piece, disabled }: {
  result?: Nullish<BoardResult>
  piece?: Nullish<Piece>
  onClickNewRound?: () => void
  disabled?: boolean
}) {
  const t = useTranslations()

  const [count, setCount] = useState(0)
  const [isReadonly, setIsReadonly] = useState(true)

  if (!result) return null

  return (
    <div
      key={count}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 overflow-hidden pt-8"
    >
      <div
        className="animate-[result-sign_.5s_1s_cubic-bezier(1,0.8,0.3,1)_normal_forwards] opacity-0"
        onDoubleClick={() => {
          setIsReadonly(true)
          setCount(count + 1)
        }}
      >
        {result?.type === 'draw' &&
          <ResultSign type="draw" />}

        {result?.type === 'win' && (
          <ResultSign
            type={result.piece === piece ? 'win' : 'lose'}
          />
        )}
      </div>

      <div
        className="animate-[result-actions_.5s_1.75s_normal_forwards] opacity-0"
        onAnimationEnd={() => { setIsReadonly(false) }}
      >
        <Button
          disabled={disabled}
          icon={<FontAwesomeIcon icon={faPlay} />}
          readonly={isReadonly}
          onClick={onClickNewRound}
        >
          {t('action.newRound')}
        </Button>
      </div>
    </div>
  )
}
