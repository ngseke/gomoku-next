import { cn } from '@/modules/cn'
import { type ComponentProps } from 'react'

export function InputShadow ({
  className,
  ...restProps
}: ComponentProps<'span'>) {
  return (
    <span
      className={cn('absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] opacity-0 blur-lg transition-opacity duration-200 peer-focus-within:opacity-50 dark:from-[#ffd8a3] dark:to-[#fb9877]', className)}
      {...restProps}
    />
  )
}
