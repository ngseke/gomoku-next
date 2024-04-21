import { cn } from '@/modules/cn'
import { type ReactNode, forwardRef, type ComponentProps } from 'react'

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
  const shadow = (
    <span
      className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] opacity-0 blur-lg transition-opacity duration-200 peer-focus-within:opacity-50"
    />
  )

  return (
    <div
      className={cn('relative h-10 w-full min-w-0', {
        'h-8': size === 'sm',
      })}
    >
      <div className="peer flex size-full items-center rounded-lg border border-neutral-200 bg-gradient-to-br from-[#fdfbfb] from-50% to-[#ebedee] px-2 outline outline-1 outline-transparent duration-150 focus-within:outline-[#fcb69f]">
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

      {shadow}
    </div>
  )
}
)
