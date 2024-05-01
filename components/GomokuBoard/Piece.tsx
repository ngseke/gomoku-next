import { cn } from '@/modules/cn'
import { type ComponentProps } from 'react'

export function Piece ({ color, className, animate, emphasis, dimmed }: {
  color: 'black' | 'white'
  animate?: boolean
  emphasis?: boolean
  dimmed?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'inline-block aspect-square size-10/12 rounded-full border border-transparent bg-gradient-to-tr from-neutral-200 to-neutral-200 duration-100',
        {
          'from-[#000] to-[#434343] bg-gradient-to-tr border-neutral-700/50 dark:border-neutral-500/50': color === 'black',
          'from-[#cfd4d7] to-[#fdfbfb] border-neutral-400/50 dark:border-neutral-600/50': color === 'white',
          'animate-piece': animate,
          'scale-[130%]': emphasis,
          'opacity-60': dimmed,
        },
        className
      )}
    />
  )
}

export function PieceGhost ({ className }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('absolute size-10/12 rounded-full border-2 border-dotted border-[#fcb69f]/50 bg-[#fcb69f]/10 duration-100', className)}
    />
  )
}
