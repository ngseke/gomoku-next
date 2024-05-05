import { cn } from '@/modules/cn'
import { type ComponentProps } from 'react'

type LogoProps = ComponentProps<'h1'> & {
  size?: 'sm' | 'md' | 'lg'
}

export function LogoText ({ className, ...restProps }: LogoProps) {
  return (
    <h1
      className={cn(
        'inline-flex bg-gradient-to-tr from-black to-[rgba(67,67,67,.7)] bg-clip-text font-inter text-4xl font-black tracking-tighter text-transparent',
        'dark:from-[rgb(188,188,188)] dark:to-[white]',
        className,
      )}
      {...restProps}
    >
      Gomoku Next
    </h1>
  )
}
