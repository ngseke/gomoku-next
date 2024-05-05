'use client'

import { useAuthStore } from '@/hooks/useAuthStore'
import { PlayerPillWithLabel } from './PlayerPillWithLabel'
import { type RoomPlayer } from '@/types/Room'
import { type Piece } from '@/types/Piece'
import { type BoardResult } from '@/types/BoardResult'
import { type Nullish } from '@/types/Nullish'
import { useTranslations } from 'next-intl'
import { type ComponentProps } from 'react'

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
  return (
    <Wrapper className="max-w-[50%] flex-none px-2">
      <PlayerPillWithLabel ghost />
    </Wrapper>
  )
}

export function GamePlayers ({ roomPlayers, nextAvailablePiece, result }: {
  roomPlayers?: Nullish<RoomPlayer[]>
  nextAvailablePiece?: Nullish<Piece>
  result?: Nullish<BoardResult>
}) {
  const t = useTranslations()
  const { player } = useAuthStore()

  const players = roomPlayers?.map((roomPlayer) => {
    const isActive = roomPlayer?.piece === nextAvailablePiece
    const isWinner = result?.type === 'win' && result.piece === roomPlayer.piece
    const label = roomPlayer.id === player?.id
      ? t('player.label.you')
      : t('player.label.opponent')

    return (
      <Wrapper key={roomPlayer.id} className="max-w-[50%] flex-none px-2">
        <PlayerPillWithLabel
          active={isActive}
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
      {!roomPlayers?.length
        ? Array.from({ length: 2 })
          .map((_, index) => (<Skeleton key={index} />))
        : <>
          {players}
          {roomPlayers.length < 2 && <Ghost />}
        </>}
    </div>
  )
}
