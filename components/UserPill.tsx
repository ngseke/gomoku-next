import { cn } from '@/modules/cn'
import { type Nullish } from '@/types/Nullish'
import { type ComponentProps } from 'react'

function NameSkeleton () {
  return (
    <span className="mr-2 inline-block h-4 w-14 rounded-md bg-neutral-200" />
  )
}

function Name (props: ComponentProps<'span'>) {
  return (
    <span className="mr-2 truncate text-sm font-medium" {...props} />
  )
}

const whiteClassName = 'bg-gradient-to-tr from-[#fdfbfb] to-[#cfd4d7]'
const blackClassName = 'bg-gradient-to-tr from-black to-[#434343] text-white'

export function UserPill ({ name, image, emoji, loading, color, active }: {
  name?: Nullish<string>
  image?: Nullish<string>
  emoji?: Nullish<string>
  loading?: boolean
  color?: Nullish<'black' | 'white'>
  active?: boolean
}) {
  return (
    <span className="relative">
      <span
        className={cn('inline-flex h-10 max-w-48 animate-flash-outline items-center gap-1 rounded-full border border-neutral-200 px-1 outline outline-0 duration-150', {
          [blackClassName]: color === 'black',
          [whiteClassName]: color === 'white',
          'outline-2': active,
        })}
      >
        <span className="flex aspect-square w-8 flex-none items-center justify-center overflow-hidden rounded-full bg-neutral-200">
          {image && (
            <img alt="Avatar" className="size-full object-cover" src={image} />
          )}

          {emoji && (
            <span className="select-none text-2xl">{emoji}</span>
          )}
        </span>

        {loading
          ? <NameSkeleton />
          : (name && <Name>{name}</Name>)}
      </span>

      <span
        className={cn('absolute inset-0 -z-10 scale-90 animate-flash-bg rounded-full opacity-0 blur-md transition-opacity duration-700', { 'opacity-70': active })}
      />
    </span>

  )
}
