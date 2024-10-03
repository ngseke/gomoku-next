import { Menu as BaseMenu, Transition } from '@headlessui/react'
import { Fragment, type ReactElement, type PropsWithChildren } from 'react'
import { cn } from '@/modules/cn'

export function Menu ({
  placement = 'bottom-start',
  activator,
  children,
  itemsClassNames,
}: PropsWithChildren<{
  activator: ReactElement
  placement?: 'bottom-end' | 'bottom-start'
  itemsClassNames?: string
}>) {
  const overlay = <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm sm:hidden" />

  return (
    <BaseMenu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <BaseMenu.Button as={Fragment}>
            {activator}
          </BaseMenu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            leave="transition ease-in duration-75"
            leaveTo="opacity-0 scale-95"
            show={open}
          >
            <BaseMenu.Items
              static
              className={cn('fixed left-4 right-4 top-1/2 z-20 mt-2 min-w-36 -translate-y-1/2 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-neutral-100 py-1 shadow-lg focus:outline-none dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 sm:absolute sm:w-auto sm:translate-x-0 sm:translate-y-0', {
                'sm:left-0 sm:right-auto sm:top-full sm:origin-top-left': placement === 'bottom-start',
                'sm:left-auto sm:right-0 sm:top-full sm:origin-top-right': placement === 'bottom-end',
              }, itemsClassNames)}
            >
              {children}
            </BaseMenu.Items>
          </Transition>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0"
            leave="transition ease-in duration-75"
            leaveTo="opacity-0"
            show={open}
          >
            {overlay}
          </Transition>
        </>
      )}
    </BaseMenu>
  )
}
