'use client'

import { useAuthStore } from '@/hooks/useAuthStore'
import { PlayerPillWithLabel } from './PlayerPillWithLabel'
import { type RoomPlayer } from '@/types/Room'
import { type Piece } from '@/types/Piece'
import { type BoardResult } from '@/types/BoardResult'
import { type Nullish } from '@/types/Nullish'
import { useTranslations } from 'next-intl'
import { type ComponentProps } from 'react'
import { type Chat } from '@/types/Chat'

function Wrapper (props: ComponentProps<'div'>) {
  return (
    <div className="max-w-[50%] flex-none px-2" {...props} />
  )
}

function Skeleton () {
  return (
    <Wrapper className="max-w-[50%] flex-none px-2">
      <PlayerPillWithLabel loading />
    </Wrapper>
  )
}

function Ghost () {
  const invisibleLabel = <span className="invisible">_</span>

  return (
    <Wrapper className="max-w-[50%] flex-none px-2">
      <PlayerPillWithLabel ghost label={invisibleLabel} />
    </Wrapper>
  )
}

const pieces: Piece[] = ['black', 'white']

export function GamePlayers ({ roomPlayers, nextAvailablePiece, result, chat }: {
  roomPlayers?: Nullish<RoomPlayer[]>
  nextAvailablePiece?: Nullish<Piece>
  result?: Nullish<BoardResult>
  chat?: Nullish<Chat>
}) {
  const t = useTranslations()
  const { player } = useAuthStore()

  const elements = pieces?.map((piece, index) => {
    const roomPlayer = roomPlayers
      ?.find(roomPlayer => roomPlayer.piece === piece)
    if (!roomPlayer) return <Ghost key={`ghost_${index}`} />

    const isActive = roomPlayer?.piece === nextAvailablePiece
    const isWinner = result?.type === 'win' && result.piece === roomPlayer.piece
    const label = roomPlayer.id === player?.id
      ? t('player.label.you')
      : t('player.label.opponent')

    return (
      <Wrapper key={roomPlayer.id} className="max-w-[50%] flex-none px-2">
        <PlayerPillWithLabel
          active={isActive}
          chat={roomPlayer.id === chat?.createdBy ? chat : null}
          color={roomPlayer.piece}
          emoji={roomPlayer?.emoji}
          isWinner={isWinner}
          label={label}
          name={roomPlayer?.name}
        />
      </Wrapper>
    )
  })

  return (
    <div className="-mx-2 flex">
      {!roomPlayers
        ? Array.from({ length: 2 })
          .map((_, index) => (<Skeleton key={index} />))
        : elements}
    </div>
  )
}
