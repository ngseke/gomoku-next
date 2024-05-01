import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'
import { Dialog } from './Dialog'

export function ErrorDialog (
  { title, children, ...restProps }: ComponentProps<typeof Dialog>
) {
  return (
    <Dialog
      {...restProps}
      title={<span className="inline-flex items-center gap-2">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        {title}
      </span>}
    >
      <p className="text-neutral-600 dark:text-neutral-400">
        {children}
      </p>
    </Dialog>
  )
}
