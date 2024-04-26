import { cn } from '@/modules/cn'
import { type ReactNode, forwardRef, type ComponentProps } from 'react'
import { InputShadow } from './InputShadow'

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
      <div className="peer flex size-full items-center rounded-lg border border-neutral-200 bg-gradient-to-br from-[#fdfbfb] from-50% to-[#ebedee] px-2 outline outline-1 outline-transparent duration-150 focus-within:outline-[#fcb69f] dark:border-neutral-800 dark:from-[#141211] dark:to-[#020404] dark:focus-within:outline-[#fb9877]">
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
