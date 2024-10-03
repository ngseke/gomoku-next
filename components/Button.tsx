import { cn } from '@/modules/cn'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { type ReactNode, type ComponentProps, forwardRef } from 'react'

type ButtonProps =
  ComponentProps<'button'> &
  Omit<ComponentProps<typeof Link>, 'href'> &
  {
    block?: boolean
    readonly?: boolean
    icon?: ReactNode
    loading?: boolean
    href?: string
    variant?: 'default' | 'subtle'
  }

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button ({
    block, icon, loading, children, disabled, readonly, className, href, variant = 'default', ...restProps
  }, ref) {
    const isIconButton = Boolean(icon && !children)

    const body = loading
      ? <FontAwesomeIcon spin className="text-lg" icon={faCircleNotch} />
      : <>
        {icon && <span className="text-base">{icon}</span>}
        {children && (
          <span className="shrink-0">
            {children}
          </span>
        )}
      </>

    const Component: any = href ? Link : 'button'

    return (
      <div
        className={cn('relative inline-block h-10 flex-none', {
          'min-w-20': !isIconButton,
          'w-10': isIconButton,
          'w-full': block,
        })}
      >
        <Component
          ref={ref}
          className={cn(
            'peer inline-flex size-full select-none items-center justify-center gap-2 rounded-full border border-transparent text-sm font-bold outline outline-1 outline-transparent duration-150 enabled:hover:bg-neutral-200 enabled:hover:shadow-lg enabled:active:scale-[97%] dark:enabled:hover:bg-neutral-700',
            {
              'px-4': !isIconButton,
              'opacity-50': Boolean(disabled) || Boolean(loading),
              'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800': variant === 'default',
              'enabled:hover:shadow-none': variant === 'subtle',
            },
            className
          )}
          disabled={Boolean(disabled) || Boolean(readonly) || Boolean(loading)}
          href={href ?? ''}
          type="button"
          {...restProps}
        >
          {body}
        </Component>
      </div>
    )
  }
)
