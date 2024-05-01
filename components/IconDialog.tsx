import { type ReactNode, type ComponentProps } from 'react'
import { Dialog } from './Dialog'

type IconDialogProps = ComponentProps<typeof Dialog> & {
  icon?: ReactNode
}

export function IconDialog (
  { title, icon, children, ...restProps }: IconDialogProps
) {
  return (
    <Dialog
      {...restProps}
      title={
        <div className="flex w-full flex-col gap-4 text-center">
          <span className="mt-2 text-4xl text-neutral-600 dark:text-neutral-400">
            {icon}
          </span>
          <span>
            {title}
          </span>
        </div>
      }
    >
      {children &&
        <div className="text-center text-neutral-600 dark:text-neutral-400">
          {children}
        </div>}
    </Dialog>
  )
}
