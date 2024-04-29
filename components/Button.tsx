import { cn } from '@/modules/cn'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ReactNode, type ComponentProps } from 'react'

export function Button ({ block, icon, loading, children, disabled, readonly, className, ...restProps }: ComponentProps<'button'> & {
  block?: boolean
  readonly?: boolean
  icon?: ReactNode
  loading?: boolean
}) {
  const isIconButton = Boolean(icon && !children)

  const body = loading
    ? <FontAwesomeIcon spin icon={faCircleNotch} />
    : <>
      {icon && <span className="text-base">{icon}</span>}
      {children && (
        <span className="shrink-0">
          {children}
        </span>
      )}
    </>

  return (
    <div
      className={cn('relative inline-block h-10 flex-none', {
        'min-w-20': !isIconButton,
        'w-10': isIconButton,
        'w-full': block,
      })}
    >
      <button
        className={cn(
          'peer inline-flex size-full select-none items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 text-sm font-bold outline outline-1 outline-transparent duration-150 hover:shadow-lg enabled:active:scale-[97%]',
          'dark:border-neutral-800 dark:bg-neutral-900',
          {
            'px-4': !isIconButton,
            'opacity-50': Boolean(disabled) || Boolean(loading),
          },
          className
        )}
        disabled={Boolean(disabled) || Boolean(readonly) || Boolean(loading)}
        type="button"
        {...restProps}
      >
        {body}
      </button>
    </div>
  )
}
