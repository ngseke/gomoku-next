import { Menu as BaseMenu, Transition } from '@headlessui/react'
import { Fragment, type ReactElement, type PropsWithChildren } from 'react'
import { cn } from '@/modules/cn'

export function Menu ({
  placement = 'bottom-start',
  activator,
  children,
}: PropsWithChildren<{
  activator: ReactElement
  placement?: 'bottom-end' | 'bottom-start'
}>) {
  return (
    <BaseMenu as="div" className="relative inline-block text-left">
      <BaseMenu.Button as={Fragment}>
        {activator}
      </BaseMenu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        leave="transition ease-in duration-75"
        leaveTo="opacity-0 scale-95"
      >
        <BaseMenu.Items
          className={cn('absolute mt-2 min-w-36 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-neutral-100 py-1  shadow-lg focus:outline-none dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900', {
            'left-0 top-full origin-top-left': placement === 'bottom-start',
            'right-0 top-full origin-top-right': placement === 'bottom-end',
          })}
        >
          {children}
        </BaseMenu.Items>
      </Transition>
    </BaseMenu>
  )
}
