'use client'

import { type ComponentProps, useState } from 'react'
import { NewRoomButton } from '../GradientButton/NewRoomButton'
import { JoinRoomButton } from '../GradientButton/JoinRoomButton'
import { Logo } from '../LogoText'
import { ProfileButton } from '../GradientButton/ProfileButton'
import { useInterval } from 'usehooks-ts'
import { Button } from '../Button'
import { PlayerPill } from '../PlayerPill'
import { GomokuBoard } from '../GomokuBoard/GomokuBoard'
import { type BoardRecord } from '@/types/BoardRecord'
import { generateBoard } from '@/modules/generateBoard'
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

function Headline (props: ComponentProps<'h2'>) {
  return <h2 className="mt-5 text-3xl font-bold" {...props} />
}

function LogoSection () {
  return (<>
    <Headline>Logo</Headline>
    <Logo />
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
  useInterval(() => { setIsActive(!isActive) }, 1500)

  return (<>
    <Headline>Player Pill</Headline>
    <div className="flex flex-wrap gap-2">
      <PlayerPill loading name="Sean Huang" />
      <PlayerPill emoji="🫥" />
      <PlayerPill name="John Smith" />
      <PlayerPill emoji="🍌️" name="Sean Huang" />
      <PlayerPill active emoji="🦒" name="Long Long Sean Huang" />
      <div className="w-full" />
      <PlayerPill color="black" emoji="🐨" name="張三" />
      <PlayerPill color="white" emoji="🐻‍❄️" name="李四" />
      <PlayerPill active={isActive} color="black" emoji="🗿" name="楊淑芬" />
      <PlayerPill active={!isActive} color="white" emoji="🈲" name="陳金發" />
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
      <div className="size-96">
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
        <label>
          My playerId
          <Input
            value={playerId}
            onChange={event => { setPlayerId(event.target.value) }}
          />
        </label>
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
  const [isBlack, setIsBlack] = useState(true)
  const [isShowLabels, setIsShowLabel] = useState(true)
  const [hovered, setHovered] = useState<object>({})

  return (<>
    <Headline>Gomoku Board</Headline>
    <div className="flex flex-wrap gap-6">
      <div style={{ width: `${width}px` }}>
        <GomokuBoard
          board={generateBoard(boardRecords)}
          highlight={highlight}
          showLabels={isShowLabels}
          onHover={(position) => { setHovered(formatPosition(position)) }}
          onPlace={({ x, y }) => {
            setBoardRecords([
              ...boardRecords,
              { piece: isBlack ? 'black' : 'white', x, y },
            ])
            setIsBlack(!isBlack)
            setHighlight({ x, y })
          }}
        />
      </div>

      <div className="flex w-72 flex-col gap-2">
        <div>
          Hovered:
          <code>{JSON.stringify(hovered)}</code>
        </div>
        Width
        <Input
          type="number"
          value={width}
          onChange={event => { setWidth(+event.target.value) }}
        />
        <Checkbox
          checked={isBlack}
          onChange={event => { setIsBlack(event.target.checked) }}
        >
          isBlack
        </Checkbox>
        <Checkbox
          checked={isShowLabels}
          onChange={event => { setIsShowLabel(event.target.checked) }}
        >
          isShowLabels
        </Checkbox>

        <Button onClick={() => {
          setBoardRecords([])
          setHighlight(undefined)
        }}
        >Clear</Button>
      </div>
    </div>
  </>)
}

export function ComponentPlayground () {
  return (
    <div className="container flex max-w-[1000px] flex-col gap-6 px-2 py-4">
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
