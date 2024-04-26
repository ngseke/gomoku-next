import { cn } from '@/modules/cn'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ComponentProps } from 'react'
import { InputShadow } from './InputShadow'
import { inputClassNames } from '@/modules/classNames'

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
          className={cn('peer size-full flex-1 appearance-none items-center px-2 ', inputClassNames)}
          disabled={disabled}
          type="checkbox"
          {...restProps}
        />
        <InputShadow />

        <span className={cn('absolute inset-0 flex translate-y-0.5 items-center justify-center opacity-0 duration-100', {
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
