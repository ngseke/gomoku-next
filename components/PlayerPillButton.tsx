import { type ComponentProps } from 'react'
import { PlayerPill } from './PlayerPill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

type PlayerPillButtonProps = ComponentProps<typeof PlayerPill> & {
  disabled?: boolean
  onClick?: () => void
  editable?: boolean
}

export function PlayerPillButton (
  { onClick, disabled, editable, loading, ...restProps }: PlayerPillButtonProps
) {
  return (
    <button
      className="group inline-flex max-w-full"
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <PlayerPill
        highlightOnHover={!disabled}
        loading={loading}
        rightSection={(editable && !loading) &&
          <span className="w-0 scale-0 opacity-0 duration-200 group-hover:-mr-0.5 group-hover:ml-1.5 group-hover:w-4 group-hover:scale-100 group-hover:opacity-100">
            <FontAwesomeIcon
              className="text-xs text-neutral-600 dark:text-neutral-400"
              icon={faPen}
            />
          </span>}
        {...restProps}
      />
    </button>
  )
}
