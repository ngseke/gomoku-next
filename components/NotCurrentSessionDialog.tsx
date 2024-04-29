import { type ComponentProps } from 'react'
import { Dialog } from './Dialog'
import { Button } from './Button'
import { useCreateOrJoinRoom } from '@/hooks/useCreateOrJoinRoom'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'

export function NotCurrentSessionDialog (props: ComponentProps<typeof Dialog>) {
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
          You have another session open elsewhere. Click the button to resume the session here.
        </p>
        <Button
          loading={isCreatingOrJoiningRoom}
          onClick={handleClickResume}
        >Resume</Button>
      </div>
    </Dialog>
  )
}
