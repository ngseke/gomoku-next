import { type ComponentProps } from 'react'
import { BaseGradientButton } from './BaseGradientButton'

export function ProfileButton (
  props: ComponentProps<typeof BaseGradientButton>
) {
  return (
    <BaseGradientButton {...props}>
      <div className="flex flex-col items-center justify-center">
        <span className="text-xl font-bold">
          Profile
        </span>
      </div>
    </BaseGradientButton>
  )
}
