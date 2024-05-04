'use client'

import { useAuthStore } from '@/hooks/useAuthStore'
import { PlayerPillWithLabel } from './PlayerPillWithLabel'
import { type RoomPlayer } from '@/types/Room'
import { type Piece } from '@/types/Piece'
import { type BoardResult } from '@/types/BoardResult'
import { type Nullish } from '@/types/Nullish'

function Skeleton () {
  return (
    <div className="max-w-[50%] flex-none px-2">
      <PlayerPillWithLabel loading />
    </div>
  )
}

export function GamePlayers ({ roomPlayers, nextAvailablePiece, result }: {
  roomPlayers?: Nullish<RoomPlayer[]>
  nextAvailablePiece?: Nullish<Piece>
  result?: Nullish<BoardResult>
}) {
  const { player } = useAuthStore()

  return (
    <div className="-mx-2 flex">
      {!roomPlayers?.length
        ? Array.from({ length: 2 })
          .map((_, index) => (<Skeleton key={index} />))
        : roomPlayers?.map((roomPlayer) => {
          const isActive = roomPlayer?.piece === nextAvailablePiece
          const isWinner =
            result?.type === 'win' &&
            result.piece === roomPlayer.piece

          return (
            <div key={roomPlayer.id} className="max-w-[50%] flex-none px-2">
              <PlayerPillWithLabel
                active={isActive}
                color={roomPlayer.piece}
                emoji={roomPlayer?.emoji}
                isWinner={isWinner}
                label={roomPlayer.id === player?.id ? 'You' : 'Opponent'}
                name={roomPlayer?.name}
              />
            </div>
          )
        })}
    </div>
  )
}
