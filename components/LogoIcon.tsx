import { type ComponentProps } from 'react'
import { Piece } from './GomokuBoard/Piece'
import { cn } from '@/modules/cn'

export function LogoIcon ({ className, ...restProps }: ComponentProps<'div'>) {
  return (
    <div className={cn('relative size-16', className)} {...restProps}>
      <div
        className="absolute inset-0 flex origin-right translate-x-[-20%] translate-y-[-15%] items-center justify-center bg-red-400/0"
      >
        <Piece className="size-3/5" color="black" />
      </div>
      <div
        className="absolute inset-0 flex origin-left translate-x-[20%] translate-y-[15%] items-center justify-center bg-blue-500/0"
      >
        <Piece className="size-3/5" color="white" />
      </div>
    </div>
  )
}
