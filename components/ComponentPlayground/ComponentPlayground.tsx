'use client'

import { type ComponentProps, useState, useEffect, useMemo } from 'react'
import { NewRoomButton } from '../GradientButton/NewRoomButton'
import { JoinRoomButton } from '../GradientButton/JoinRoomButton'
import { LogoText } from '../LogoText'
import { ProfileButton } from '../GradientButton/ProfileButton'
import { useInterval } from 'usehooks-ts'
import { Button } from '../Button'
import { PlayerPill } from '../PlayerPill'
import { GomokuBoard } from '../GomokuBoard/GomokuBoard'
import { type BoardRecord } from '@/types/BoardRecord'
import { generateBoardGrid } from '@/modules/generateBoard'
import { formatPosition } from '@/modules/formatPosition'
import { faGear, faRightFromBracket, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Input } from '../Input'
import { ChatBox } from '../ChatBox'
import { type Chat } from '@/types/Chat'
import { mockChats } from './mockChats'
import { Checkbox } from '../Checkbox'
import { mockBoardRecords } from './mockBoardRecords'
import { type WinningLine } from '@/types/WinningLine'
import { produce } from 'immer'
import { getAvailablePositions, getNextAvailablePiece, judgeResult } from '@/modules/boardGrid'
import { type Position } from '@/types/Position'
import { ThemeToggle } from './ThemeToggle'
import { PlayerPillWithLabel } from '../PlayerPillWithLabel'
import { ResultOverlay } from '../ResultOverlay'
import { type BoardResult } from '@/types/BoardResult'
import { type Piece } from '@/types/Piece'

function Headline (props: ComponentProps<'h2'>) {
  return <h2 className="mt-5 text-3xl font-bold" {...props} />
}

function LogoSection () {
  return (<>
    <Headline>Logo</Headline>
    <LogoText />
  </>)
}

function GradientButtonSection () {
  return (<>
    <Headline>Gradient Button</Headline>
    <div className="grid gap-4 sm:grid-cols-3">
      <NewRoomButton />
      <JoinRoomButton />
      <ProfileButton />
    </div>
  </>)
}

function PlayerPillSection () {
  const [isActive, setIsActive] = useState(true)
  useInterval(() => { setIsActive(!isActive) }, 3000)

  return (<>
    <Headline>Player Pill</Headline>
    <div className="flex flex-wrap gap-2">
      <PlayerPill loading name="Sean Huang" />
      <PlayerPill emoji="🫥" />
      <PlayerPill name="John Smith" />
      <PlayerPill emoji="🍌️" name="Sean Huang" />
      <PlayerPill active emoji="🦒" name="Long Long Sean Huang" />
      <div className="w-full" />
      <PlayerPill color="black" emoji="🐻️" name="張三" />
      <PlayerPill color="white" emoji="🐻‍❄️" name="李四" />
      <PlayerPill active={isActive} color="black" emoji="🗿" name="楊淑芬" />
      <PlayerPill active={!isActive} color="white" emoji="🎃️" name="陳金發" />
    </div>

    <Headline>Player Pill With Label</Headline>
    <div className="flex flex-wrap gap-2">
      <div className="w-full" />
      <PlayerPillWithLabel color="black" emoji="🤨" isWinner={isActive} label="你" name="楊淑芬" />
      <PlayerPillWithLabel color="white" emoji="😈️" isWinner={!isActive} label="對手" name="陳金發" />
    </div>
  </>)
}

function ButtonSection () {
  return (<>
    <Headline>Button / Icon Button</Headline>
    <div className="flex flex-wrap gap-2">
      <Button>Exit Room</Button>
      <Button>min-w</Button>
      <Button icon={<FontAwesomeIcon icon={faGear} />} />
      <Button icon={<FontAwesomeIcon icon={faGoogle} />}>
        Google
      </Button>
      <Button disabled icon={<FontAwesomeIcon icon={faRightFromBracket} />} />
      <Button disabled icon={<FontAwesomeIcon icon={faUser} />}>
        Sign in as Guest
      </Button>
      <Button loading icon={<FontAwesomeIcon icon={faUser} />}>
        Loading
      </Button>
      <Button loading icon={<FontAwesomeIcon icon={faUser} />} />

      <Button block>Block</Button>
    </div>
  </>)
}

function InputSection () {
  const [text, setText] = useState('Gomoku Next')

  return (<>
    <Headline>Input</Headline>
    <div className="grid gap-2 sm:grid-cols-2">
      {([undefined, <FontAwesomeIcon key="icon" className="text-rose-500" icon={faTriangleExclamation} />] as const).map(rightSection => (
        (['md', 'sm'] as const).map(size => (
          [false, true].map(disabled => (
            <Input
              key={[disabled, size].join()}
              disabled={disabled}
              rightSection={rightSection}
              size={size}
              value={text}
              onChange={event => { setText(event.target.value) }}
            />
          ))
        ))
      ))}
    </div>
  </>)
}

function ChatBoxSection () {
  const defaultPlayerId = 'Sean Huang'
  const [message, setMessage] = useState('')
  const [chats, setChats] = useState<Record<string, Chat>>(mockChats)
  const [isDisabled, setIsDisabled] = useState(false)
  const [error, setError] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [playerId, setPlayerId] = useState(defaultPlayerId)

  function handleSubmit () {
    const createdAt = +new Date()

    setChats({
      ...chats,
      [createdAt]: {
        createdAt,
        message,
        playerName: playerId,
        createdBy: playerId,
        isAdmin,
      },
    })
    setMessage('')
  }

  return (<>
    <Headline>Chat Box</Headline>
    <div className="flex flex-wrap gap-4">
      <div className="size-96 max-w-full">
        <ChatBox
          chats={chats}
          disabled={isDisabled}
          error={error}
          message={message}
          playerId={playerId}
          setMessage={setMessage}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Checkbox
          checked={isDisabled}
          onChange={event => { setIsDisabled(event.target.checked) }}
        >
          isDisabled
        </Checkbox>

        <Checkbox
          checked={error}
          onChange={event => { setError(event.target.checked) }}
        >
          error
        </Checkbox>

        <hr />
        <Input
          label="My Player Id"
          value={playerId}
          onChange={event => { setPlayerId(event.target.value) }}
        />
        <Checkbox
          checked={isAdmin}
          size="sm"
          onChange={event => { setIsAdmin(event.target.checked) }}
        >isAdmin</Checkbox>
      </div>
    </div>
  </>)
}

function GomokuBoardSection () {
  const [boardRecords, setBoardRecords] = useState<BoardRecord[]>(mockBoardRecords)
  const [width, setWidth] = useState(500)
  const [highlight, setHighlight] = useState<{ x: number, y: number }>()
  const [isDisabled, setIsDisabled] = useState(false)
  const [isShowLabels, setIsShowLabel] = useState(true)
  const [hovered, setHovered] = useState<object>({})
  const [result, setResult] = useState<BoardResult | null>(null)

  const boardGrid = useMemo(() => generateBoardGrid(boardRecords), [boardRecords])

  useEffect(() => {
    const result = judgeResult(boardGrid)

    if (result?.type === 'draw') return
    setResult(result)
  }, [boardGrid, boardRecords])

  const nextAvailablePiece = getNextAvailablePiece(boardGrid)

  function handlePlace ({ x, y }: Position) {
    if (!nextAvailablePiece) return

    setBoardRecords([
      ...boardRecords,
      { piece: nextAvailablePiece, x, y },
    ])
    setHighlight({ x, y })
  }

  function placeRandomly () {
    const availablePositions = getAvailablePositions(boardGrid)
    const position = availablePositions[Math.floor(Math.random() * availablePositions.length)]
    if (!position) return
    handlePlace(position)
  }

  function clear () {
    setBoardRecords([])
    setHighlight(undefined)
  }

  return (<>
    <Headline>Gomoku Board</Headline>
    <div className="flex flex-wrap gap-6">
      <div className="relative" style={{ width: `${width}px` }}>
        <GomokuBoard
          boardGrid={generateBoardGrid(boardRecords)}
          disabled={isDisabled}
          highlight={highlight}
          showLabels={isShowLabels}
          winningLine={result?.type === 'win' ? result : null}
          onHover={(position) => { setHovered(formatPosition(position)) }}
          onPlace={handlePlace}
        />
        <ResultOverlay
          piece={nextAvailablePiece}
          result={result}
          onClickNewRound={clear}
        />
      </div>

      <div className="flex w-72 flex-1 flex-col gap-2">
        <div>
          Hovered:
          <code>{JSON.stringify(hovered)}</code>
        </div>
        <div>
          nextAvailablePiece
          <code>{JSON.stringify(nextAvailablePiece)}</code>
        </div>
        <Input
          label="Width"
          type="number"
          value={width}
          onChange={event => { setWidth(+event.target.value) }}
        />
        <Checkbox
          checked={isShowLabels}
          onChange={event => { setIsShowLabel(event.target.checked) }}
        >
          isShowLabels
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={event => { setIsDisabled(event.target.checked) }}
        >
          isDisabled
        </Checkbox>

        <Button onClick={placeRandomly}>Place Randomly</Button>

        <Button onClick={clear}>Clear</Button>

        <h3 className="text-xl font-bold">Result Overlay & Winning Line</h3>
        <label>
          Direction
          <select
            value={result?.type === 'win' ? result?.direction : ''}
            onChange={event => {
              const direction = event.target.value as WinningLine['direction']
              if (!direction) {
                setResult(null)
                return
              }

              setResult(produce(result, (result) => {
                result ??= {
                  type: 'win',
                  piece: 'black',
                  direction,
                  position: { x: 9, y: 7 },
                }
                if (result.type === 'win') {
                  result.direction = direction
                }
                return result
              }))
            }}
          >
            <option value="">-</option>
            {['vertical', 'horizontal', 'majorDiagonal', 'minorDiagonal']
              .map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
          </select>
        </label>
        <label>
          Result Piece
          <select
            value={result?.type === 'win' ? result?.piece : ''}
            onChange={event => {
              const piece = event.target.value as Piece
              if (!piece) return

              setResult(produce(result, (result) => {
                if (result?.type === 'win') {
                  result.piece = piece
                }
                return result
              }))
            }}
          >
            {['black', 'white'].map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
        {result?.type === 'win' && <div className="grid grid-cols-2 gap-4">
          <Input
            label="X"
            type="number"
            value={result?.position.x ?? 3}
            onChange={event => {
              if (!result) return
              const value = +event.target.value
              setResult(produce(result, (winningLine) => {
                winningLine.position.x = value
              }))
            }}
          />
          <Input
            label="Y"
            type="number"
            value={result?.position.y ?? 3}
            onChange={event => {
              if (!result) return
              const value = +event.target.value
              setResult(produce(result, (winningLine) => {
                winningLine.position.y = value
              }))
            }}
          />
        </div>}

      </div>
    </div>
  </>)
}

export function ComponentPlayground () {
  return (
    <div className="container flex max-w-[1000px] flex-col gap-6 px-2 py-4">
      <ThemeToggle />
      <LogoSection />
      <GradientButtonSection />
      <PlayerPillSection />
      <ButtonSection />
      <InputSection />
      <ChatBoxSection />
      <GomokuBoardSection />
    </div>
  )
}
