'use client'

import { Logo } from '../LogoText'
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

export function Game () {
  const { player } = useAuthStore()
  const playerState = usePlayerStateStore()
  const { isCurrentSession } = useIsCurrentSession()

  const room = useRoomStore()

  const { exitRoom, createNewBoard } = useRoomActions()

  async function handleClickExitRoom () {
    await exitRoom()
  }

  const { roomPlayers, rawRoomPlayers } = useRoomPlayers()

  const boardId = room?.boardId
  const {
    winningLine,
    place,
    boardGrid,
    nextAvailablePiece,
  } = useBoard(boardId)

  const myRoomPlayer = player?.id ? rawRoomPlayers?.[player?.id] : null
  const isMyTurn = myRoomPlayer?.piece === nextAvailablePiece && isCurrentSession

  const [isShowLabels, toggleIsShowLabels] = useToggle()

  return (
    <div className="container flex min-h-screen max-w-[1000px] items-center px-4 py-8">
      {
        !isCurrentSession &&
          <div className=" fixed left-4 top-4 bg-red-500">
            Warning: Not current session!
          </div>
      }

      <div className="flex size-full flex-col gap-8">
        <div className="flex flex-none justify-between gap-3">
          <div className="flex flex-none items-center gap-3">
            <BackIconButton onClick={handleClickExitRoom} />
            <Logo />
            <RoomIdHashtag>{room?.id}</RoomIdHashtag>
          </div>

          <div className="flex gap-2">
            <Button
              icon={isShowLabels
                ? <FontAwesomeIcon icon={faListOl} />
                : <FontAwesomeIcon icon={faListOl} />}
              onClick={toggleIsShowLabels}
            >{isShowLabels ? 'Hide' : 'Show'} Labels</Button>
            <Button icon={<FontAwesomeIcon icon={faShare} />} />
            <ThemeButton />
          </div>

        </div>

        <div className="-mx-4 flex h-full flex-1 flex-wrap items-center sm:flex-nowrap">
          <div className="w-full px-4 md:w-[55%]">
            <GomokuBoard
              boardGrid={boardGrid}
              disabled={!isMyTurn || !isCurrentSession}
              showLabels={isShowLabels}
              winningLine={winningLine}
              onPlace={place}
            />
          </div>

          <div className="flex w-full flex-col gap-3 px-4 md:w-[45%]">
            <div className="-mx-2 flex">
              {roomPlayers?.map((roomPlayer) => {
                const isActive = roomPlayer?.piece === nextAvailablePiece

                return (
                  <div key={roomPlayer.id} className="max-w-[50%] flex-none px-2">
                    <PlayerPillWithLabel
                      active={isActive}
                      color={roomPlayer.piece}
                      emoji={roomPlayer?.emoji}
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

            <Button onClick={createNewBoard}>
              Play Another Round
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
