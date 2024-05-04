'use client'
import { useState } from 'react'
import { useInterval } from 'usehooks-ts'
import { PlayerPill } from '../PlayerPill'
import { PlayerPillWithLabel } from '../PlayerPillWithLabel'
import { Headline } from './Headline'

export function PlayerPillSection () {
  const [isActive, setIsActive] = useState(true)
  useInterval(() => { setIsActive(!isActive) }, 3000)

  return (<>
    <Headline>Player Pill</Headline>
    <div className="flex flex-wrap gap-2">
      <PlayerPill emoji="🍌️" name="Sean Huang" />
      <PlayerPill color="black" emoji="🐻️" name="張三" />
      <PlayerPill color="white" emoji="🐻‍❄️" name="李四" />
      <PlayerPill active={isActive} color="black" emoji="🗿" name="楊淑芬" />
      <PlayerPill active={!isActive} color="white" emoji="🎃️" name="陳金發" />
      <PlayerPill active emoji="🦒" name="Long Long Long Long Long Giraffe" />
      <div className="w-full" />
      <PlayerPill loading name="Sean Huang" />
      <PlayerPill emoji="🫥" />
      <PlayerPill name="John Smith" />
      <div className="w-full" />
    </div>

    <Headline>Player Pill With Label</Headline>
    <div className="flex flex-wrap gap-2">
      <div className="w-full" />
      <PlayerPillWithLabel color="black" emoji="🤨" isWinner={isActive} label="你" name="楊淑芬" />
      <PlayerPillWithLabel color="white" emoji="😈️" isWinner={!isActive} label="對手" name="陳金發" />
      <PlayerPillWithLabel loading />
    </div>
  </>)
}
