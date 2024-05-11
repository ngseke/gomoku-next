import { Fragment, type ReactNode, type PropsWithChildren } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { Transition } from '@headlessui/react'
import { type Chat } from '@/types/Chat'
import { type Nullish } from '@/types/Nullish'
import { useCachedState } from '../hooks/useCachedState'

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

function LabelSkeleton () {
  return (
    <span className="h-4 w-14 rounded-md bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800" />
  )
}

export function GamePlayerPillWrapper ({
  label,
  isWinner,
  loading,
  chat,
  children,
}: PropsWithChildren<{
  label?: ReactNode
  isWinner?: boolean
  loading?: boolean
  chat?: Nullish<Chat>
}>) {
  const cachedChat = useCachedState(chat)

  return (
    <div className="relative inline-flex max-w-full flex-col items-center gap-1.5">
      <Crown show={Boolean(isWinner)} />
      {children}

      {loading
        ? <LabelSkeleton />
        : <span className="text-xs font-medium opacity-60">
          {label}
        </span>}

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 -translate-y-3 scale-50"
        leave="transition ease-in duration-100"
        leaveTo="opacity-0"
        show={Boolean(chat)}
      >
        <div className="absolute bottom-0 line-clamp-1 max-w-full break-words rounded-xl bg-neutral-200/90 px-2 py-1 text-sm after:opacity-0 dark:bg-neutral-800/90">
          {cachedChat?.message}
        </div>
      </Transition>
    </div>
  )
}
