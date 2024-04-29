import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'
import { Dialog } from './Dialog'

export function LoadingDialog (
  { title, children, ...restProps }: ComponentProps<typeof Dialog>
) {
  return (
    <Dialog
      {...restProps}
      title={
        <div className="flex w-full flex-col gap-4 text-center">
          <FontAwesomeIcon spin className="text-4xl text-neutral-600 dark:text-neutral-400" icon={faCircleNotch} />
          <span>
            {title}
          </span>
        </div>
      }
    >
      <div className="text-center text-neutral-600 dark:text-neutral-400">
        {children}
      </div>
    </Dialog>
  )
}
