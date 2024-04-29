import { Fragment, type ComponentProps } from 'react'
import { PlayerPill } from './PlayerPill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { Transition } from '@headlessui/react'

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
      className="relative inline-flex max-w-full flex-col items-center gap-1"
    >
      <Transition
        as={Fragment}
        enter="ease-out duration-500 delay-[1s]"
        enterFrom="opacity-0 scale-[175%]"
        enterTo="opacity-100"
        show={Boolean(isWinner)}
      >
        <FontAwesomeIcon
          className="absolute -top-1 left-0.5 z-10 inline-block rotate-[-20deg] text-yellow-400 drop-shadow-[0_0_.5rem_#facc15]"
          icon={faCrown}
        />
      </Transition>
      <PlayerPill {...restProps} />
      <span className="text-sm font-medium opacity-60">
        {label}
      </span>
    </div>
  )
}
