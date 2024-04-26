import { cn } from '@/modules/cn'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'
import { InputShadow } from './InputShadow'

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
          checked={checked}
          className={cn('dark:focus-within:outline-[#fb9877 peer size-full flex-1 appearance-none items-center rounded-lg border border-neutral-200 bg-transparent bg-gradient-to-br from-[#fdfbfb] from-50% to-[#ebedee] px-2 outline-none outline outline-1 outline-transparent duration-150  focus-within:outline-[#fcb69f] dark:border-neutral-800 dark:from-[#141211] dark:to-[#020404]')}
          disabled={disabled}
          type="checkbox"
          {...restProps}
        />
        <InputShadow />

        <span className={cn('absolute inset-0 flex translate-y-0.5 items-center justify-center opacity-0 duration-200', {
          'opacity-100 translate-y-0': checked,
        })}
        >
          <FontAwesomeIcon className="scale-75" icon={faCheck} />
        </span>
      </div>

      <span>
        {children}
      </span>
    </label>
  )
}
