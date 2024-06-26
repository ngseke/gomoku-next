import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'
import { type Dialog } from './Dialog'
import { IconDialog } from './IconDialog'

export function LoadingDialog (
  { title, children, ...restProps }: ComponentProps<typeof Dialog>
) {
  return (
    <IconDialog
      {...restProps}
      icon={<FontAwesomeIcon spin icon={faCircleNotch} />}
      title={title}
    >
      {children}
    </IconDialog>
  )
}
