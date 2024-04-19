import { type Nullish } from '@/types/Nullish'
import { type ComponentProps } from 'react'

function NameSkeleton () {
  return (
    <span className="mr-3 inline-block h-4 w-14 rounded-md bg-neutral-200" />
  )
}

function Name (props: ComponentProps<'span'>) {
  return (
    <span className="mr-3 truncate text-sm font-medium" {...props} />
  )
}

export function UserBadge ({ name, image, emoji, loading }: {
  name?: Nullish<string>
  image?: Nullish<string>
  emoji?: Nullish<string>
  loading?: boolean
}) {
  return (
    <span className="inline-flex max-w-48 items-center gap-1 rounded-full border border-neutral-200">
      <span className="m-1 flex aspect-square w-8 flex-none items-center justify-center overflow-hidden rounded-full bg-neutral-200">
        {image && (
          <img alt="Avatar" className="size-full object-cover" src={image} />
        )}

        {emoji && (
          <span className="select-none text-lg">{emoji}</span>
        )}
      </span>

      {loading
        ? <NameSkeleton />
        : (name && <Name>{name}</Name>)
      }
    </span>
  )
}
