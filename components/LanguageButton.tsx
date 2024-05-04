import { faCheck, faEarthAsia } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from './Button'
import { useSetLocale } from '@/hooks/useSetLocale'
import { useLocale } from 'next-intl'
import { cn } from '@/modules/cn'

const items = [
  { locale: 'en', name: 'English' },
  { locale: 'zh-Hant', name: '正體中文' },
  { locale: 'ja', name: '日本語' },
] as const

export function LanguageButton ({ placement = 'bottom-start' }: {
  placement?: 'bottom-end' | 'bottom-start'
}) {
  const { setLocale } = useSetLocale()
  const locale = useLocale()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as={Fragment}>
        <Button icon={<FontAwesomeIcon icon={faEarthAsia} />} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        leave="transition ease-in duration-75"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items
          className={cn('absolute mt-2 w-36 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-neutral-100 py-1  shadow-lg focus:outline-none dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900', {
            'left-0 top-full origin-top-left': placement === 'bottom-start',
            'right-0 top-full origin-top-right': placement === 'bottom-end',
          })}
        >
          {items.map((item, index) => (
            <Menu.Item key={index}>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800"
                onClick={() => { setLocale(item.locale) }}
              >
                <span className="inline-block w-4">
                  {item.locale === locale &&
                    <FontAwesomeIcon icon={faCheck} />}
                </span>
                {item.name}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
