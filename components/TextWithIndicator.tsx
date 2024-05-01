import { cn } from '@/modules/cn'
import { type PropsWithChildren } from 'react'

export function TextWithIndicator ({ children, active }: PropsWithChildren<{
  active?: boolean
}>) {
  return (
    <span
      className={cn(
        'relative',
        'before:absolute before:-right-2.5 before:-top-0.5 before:size-1.5 before:scale-0 before:rounded-full before:bg-[#fcb69f] before:opacity-0 before:duration-200',
        'after:absolute after:-right-2.5 after:-top-0.5 after:hidden after:size-1.5 after:rounded-full after:bg-[#fcb69f]',
        active ? 'before:scale-100 before:opacity-100 after:inline after:animate-ping' : ''
      )}
    >
      {children}
    </span>
  )
}
