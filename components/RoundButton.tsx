import { type ReactNode, type ComponentProps } from 'react'

export function RoundButton ({ icon, loading, children, ...restProps }: ComponentProps<'button'> & {
  icon?: ReactNode
  loading?: boolean
}) {
  return (
    <div className="relative h-10 min-w-20">
      <button
        className="peer inline-flex size-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 text-sm font-bold text-neutral-800 outline outline-1 outline-transparent duration-150 active:scale-[97%]"
        type="button"
        {...restProps}
      >
        {icon && <span className="text-base">{icon}</span>}

        <span className="shrink-0">
          {children}
        </span>
      </button>
      <span
        className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-300 opacity-0 blur-lg transition-opacity duration-200 peer-hover:opacity-70"
      />
    </div>

  )
}
