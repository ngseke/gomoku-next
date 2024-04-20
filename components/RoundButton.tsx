import { type ReactNode, type ComponentProps } from 'react'

export function RoundButton ({ icon, loading, children, ...restProps }: ComponentProps<'button'> & {
  icon?: ReactNode
  loading?: boolean
}) {
  return (
    <button
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-neutral-200 px-2 text-sm font-bold text-neutral-800 duration-200 hover:bg-neutral-200"
      type="button"
      {...restProps}
    >
      {icon && <span className="text-base">{icon}</span>}

      <span className="shrink-0">
        {children}
      </span>
    </button>
  )
}
