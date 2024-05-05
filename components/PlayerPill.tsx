import { cn } from '@/modules/cn'
import { type Nullish } from '@/types/Nullish'
import { type ReactNode, type ComponentProps } from 'react'

function NameSkeleton ({ className, ...restProps }: ComponentProps<'span'>) {
  return (
    <span className={cn('inline-block h-4 w-14 rounded-md bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800', className)} />
  )
}

function Name ({ dark, ...restProps }: ComponentProps<'span'> & { dark?: boolean }) {
  return (
    <span
      className={cn(
        'truncate text-sm font-medium',
        { 'text-white': dark }
      )}
      {...restProps}
    />
  )
}

export function PlayerPill ({ name, emoji, loading, ghost, color, active, highlightOnHover, rightSection }: {
  name?: Nullish<string>
  emoji?: Nullish<string>
  loading?: boolean
  ghost?: boolean
  color?: Nullish<'black' | 'white'>
  active?: boolean
  highlightOnHover?: boolean
  rightSection?: ReactNode
}) {
  return (
    <span className="group relative inline-flex max-w-full">
      <span
        className={cn(
          'inline-flex h-10 w-full max-w-64 animate-flash-outline items-center rounded-full border border-neutral-200 bg-neutral-100 px-1 pr-3 outline outline-0 duration-300',
          'dark:border-neutral-800 dark:bg-neutral-900',
          {
            'bg-gradient-to-tr from-black to-[#434343]': color === 'black',
            'bg-gradient-to-tr from-[#cfd4d7] to-[#fdfbfb] dark:text-neutral-800': color === 'white',
            'outline-[3px]': active,
            'hover:shadow-lg hover:bg-neutral-200 dark:hover:bg-neutral-700': highlightOnHover,
            'border-[2.5px] border-dotted bg-transparent dark:bg-transparent': ghost,
          }
        )}
      >
        <span className={cn(
          'mr-2 flex aspect-square w-8 flex-none items-center justify-center overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800',
          {
            'bg-neutral-800': color === 'black',
            'dark:bg-neutral-200': color === 'white',
            'border-[2.5px] border-dotted bg-transparent border-neutral-200 dark:bg-transparent dark:border-neutral-800': ghost,
          }
        )}
        >
          {emoji && (<span className="select-none text-2xl">{emoji}</span>)}
        </span>

        {(Boolean(loading) || Boolean(ghost))
          ? <NameSkeleton className={cn({ 'opacity-0': ghost })} />
          : (name && <Name dark={color === 'black'}>{name}</Name>)}

        {rightSection}
      </span>

      <span
        className={cn('absolute inset-0 -z-10 scale-90 animate-flash-bg rounded-full opacity-0 blur-lg transition-opacity duration-700', { 'opacity-70': active })}
      />
    </span>

  )
}
