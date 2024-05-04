'use client'

import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { Game } from './Game'
import { Lobby } from './Lobby'
import { useAutoJoinRoom } from '@/hooks/useAutoJoinRoom'
import { useInitializeStore } from '@/hooks/useInitializeStore'
import { LoadingDialog } from '../LoadingDialog'
import { useTranslations } from 'next-intl'

export function View () {
  const t = useTranslations()

  useInitializeStore()

  const playerState = usePlayerStateStore()

  const isInGame = playerState?.type === 'game'

  const { isAutoJoiningRoom } = useAutoJoinRoom()

  return (<>
    {isInGame ? <Game /> : <Lobby />}

    <LoadingDialog open={isAutoJoiningRoom} title={t('room.joiningRoomDialog.title')} />
  </>)
}
