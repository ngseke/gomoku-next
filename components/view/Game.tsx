'use client'

import { GomokuBoard } from '../GomokuBoard/GomokuBoard'
import { ConnectedChatBox } from '../ConnectedChatBox'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useRoomStore } from '@/hooks/useRoomStore'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useRoomPlayers } from '@/hooks/useRoomPlayers'
import { PlayerPillWithLabel } from '../PlayerPillWithLabel'
import { useBoard } from '@/hooks/useBoard'
import { useIsCurrentSession } from '@/hooks/useIsCurrentSession'
import { RoomIdHashtag } from '../RoomIdHashtag'
import { useRoomActions } from '@/hooks/useRoomActions'
import { useToggle } from 'usehooks-ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faComment } from '@fortawesome/free-solid-svg-icons'
import { ResultOverlay } from '../ResultOverlay'
import { type Position } from '@/types/Position'
import { NotCurrentSessionDialog } from '../NotCurrentSessionDialog'
import { useMemo, useState } from 'react'
import { Tabs } from '../Tabs'
import { TextWithIndicator } from '../TextWithIndicator'
import { useHasUnreadChat } from '@/hooks/useHasUnreadChat'
import { BoardRecordBox } from '../BoardRecordBox'
import { GameNavbar } from '../GameNavbar'
import { type BoardRecord } from '@/types/BoardRecord'

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
    records,
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

  const [emphasis, setEmphasis] = useState<BoardRecord | null>(null)
  const dimmedPositions = useMemo(() => {
    if (!emphasis) return null
    const index = records?.findIndex(
      record => record.x === emphasis.x && record.y === emphasis.y
    )
    if (index == null) return null

    return records?.slice(index + 1)
  }, [emphasis, records])

  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const { hasUnreadChat, setHasUnreadChat } = useHasUnreadChat({
    active: selectedTabIndex !== 0,
  })

  function handleChangeTab (index: number) {
    if (index === 0) setHasUnreadChat(false)
    setSelectedTabIndex(index)
  }
  const tabs = [
    {
      name: (
        <TextWithIndicator active={hasUnreadChat}>
          Chat
        </TextWithIndicator>
      ),
      icon: <FontAwesomeIcon icon={faComment} />,
      panel: (
        <div className="h-[350px] w-full max-w-full flex-none">
          <ConnectedChatBox
            disabled={!isCurrentSession}
            roomId={playerState?.roomId}
          />
        </div>
      ),
    },
    {
      name: 'History',
      icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
      panel: (
        <div className="h-[350px] w-full max-w-full flex-none">
          <BoardRecordBox
            records={records}
            onHover={(record) => {
              setEmphasis(record)
            }}
          />
        </div>
      ),
    },
  ]

  return (<>
    <GameNavbar
      isBackIconButtonLoading={isExitingRoom}
      isShowLabels={isShowLabels}
      onClickBackIconButton={handleClickExitRoom}
      onClickToggleIsShowLabels={toggleIsShowLabels}
    />

    <div className="container flex min-h-screen max-w-[1000px] items-center px-4 py-8 pt-20">
      <NotCurrentSessionDialog open={!isCurrentSession} />

      <div className="flex size-full flex-col gap-8">
        <main className="-mx-4 flex h-full flex-1 flex-wrap gap-y-8 sm:flex-nowrap">
          <div className="flex w-full flex-col gap-2 px-4 sm:w-[55%]">
            <div className="flex gap-2">
              <RoomIdHashtag>{room?.id}</RoomIdHashtag>
            </div>

            <div className="relative aspect-square">
              <GomokuBoard
                boardGrid={optimisticBoardGrid}
                dimmedPositions={dimmedPositions}
                disabled={!isMyTurn || !isCurrentSession}
                emphasis={emphasis}
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

          <div className="flex w-full flex-col gap-3 px-4 pt-4 sm:w-[45%]">
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

            <Tabs
              selectedIndex={selectedTabIndex}
              tabs={tabs}
              onChange={handleChangeTab}
            />
          </div>
        </main>
      </div>
    </div>
  </>)
}
