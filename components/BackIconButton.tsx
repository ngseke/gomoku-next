import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'

export function BackIconButton (props: ComponentProps<'button'>) {
  return (
    <button
      className="aspect-square px-2 text-3xl text-neutral-600 enabled:hover:opacity-90 dark:text-neutral-400"
      type="button"
      {...props}
    >
      <FontAwesomeIcon icon={faCaretLeft} />
    </button>
  )
}
