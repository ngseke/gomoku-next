import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'
import { Button } from './Button'

export function BackIconButton (props: ComponentProps<typeof Button>) {
  return (
    <Button
      className="text-neutral-600 dark:text-neutral-400"
      {...props}
      icon={<FontAwesomeIcon icon={faCaretLeft} />}
    />
  )
}
