import { type ComponentProps } from 'react'
import { PlayerPill } from './PlayerPill'

type PlayerPillButtonProps = ComponentProps<typeof PlayerPill> & {
  onClick?: () => void
}

export function PlayerPillButton (
  { onClick, ...restProps }: PlayerPillButtonProps
) {
  return (
    <button className="inline-flex" type="button" onClick={onClick}>
      <PlayerPill {...restProps} />
    </button>
  )
}
