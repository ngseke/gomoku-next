import { cn } from '@/modules/cn'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'

type CheckboxProps = Omit<ComponentProps<'input'>, 'size'> & {
  size?: 'md' | 'sm'
}

export function Checkbox ({
  checked,
  disabled,
  size = 'md',
  children,
  ...restProps
}: CheckboxProps) {
  const shadow = (
    <span
      className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] opacity-0 blur-lg transition-opacity duration-200 peer-focus-within:opacity-50"
    />
  )

  return (
    <label
      className={cn('flex select-none items-center gap-2.5 text-lg font-medium', {
        'text-base gap-1.5': size === 'sm',
        'opacity-50': disabled,
      })}
    >
      <div className={cn('relative aspect-square h-6', {
        'h-5': size === 'sm',
      })}
      >
        <input
          className={cn(
            'peer size-full flex-1 appearance-none items-center rounded-lg border border-neutral-200 bg-transparent bg-gradient-to-br from-[#fdfbfb] from-50% to-[#ebedee] px-2 outline-none outline outline-1 outline-transparent duration-150 checked:from-[#434343] checked:to-[#000] focus-within:outline-[#fcb69f]',
          )}
          disabled={disabled}
          type="checkbox"
          {...restProps}
        />
        {shadow}

        <span className={cn('absolute inset-0 flex translate-y-0.5 items-center justify-center opacity-0 duration-200', {
          'opacity-100 translate-y-0': checked,
        })}
        >
          <FontAwesomeIcon className="scale-75 text-white " icon={faCheck} />
        </span>
      </div>

      <span>
        {children}
      </span>
    </label>
  )
}
