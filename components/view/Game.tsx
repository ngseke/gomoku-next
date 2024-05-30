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
import { faCircle, faClockRotateLeft, faComment, faCrown, faStopwatch, faUserClock } from '@fortawesome/free-solid-svg-icons'
import { ResultOverlay } from '../ResultOverlay'
import { type Position } from '@/types/Position'
import { NotCurrentSessionDialog } from '../NotCurrentSessionDialog'
import { useEffect, useMemo, useState } from 'react'
import { Tabs } from '../Tabs'
import { TextWithIndicator } from '../TextWithIndicator'
import { BoardRecordBox } from '../BoardRecordBox'
import { GameNavbar } from '../GameNavbar/GameNavbar'
import { type BoardRecord } from '@/types/BoardRecord'
import { useShareUrl } from '@/hooks/useShareUrl'
import { useChats } from '@/hooks/useChats'
import { useChatWatcher } from '@/hooks/useChatWatcher'
import { GamePlayers } from '../GamePlayers'
import { useTranslations } from 'next-intl'
import { Tag } from '../Tag'
import { IncrementalDots } from '../IncrementalDots'
import { useSetPlayerMousePosition } from '@/hooks/useSetPlayerMousePosition'
import { usePlayerMousePosition } from '@/hooks/usePlayerMousePosition'
import { FirstPieceTag } from '../FirstPieceTag'
import { useHighlightedChat } from '@/hooks/useHighlightedChat'
import useSound from 'use-sound'
import { type Piece } from '@/types/Piece'

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

  const { roomPlayers, rawRoomPlayers, isAwaitingPlayer, opponent } = useRoomPlayers()
  const emojiMap = (() => {
    function findPiece (piece: Piece) {
      return roomPlayers.find(player => player.piece === piece)?.emoji
    }

    return {
      black: findPiece('black'),
      white: findPiece('white'),
    }
  })()

  const {
    records,
    optimisticRecords,
    result,
    winningLine,
    highlight,
    place,
    optimisticBoardGrid,
    nextAvailablePiece,
    isPlacing,
    firstPiece,
  } = useBoard({
    boardId: room?.boardId,
    roomId: room?.id,
  })

  const myRoomPlayer = player?.id ? rawRoomPlayers?.[player?.id] : null
  const myPiece = myRoomPlayer?.piece
  const isMyTurn = myPiece === nextAvailablePiece && isCurrentSession

  const [play] = useSound('/sounds/click.wav')
  const lastRecord = optimisticRecords?.at(-1)
  useEffect(() => {
    if (lastRecord?.piece === myPiece) return
    play()
  }, [lastRecord?.piece, isPlacing, play, myPiece])

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

  const { unreadChatCount, chats } = useChats()
  const { highlightedChat } = useHighlightedChat(chats)

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
        <TextWithIndicator active={Boolean(unreadChatCount)}>
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
    if (isAwaitingPlayer) {
      return {
        icon: faUserClock,
        text: t('game.status.awaitingPlayer'),
      }
    }
    if (isMyTurn) {
      return { icon: faCircle, text: t('game.status.myTurn'), active: true }
    }

    return {
      icon: faStopwatch,
      text: t('game.status.opponentTurn'),
      rightSection: <IncrementalDots className="w-6" />,
    }
  })()

  const isBoardDisabled = !isMyTurn || !isCurrentSession || isPlacing || isAwaitingPlayer

  const { setPlayerMousePosition } = useSetPlayerMousePosition()
  const { playerMousePosition } = usePlayerMousePosition(opponent?.id)

  return (<>
    <GameNavbar
      isBackIconButtonLoading={isSubmittingRoomAction}
      isShowLabels={isShowLabels}
      shareUrl={shareUrl}
      onClickBackIconButton={handleClickExitRoom}
      onClickToggleIsShowLabels={toggleIsShowLabels}
    />

    <div className="container flex min-h-screen max-w-[980px] items-center px-4 py-8 pt-20 sm:pt-24">
      <NotCurrentSessionDialog open={!isCurrentSession} />

      <div className="flex size-full flex-col gap-8">
        <main className="-mx-4 flex h-full flex-1 flex-wrap gap-y-8 sm:flex-nowrap">
          <div className="flex w-full flex-col gap-2 px-4 sm:w-[55%]">
            <div className="flex gap-1.5">
              <RoomIdHashtag roomId={room?.id} />
              <FirstPieceTag piece={firstPiece} />
              <Tag {...statusTagProps} />
            </div>

            <div className="relative aspect-square">
              <GomokuBoard
                boardGrid={optimisticBoardGrid}
                dimmedPositions={dimmedPositions}
                disabled={isBoardDisabled}
                emojiMap={emojiMap}
                emphasis={emphasis}
                highlight={highlight}
                playerMousePosition={playerMousePosition}
                showLabels={isShowLabels}
                winningLine={winningLine}
                onMouseMove={setPlayerMousePosition}
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
              chat={highlightedChat}
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
