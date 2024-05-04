import { type ComponentProps } from 'react'
import { type BaseGradientButton } from './BaseGradientButton'
import { GradientButton } from './GradientButton'
import { useTranslations } from 'next-intl'

export function NewRoomButton (
  props: ComponentProps<typeof BaseGradientButton>
) {
  const t = useTranslations()

  return (
    <GradientButton
      colors={['#ffecd2', '#fcb69f']}
      colorsDark={['#ffd8a3', '#fb9877']}
      text={t('action.createRoom')}
      {...props}
    />
  )
}
