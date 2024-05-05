'use client'

import { GomokuBoard } from '../GomokuBoard/GomokuBoard'
import { ConnectedChatBox } from '../ConnectedChatBox'
import { usePlayerStateStore } from '@/hooks/usePlayerStateStore'
import { useRoomStore } from '@/hooks/useRoomStore'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useRoomPlayers } from '@/hooks/useRoomPlayers'
import { useBoard } from '@/hooks/useBoard'
import { useIsCurrentSession } from '@/hooks/useIsCurrentSession'
import { RoomIdHashtag } from '../RoomIdHashtag'
import { useRoomActions } from '@/hooks/useRoomActions'
import { useToggle } from 'usehooks-ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faClock, faClockRotateLeft, faComment, faCrown } from '@fortawesome/free-solid-svg-icons'
import { ResultOverlay } from '../ResultOverlay'
import { type Position } from '@/types/Position'
import { NotCurrentSessionDialog } from '../NotCurrentSessionDialog'
import { useEffect, useMemo, useState } from 'react'
import { Tabs } from '../Tabs'
import { TextWithIndicator } from '../TextWithIndicator'
import { BoardRecordBox } from '../BoardRecordBox'
import { GameNavbar } from '../GameNavbar'
import { type BoardRecord } from '@/types/BoardRecord'
import { useShareUrl } from '@/hooks/useShareUrl'
import { useChats } from '@/hooks/useChats'
import { useChatWatcher } from '@/hooks/useChatWatcher'
import { GamePlayers } from '../GamePlayers'
import { useTranslations } from 'next-intl'
import { Tag } from '../Tag'
import { IncrementalDots } from '../IncrementalDots'

export function Game () {
  const t = useTranslations()

  const { player } = useAuthStore()
  const playerState = usePlayerStateStore()
  const { isCurrentSession } = useIsCurrentSession()

  const room = useRoomStore()

  const { exitRoom, createNewBoard, isSubmittingRoomAction } = useRoomActions()

  async function handleClickExitRoom () {
    await exitRoom()
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
    isPlacing,
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

  const { hasUnreadChats } = useChats()

  const { watch, unwatch } = useChatWatcher()
  useEffect(() => {
    if (selectedTabIndex === 0) {
      watch()
    } else {
      unwatch()
    }
  }, [selectedTabIndex, unwatch, watch])

  function handleChangeTab (index: number) {
    setSelectedTabIndex(index)
  }

  const tabs = [
    {
      name: (
        <TextWithIndicator active={hasUnreadChats}>
          {t('game.tab.chat')}
        </TextWithIndicator>
      ),
      icon: <FontAwesomeIcon icon={faComment} />,
      panel: (
        <div className="h-[350px] w-full max-w-full flex-none">
          <ConnectedChatBox
            disabled={!isCurrentSession}
            roomId={playerState?.roomId}
            visible={selectedTabIndex === 0}
          />
        </div>
      ),
    },
    {
      name: t('game.tab.record'),
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

  const { shareUrl } = useShareUrl()

  const statusTagProps = (() => {
    if (result) {
      return { icon: faCrown, text: t('game.status.gameOver') }
    }
    if (isMyTurn) {
      return { icon: faCircle, text: t('game.status.myTurn'), active: true }
    }

    return {
      icon: faClock,
      text: t('game.status.opponentTurn'),
      rightSection: <IncrementalDots className="w-6" />,
    }
  })()

  return (<>
    <GameNavbar
      isBackIconButtonLoading={isSubmittingRoomAction}
      isShowLabels={isShowLabels}
      shareUrl={shareUrl}
      onClickBackIconButton={handleClickExitRoom}
      onClickToggleIsShowLabels={toggleIsShowLabels}
    />

    <div className="container flex min-h-screen max-w-[980px] items-center px-4 py-8 pt-20">
      <NotCurrentSessionDialog open={!isCurrentSession} />

      <div className="flex size-full flex-col gap-8">
        <main className="-mx-4 flex h-full flex-1 flex-wrap gap-y-8 sm:flex-nowrap">
          <div className="flex w-full flex-col gap-2 px-4 sm:w-[55%]">
            <div className="flex gap-1.5">
              <RoomIdHashtag roomId={room?.id} />
              <Tag {...statusTagProps} />
            </div>

            <div className="relative aspect-square">
              <GomokuBoard
                boardGrid={optimisticBoardGrid}
                dimmedPositions={dimmedPositions}
                disabled={!isMyTurn || !isCurrentSession || isPlacing}
                emphasis={emphasis}
                highlight={highlight}
                showLabels={isShowLabels}
                winningLine={winningLine}
                onPlace={handlePlace}
              />

              <ResultOverlay
                disabled={isSubmittingRoomAction}
                piece={myPiece}
                result={result}
                onClickNewRound={createNewBoard}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 px-4 pt-4 sm:w-[45%]">
            <GamePlayers
              nextAvailablePiece={nextAvailablePiece}
              result={result}
              roomPlayers={roomPlayers}
            />
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
