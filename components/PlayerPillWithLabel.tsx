import { type ComponentProps } from 'react'
import { PlayerPill } from './PlayerPill'

export function PlayerPillWithLabel ({
  label,
  ...restProps
}: ComponentProps<typeof PlayerPill> & {
  label?: string
}) {
  return (
    <div className="inline-flex max-w-full flex-col items-center gap-1">
      <PlayerPill {...restProps} />
      <span className="text-sm font-medium opacity-60">
        {label}
      </span>
    </div>
  )
}
