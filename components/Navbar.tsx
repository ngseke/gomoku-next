import { type PropsWithChildren } from 'react'

export function Navbar ({ children }: PropsWithChildren) {
  return (
    <nav className="fixed left-0 top-0 z-20 h-16 w-full justify-between border-b border-neutral-200 bg-[#fdfbfb] px-2 duration-300 dark:border-neutral-800 dark:bg-[#020404] sm:h-20">
      <div className="container flex h-full items-center gap-4">
        {children}
      </div>
    </nav>
  )
}
