import { cn } from '@/modules/cn'
import { type ComponentProps } from 'react'

export function Piece ({
  color,
}: { color: 'black' | 'white' }) {
  return (
    <div
      className={cn('size-10/12 animate-piece rounded-full border border-transparent bg-gradient-to-tr from-neutral-200 to-neutral-200', {
        'from-[#000] to-[#434343] bg-gradient-to-tr border-neutral-700/50': color === 'black',
        'from-[#cfd4d7] to-[#fdfbfb] border-neutral-400/50': color === 'white',
      })}
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
