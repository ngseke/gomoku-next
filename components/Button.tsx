import { cn } from '@/modules/cn'
import { type ReactNode, type ComponentProps } from 'react'

export function Button ({ block, icon, loading, children, disabled, ...restProps }: ComponentProps<'button'> & {
  block?: boolean
  icon?: ReactNode
  loading?: boolean
}) {
  const isIconButton = Boolean(icon && !children)

  return (
    <div
      className={cn('relative h-10 ', {
        'min-w-20': !isIconButton,
        'w-10': isIconButton,
        'w-full': block,
      })}
    >
      <button
        className={cn('peer inline-flex size-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 text-sm font-bold outline outline-1 outline-transparent duration-150 enabled:active:scale-[97%]', {
          'px-3': !isIconButton,
          'opacity-50': disabled,
        })}
        disabled={disabled}
        type="button"
        {...restProps}
      >
        {icon && <span className="text-base">{icon}</span>}

        {children && (
          <span className="shrink-0">
            {children}
          </span>
        )}
      </button>
      <span
        className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 opacity-0 blur-lg transition-opacity duration-200 peer-hover:peer-enabled:opacity-70"
      />
    </div>
  )
}
