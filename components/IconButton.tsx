import { type ComponentProps } from 'react'

export function IconButton ({ loading, children, ...restProps }: ComponentProps<'button'> & {
  loading?: boolean
}) {
  return (
    <button
      className="inline-flex size-10 min-w-10 items-center justify-center rounded-full border border-neutral-200 px-1 text-neutral-800 duration-200 hover:bg-neutral-200"
      type="button"
      {...restProps}
    >
      {children}
    </button>
  )
}
