import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useRoomStore } from '@/hooks/useRoomStore'
import { type ComponentProps } from 'react'

function Title (props: ComponentProps<'h2'>) {
  return <h2 className="text-lg font-bold" {...props} />
}

export function DebugView () {
  const playerState = usePlayerStateStore()
  const room = useRoomStore()

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <Title>playerState</Title>
        <pre>{JSON.stringify(playerState, null, 2)}</pre>
      </div>

      <div>
        <Title>room</Title>
        <pre>{JSON.stringify(room, null, 2)}</pre>
      </div>
    </div>
  )
}
