'use client'

import { ThemeToggle } from './ThemeToggle'
import { LogoSection } from './LogoSection'
import { GradientButtonSection } from './GradientButtonSection'
import { PlayerPillSection } from './PlayerPillSection'
import { ButtonSection } from './ButtonSection'
import { InputSection } from './InputSection'
import { ChatBoxSection } from './ChatBoxSection'
import { GomokuBoardSection } from './GomokuBoardSection'
import { Navbar } from '../Navbar'
import { BackIconButton } from '../BackIconButton'
import { LogoText } from '../LogoText'

export function ComponentPlayground () {
  return (<>
    <Navbar>
      <div className="flex items-center gap-4">
        <BackIconButton href="/" />
        <LogoText className="text-nowrap text-2xl sm:text-3xl" />
      </div>
    </Navbar>

    <div className="container flex max-w-[1000px] flex-col gap-6 px-4 pb-8 pt-24">
      <ThemeToggle />
      <LogoSection />
      <GradientButtonSection />
      <PlayerPillSection />
      <ButtonSection />
      <InputSection />
      <ChatBoxSection />
      <GomokuBoardSection />
    </div>
  </>)
}
