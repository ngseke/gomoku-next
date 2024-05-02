'use client'

import { Dialog } from './Dialog'
import { Input } from './Input'

export function PlayerProfileDialog ({ open, onClose }: {
  open: boolean
  onClose: () => void
}) {
  return (
    <Dialog
      open={open}
      size="xl"
      title="Profile"
      onClose={onClose}
    >
      <form
        className="flex gap-4 py-2 sm:flex-wrap"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <div className="w-full flex-none sm:w-44" />

        <div className="flex-1">
          <Input label="Name" />
        </div>
      </form>
    </Dialog>
  )
}
