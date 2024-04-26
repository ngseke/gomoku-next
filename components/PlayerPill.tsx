import { cn } from '@/modules/cn'
import { type Nullish } from '@/types/Nullish'
import { type ComponentProps } from 'react'

function NameSkeleton () {
  return (
    <span className="mr-2 inline-block h-4 w-14 rounded-md bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800" />
  )
}

function Name ({ dark, ...restProps }: ComponentProps<'span'> & { dark?: boolean }) {
  return (
    <span
      className={cn(
        'mr-2 truncate text-sm font-medium',
        { 'text-white': dark }
      )}
      {...restProps}
    />
  )
}

export function PlayerPill ({ name, image, emoji, loading, color, active }: {
  name?: Nullish<string>
  image?: Nullish<string>
  emoji?: Nullish<string>
  loading?: boolean
  color?: Nullish<'black' | 'white'>
  active?: boolean
}) {
  return (
    <span className="relative flex">
      <span
        className={cn(
          'inline-flex h-10 max-w-48 animate-flash-outline items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-1 outline outline-0 duration-300',
          'dark:border-neutral-800 dark:bg-neutral-900',
          {
            'bg-gradient-to-tr from-black to-[#434343]': color === 'black',
            'bg-gradient-to-tr from-[#cfd4d7] to-[#fdfbfb] dark:text-neutral-800': color === 'white',
            'outline-[3px]': active,
          }
        )}
      >
        <span className={cn(
          'flex aspect-square w-8 flex-none items-center justify-center overflow-hidden rounded-full bg-neutral-200',
          {
            'bg-neutral-800': color === 'black',
          }
        )}
        >
          {image && (
            <img alt="Avatar" className="size-full object-cover" src={image} />
          )}

          {emoji && (
            <span className="select-none text-2xl">{emoji}</span>
          )}
        </span>

        {loading
          ? <NameSkeleton />
          : (name && <Name dark={color === 'black'}>{name}</Name>)}
      </span>

      <span
        className={cn('absolute inset-0 -z-10 scale-90 animate-flash-bg rounded-full opacity-0 blur-lg transition-opacity duration-700', { 'opacity-70': active })}
      />
    </span>

  )
}
