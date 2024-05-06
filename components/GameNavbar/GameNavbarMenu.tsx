import { Menu as BaseMenu } from '@headlessui/react'
import { faBars, faLocationCrosshairs, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslations } from 'next-intl'
import { Menu } from '@/components/Menu'
import { Button } from '@/components/Button'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useTheme } from '@/hooks/useTheme'

export function GameNavbarMenu ({
  onClickBackIconButton,
  isShowLabels,
  onClickToggleIsShowLabels,
  shareUrl,
}: {
  onClickBackIconButton: () => void
  isShowLabels: boolean
  onClickToggleIsShowLabels: () => void
  shareUrl?: string
}) {
  const t = useTranslations()

  const { themeIcon, themeLabel, toggleTheme } = useTheme()
  const { isMounted } = useIsMounted()

  if (!isMounted) return null

  const items = [
    {
      name: isShowLabels ? t('menu.hideLabel') : t('menu.showLabel'),
      icon: faLocationCrosshairs,
      action: onClickToggleIsShowLabels,
    },
    {
      name: t('menu.share'),
      icon: faShareNodes,
      action: () => { },
    },
    {
      name: themeLabel,
      icon: themeIcon,
      action: toggleTheme,
    },
  ] as const

  return (<>
    <Menu
      activator={<Button icon={<FontAwesomeIcon icon={faBars} />} />}
      placement="bottom-end"
    >
      {items.map((item, index) => (
        <BaseMenu.Item key={index}>
          <button
            className="flex w-full items-center gap-2 text-nowrap px-4 py-2 text-left text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800"
            onClick={item.action}
          >
            <span className="inline-flex min-w-4 justify-center">
              {item.icon &&
                <FontAwesomeIcon icon={item.icon} />}
            </span>
            {item.name}
          </button>
        </BaseMenu.Item>
      ))}
    </Menu>
  </>)
}
