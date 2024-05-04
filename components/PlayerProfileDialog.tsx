'use client'

import { useTranslations } from 'next-intl'
import { Dialog } from './Dialog'
import { PlayerProfileForm } from './PlayerProfileForm'

export function PlayerProfileDialog ({ open, onClose }: {
  open: boolean
  onClose: () => void
}) {
  const t = useTranslations()

  return (
    <Dialog
      open={open}
      size="xl"
      title={t('profile.editDialog.title')}
      onClose={onClose}
    >
      <PlayerProfileForm onFinish={onClose} />
    </Dialog>
  )
}
