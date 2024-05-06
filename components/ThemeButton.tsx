'use client'

import { Button } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useIsMounted } from '../hooks/useIsMounted'
import { cn } from '@/modules/cn'
import { useTheme } from '../hooks/useTheme'

export function ThemeButton () {
  const { theme, themeIcon, toggleTheme } = useTheme()
  const { isMounted } = useIsMounted()

  if (!isMounted) return null

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
