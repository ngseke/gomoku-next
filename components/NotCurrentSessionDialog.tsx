import { type ComponentProps } from 'react'
import { Dialog } from './Dialog'
import { Button } from './Button'
import { useCreateOrJoinRoom } from '@/hooks/useCreateOrJoinRoom'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useTranslations } from 'next-intl'

export function NotCurrentSessionDialog (props: ComponentProps<typeof Dialog>) {
  const t = useTranslations()

  const { joinRoom, isCreatingOrJoiningRoom } = useCreateOrJoinRoom()

  const playerState = usePlayerStateStore()
  const roomId = playerState?.roomId

  async function handleClickResume () {
    if (!roomId) return
    await joinRoom(roomId)
  }

  return (
    <Dialog {...props}>
      <div className="flex flex-col gap-4">
        <p>
          {t('message.notCurrentSession')}
        </p>
        <Button
          loading={isCreatingOrJoiningRoom}
          onClick={handleClickResume}
        >
          {t('action.resume')}
        </Button>
      </div>
    </Dialog>
  )
}
