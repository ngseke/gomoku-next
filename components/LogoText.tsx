import { cn } from '@/modules/cn'
import { type ComponentProps } from 'react'

export function Logo ({ className, ...restProps }: ComponentProps<'span'>) {
  return (
    <span
      className={cn('inline-flex bg-gradient-to-tr from-black to-[rgba(67,67,67,.7)] bg-clip-text text-4xl font-black tracking-tighter text-transparent', className)}
      {...restProps}
    >
      Gomoku Next
    </span>
  )
}
