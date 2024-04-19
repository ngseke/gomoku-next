import { type ComponentProps } from 'react'
import { type BaseGradientButton } from './BaseGradientButton'
import { GradientButton } from './GradientButton'

export function JoinRoomButton (
  props: ComponentProps<typeof BaseGradientButton>
) {
  return (
    <GradientButton
      colors={['#00f2fe', '#4facfe']}
      text="Join"
      {...props}
    />
  )
}
