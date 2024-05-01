'use client'

import { LogoText } from '../LogoText'
import { GomokuBoard } from '../GomokuBoard/GomokuBoard'
import { ConnectedChatBox } from '../ConnectedChatBox'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useRoomStore } from '@/hooks/useRoomStore'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useRoomPlayers } from '@/hooks/useRoomPlayers'
import { PlayerPillWithLabel } from '../PlayerPillWithLabel'
import { useBoard } from '@/hooks/useBoard'
import { useIsCurrentSession } from '@/hooks/useIsCurrentSession'
import { ThemeButton } from '../ThemeButton'
import { RoomIdHashtag } from '../RoomIdHashtag'
import { BackIconButton } from '../BackIconButton'
import { useRoomActions } from '@/hooks/useRoom'
import { Button } from '../Button'
import { useToggle } from 'usehooks-ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl, faShare } from '@fortawesome/free-solid-svg-icons'
import { ResultOverlay } from '../ResultOverlay'
import { type Position } from '@/types/Position'
import { NotCurrentSessionDialog } from '../NotCurrentSessionDialog'
import { useState } from 'react'

export function Game () {
  const { player } = useAuthStore()
  const playerState = usePlayerStateStore()
  const { isCurrentSession } = useIsCurrentSession()

  const room = useRoomStore()

  const [isExitingRoom, setIsExitingRoom] = useState(false)
  const { exitRoom, createNewBoard } = useRoomActions()

  async function handleClickExitRoom () {
    setIsExitingRoom(true)
    try {
      await exitRoom()
    } finally {
      setIsExitingRoom(false)
    }
  }

  const { roomPlayers, rawRoomPlayers } = useRoomPlayers()

  const boardId = room?.boardId
  const {
    result,
    winningLine,
    highlight,
    place,
    optimisticBoardGrid,
    nextAvailablePiece,
  } = useBoard(boardId)

  const myRoomPlayer = player?.id ? rawRoomPlayers?.[player?.id] : null
  const myPiece = myRoomPlayer?.piece
  const isMyTurn = myPiece === nextAvailablePiece && isCurrentSession

  const [isShowLabels, toggleIsShowLabels] = useToggle(true)

  async function handlePlace (position: Position) {
    await place(position, myPiece)
  }

  return (
    <div className="container flex min-h-screen max-w-[1000px] items-center px-4 py-8">
      <NotCurrentSessionDialog open={!isCurrentSession} />

      <div className="flex size-full flex-col gap-8">
        <header className="flex flex-none justify-between gap-3">
          <div className="flex flex-none items-center gap-3">
            <BackIconButton
              loading={isExitingRoom}
              onClick={handleClickExitRoom}
            />
            <LogoText />
            <RoomIdHashtag>{room?.id}</RoomIdHashtag>
          </div>

          <nav className="flex gap-2">
            <Button
              icon={isShowLabels
                ? <FontAwesomeIcon icon={faListOl} />
                : <FontAwesomeIcon icon={faListOl} />}
              onClick={toggleIsShowLabels}
            >{isShowLabels ? 'Hide' : 'Show'} Labels</Button>
            <Button icon={<FontAwesomeIcon icon={faShare} />} />
            <ThemeButton />
          </nav>
        </header>

        <main className="-mx-4 flex h-full flex-1 flex-wrap items-center sm:flex-nowrap">
          <div className="flex w-full flex-col gap-2 px-4 sm:w-[55%]">
            <div>
              Board
            </div>

            <div className="relative aspect-square">
              <GomokuBoard
                boardGrid={optimisticBoardGrid}
                disabled={!isMyTurn || !isCurrentSession}
                highlight={highlight}
                showLabels={isShowLabels}
                winningLine={winningLine}
                onPlace={handlePlace}
              />

              <ResultOverlay
                piece={myPiece}
                result={result}
                onClickNewRound={createNewBoard}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 px-4 sm:w-[45%]">
            <div className="-mx-2 flex">
              {roomPlayers?.map((roomPlayer) => {
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

            <div className="h-[350px] w-full max-w-full flex-none">
              <ConnectedChatBox
                disabled={!isCurrentSession}
                roomId={playerState?.roomId}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
