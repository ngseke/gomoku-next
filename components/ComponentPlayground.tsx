'use client'

import { type ComponentProps, useState } from 'react'
import { NewRoomButton } from './GradientButton/NewRoomButton'
import { JoinRoomButton } from './GradientButton/JoinRoomButton'
import { Logo } from './LogoText'
import { ProfileButton } from './GradientButton/ProfileButton'
import { useInterval } from 'usehooks-ts'
import { Button } from './Button'
import { PlayerPill } from './PlayerPill'
import { GomokuBoard } from './GomokuBoard/GomokuBoard'
import { type BoardRecord } from '@/types/BoardRecord'
import { generateBoard } from '@/modules/generateBoard'
import { formatPosition } from '@/modules/formatPosition'
import { faGear, faRightFromBracket, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Input } from './Input'

function Headline (props: ComponentProps<'h2'>) {
  return <h2 className="mt-5 text-3xl font-bold" {...props} />
}

export function ComponentPlayground () {
  const [isActive, setIsActive] = useState(true)
  const [text, setText] = useState('Gomoku Next')

  useInterval(
    () => { setIsActive(!isActive) },
    1500
  )

  const [boardRecords, setBoardRecords] = useState<BoardRecord[]>([])
  const [highlight, setHighlight] = useState<{ x: number, y: number }>()
  const [isBlack, setIsBlack] = useState(true)

  return (
    <div className="container flex max-w-[1000px] flex-col gap-6 px-2 py-4">
      <Headline>Logo</Headline>
      <Logo />

      <Headline>Gradient Button</Headline>
      <div className="grid gap-4 sm:grid-cols-3">
        <NewRoomButton />
        <JoinRoomButton />
        <ProfileButton />
      </div>

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

      <Headline>Chat List</Headline>
      <div className="flex flex-wrap gap-6">
        <div className="w-[550px]">
          <GomokuBoard
            board={generateBoard(boardRecords)}
            highlight={highlight}
            showLabels={!!isBlack}
            onHover={(position) => { console.log(formatPosition(position)) }}
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
      </div>
    </div>
  )
}
