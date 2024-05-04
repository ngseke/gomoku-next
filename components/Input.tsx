import { cn } from '@/modules/cn'
import { type ReactNode, forwardRef, type ComponentProps, useId } from 'react'
import { InputShadow } from './InputShadow'
import { inputClassNames } from '@/modules/classNames'

type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
  label?: string
  size?: 'md' | 'sm'
  leftSection?: ReactNode
  rightSection?: ReactNode
}

function SideSection (props: ComponentProps<'span'>) {
  return (
    <span className="text-neutral-700 dark:text-neutral-300" {...props} />
  )
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input ({
  label,
  placeholder,
  disabled,
  size = 'md',
  leftSection,
  rightSection,
  ...restProps
}, ref) {
  const id = useId()

  return (
    <div className="grid w-full gap-1">
      {label && (
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300" htmlFor={id}>{label}</label>
      )}
      <div
        className={cn('relative h-10 w-full min-w-0', {
          'h-8': size === 'sm',
        })}
      >
        <div className={cn('peer flex size-full items-center gap-2 px-2', inputClassNames)}>
          {leftSection && (<SideSection>{leftSection}</SideSection>)}

          <input
            ref={ref}
            className={cn(
              'size-full flex-1 bg-transparent text-lg outline-none placeholder:text-neutral-300 dark:placeholder:text-neutral-700',
              { 'text-base': size === 'sm' },
              { 'opacity-50': disabled },
            )}
            disabled={disabled}
            id={id}
            placeholder={placeholder ?? 'Aa'}
            type="text"
            {...restProps}
          />

          {rightSection && (<SideSection>{rightSection}</SideSection>)}
        </div>
        <InputShadow />
      </div>
    </div>
  )
})
