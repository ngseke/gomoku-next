import { cn } from '@/modules/cn'
import { type ComponentProps } from 'react'

export function IncrementalDots (
  { className, ...restProps }: ComponentProps<'span'>
) {
  return (
    <span
      className={
        cn('inline-block after:inline-block after:animate-[incremental-dots_5s_infinite]',
          className)
      }
      {...restProps}
    />
  )
}
