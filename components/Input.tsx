import { cn } from '@/modules/cn'
import { type ReactNode, forwardRef, type ComponentProps } from 'react'
import { InputShadow } from './InputShadow'
import { inputClassNames } from '@/modules/classNames'

type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  size?: 'md' | 'sm'
  rightSection?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input ({
  placeholder,
  disabled,
  size = 'md',
  rightSection,
  ...restProps
}, ref) {
  return (
    <div
      className={cn('relative h-10 w-full min-w-0', {
        'h-8': size === 'sm',
      })}
    >
      <div className={cn('peer flex size-full items-center px-2 ', inputClassNames)}>
        <input
          ref={ref}
          className={cn(
            'size-full flex-1 bg-transparent  text-lg outline-none',
            { 'text-base': size === 'sm' },
            { 'opacity-50': disabled },
          )}
          disabled={disabled}
          placeholder={placeholder ?? 'Aa'}
          type="text"
          {...restProps}
        />

        {rightSection && (
          <span className="">
            {rightSection}
          </span>
        )}
      </div>

      <InputShadow />
    </div>
  )
}
)
