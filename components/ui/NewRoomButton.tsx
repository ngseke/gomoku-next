import { type ComponentProps } from 'react'
import { type BaseGradientButton } from './BaseGradientButton'
import { GradientButton } from './GradientButton'

export function NewRoomButton (
  props: ComponentProps<typeof BaseGradientButton>
) {
  return (
    <GradientButton
      colors={['#00f2fe', '#4facfe']}
      text="New"
      {...props}
    />
  )
}
