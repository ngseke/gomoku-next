import { cn } from '@/modules/cn'
import { type ComponentProps } from 'react'

type LogoProps = ComponentProps<'span'> & {
  size?: 'md' | 'lg'
}

export function LogoText ({
  className,
  size = 'md',
  ...restProps
}: LogoProps) {
  return (
    <span
      className={cn(
        'inline-flex bg-gradient-to-tr from-black to-[rgba(67,67,67,.7)] bg-clip-text font-black tracking-tighter text-transparent',
        'dark:from-[rgb(188,188,188)] dark:to-[white]',
        {
          'text-4xl': size === 'md',
          'text-5xl': size === 'lg',
        },
        className,
      )}
      {...restProps}
    >
      Gomoku Next
    </span>
  )
}
