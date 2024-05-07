import { Menu as BaseMenu } from '@headlessui/react'
import { faCheck, faEarthAsia } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from './Button'
import { useSetLocale } from '@/hooks/useSetLocale'
import { useLocale } from 'next-intl'
import { Menu } from './Menu'

const items = [
  { locale: 'en', name: 'English' },
  { locale: 'zh-Hant', name: '正體中文' },
  { locale: 'ja', name: '日本語' },
  { locale: 'ko', name: '한국어' },
] as const

export function LanguageButtonWithMenu ({ placement = 'bottom-start' }: {
  placement?: 'bottom-end' | 'bottom-start'
}) {
  const { setLocale } = useSetLocale()
  const locale = useLocale()

  return (
    <Menu
      activator={<Button icon={<FontAwesomeIcon icon={faEarthAsia} />} />}
      placement={placement}
    >
      {items.map((item, index) => (
        <BaseMenu.Item key={index}>
          <button
            className="flex w-full items-center gap-2 text-nowrap px-4 py-2 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800"
            onClick={() => { setLocale(item.locale) }}
          >
            <span className="inline-block w-4">
              {item.locale === locale &&
                <FontAwesomeIcon icon={faCheck} />}
            </span>
            {item.name}
          </button>
        </BaseMenu.Item>
      ))}
    </Menu>
  )
}
