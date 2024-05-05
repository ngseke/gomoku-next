import { type PropsWithChildren } from 'react'

export function Stat ({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium leading-none text-neutral-600 dark:text-neutral-400">
        {label}
      </span>
      <span className="text-2xl font-bold">
        {children}
      </span>
    </div>
  )
}
