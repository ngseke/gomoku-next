import { cn } from '@/modules/cn'

export function Piece ({
  color,
}: { color: 'black' | 'white' }) {
  return (
    <div
      className={cn('size-9/12 rounded-full border border-transparent bg-gradient-to-tr from-neutral-200 to-neutral-200', {
        'from-[#000] to-[#434343] bg-gradient-to-tr border-neutral-700/50': color === 'black',
        'from-[#cfd4d7] to-[#fdfbfb] border-neutral-400/50': color === 'white',
      })}
    />
  )
}
