import { type ComponentProps } from 'react'

export function Input (props: ComponentProps<'input'>) {
  return (
    <div className="relative h-10 w-full min-w-0">
      <input
        className="peer size-full rounded-lg border border-neutral-200 bg-gradient-to-br from-[#fdfbfb] from-50% to-[#ebedee] px-2 text-lg outline outline-1 outline-transparent duration-150 focus:outline-[#fcb69f]"
        type="text"
        {...props}
      />
      <span
        className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-[#ffecd2] to-[#fcb69f] opacity-0 blur-lg transition-opacity duration-200 peer-focus:opacity-70"
      />
    </div>
  )
}
