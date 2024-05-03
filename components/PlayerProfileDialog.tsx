'use client'

import { Dialog } from './Dialog'
import { PlayerProfileForm } from './PlayerProfileForm'

export function PlayerProfileDialog ({ open, onClose }: {
  open: boolean
  onClose: () => void
}) {
  return (
    <Dialog
      open={open}
      size="lg"
      title="Profile"
      onClose={onClose}
    >
      <PlayerProfileForm onFinish={onClose} />
    </Dialog>
  )
}
