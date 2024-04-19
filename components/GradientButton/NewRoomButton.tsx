import { type ComponentProps } from 'react'
import { type BaseGradientButton } from './BaseGradientButton'
import { GradientButton } from './GradientButton'

export function NewRoomButton (
  props: ComponentProps<typeof BaseGradientButton>
) {
  return (
    <GradientButton
      colors={['#ffecd2', '#fcb69f']}
      text="New"
      {...props}
    />
  )
}
