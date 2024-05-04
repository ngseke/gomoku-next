import { type ComponentProps } from 'react'
import { type BaseGradientButton } from './BaseGradientButton'
import { GradientButton } from './GradientButton'
import { useTranslations } from 'next-intl'

export function JoinRoomButton (
  props: ComponentProps<typeof BaseGradientButton>
) {
  const t = useTranslations()

  return (
    <GradientButton
      colors={['#00f2fe', '#4facfe']}
      colorsDark={['#00dae5', '#2e9cfe']}
      text={t('action.joinRoom')}
      {...props}
    />
  )
}
