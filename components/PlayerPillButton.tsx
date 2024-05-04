import { type ComponentProps } from 'react'
import { PlayerPill } from './PlayerPill'

type PlayerPillButtonProps = ComponentProps<typeof PlayerPill> & {
  disabled?: boolean
  onClick?: () => void
}

export function PlayerPillButton (
  { onClick, disabled, ...restProps }: PlayerPillButtonProps
) {
  return (
    <button className="inline-flex" disabled={disabled} type="button"onClick={onClick}>
      <PlayerPill
        highlightOnHover={!disabled}
        {...restProps}
      />
    </button>
  )
}
