import { Fragment, type ComponentProps } from 'react'
import { PlayerPill } from './PlayerPill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { Transition } from '@headlessui/react'

function Crown ({ show }: { show?: boolean }) {
  return (
    <Transition
      as={Fragment}
      enter="ease-out duration-1000 delay-[1s]"
      enterFrom="opacity-0 scale-[500%]"
      enterTo="opacity-100"
      show={show}
    >
      <FontAwesomeIcon
        className="absolute -left-0.5 -top-2 z-10 inline-block rotate-[-20deg] text-xl text-yellow-400 drop-shadow-[0_0_.5rem_#facc15]"
        icon={faCrown}
      />
    </Transition>
  )
}

export function PlayerPillWithLabel ({
  label,
  isWinner,
  ...restProps
}: ComponentProps<typeof PlayerPill> & {
  label?: string
  isWinner?: boolean
}) {
  return (
    <div
      className="relative inline-flex max-w-full flex-col items-center gap-1.5"
    >
      <Crown show={Boolean(isWinner)} />
      <PlayerPill {...restProps} />
      <span className="text-xs font-medium opacity-60">
        {label}
      </span>
    </div>
  )
}
