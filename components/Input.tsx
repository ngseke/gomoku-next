import { cn } from '@/modules/cn'
import { forwardRef, type ComponentProps } from 'react'

type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  size?: 'md' | 'sm'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input ({
  placeholder,
  disabled,
  size = 'md',
  ...restProps
}, ref) {
  const shadow = (
    <span
      className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] opacity-0 blur-lg transition-opacity duration-200 peer-focus:opacity-50"
    />
  )

  return (
    <div
      className={cn('relative h-10 w-full min-w-0', {
        'h-8': size === 'sm',
      })}
    >
      <input
        ref={ref}
        className={cn(
          'peer size-full rounded-lg border border-neutral-200 bg-gradient-to-br from-[#fdfbfb] from-50% to-[#ebedee] px-2 text-lg outline outline-1 outline-transparent duration-150 focus:outline-[#fcb69f]',
          { 'text-base': size === 'sm' },
          { 'opacity-50': disabled }
        )}
        disabled={disabled}
        placeholder={placeholder ?? 'Aa'}
        type="text"
        {...restProps}
      />

      {shadow}
    </div>
  )
}
)
