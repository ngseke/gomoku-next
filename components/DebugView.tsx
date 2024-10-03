'use client'

import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useRoomStore } from '@/hooks/useRoomStore'
import { useAppSelector } from '@/lib/hooks'
import { type ComponentProps } from 'react'

function Title (props: ComponentProps<'h2'>) {
  return <h2 className="text-xs font-bold" {...props} />
}

export function DebugView () {
  const auth = useAppSelector((state) => state.auth)
  const playerState = usePlayerStateStore()
  const room = useRoomStore()

  return (
    <div className="fixed bottom-0 left-0 z-50 bg-black/10 p-4 backdrop-blur-sm">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <Title>playerState</Title>
          <pre>{JSON.stringify(playerState, null, 2)}</pre>
        </div>

        <div>
          <Title>room</Title>
          <pre>{JSON.stringify(room, null, 2)}</pre>
        </div>

        <div>
          <Title>auth</Title>
          <pre>{JSON.stringify(auth, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
