import { type ComponentProps } from 'react'

export function Headline (props: ComponentProps<'h2'>) {
  return <h2 className="mt-5 text-3xl font-bold" {...props} />
}
