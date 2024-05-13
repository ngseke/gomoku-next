'use client'

import { Button } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useIsMounted } from '../hooks/useIsMounted'
import { cn } from '@/modules/cn'
import { useTheme } from '../hooks/useTheme'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export function ThemeButton () {
  const { theme, themeIcon, toggleTheme } = useTheme()
  const { isMounted } = useIsMounted()

  if (!isMounted) {
    return (
      <Button
        icon={<FontAwesomeIcon className="opacity-20" icon={faCircle} />}
      />
    )
  }

  return (
    <Button
      icon={
        themeIcon
          ? <FontAwesomeIcon
              className={cn({ 'opacity-50': theme === 'system' })}
              icon={themeIcon}
            />
          : null
      }
      onClick={toggleTheme}
    />
  )
}
