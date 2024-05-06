'use client'
import { useTheme as useBaseTheme } from 'next-themes'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { startViewTransition } from '@/modules/startViewTransition'
import { useTranslations } from 'next-intl'

export function useTheme () {
  const { theme, setTheme } = useBaseTheme()
  const t = useTranslations()

  const themeIcon = theme
    ? {
        system: faMoon,
        dark: faSun,
        light: faMoon,
      }[theme]
    : null

  const themeLabel = theme
    ? {
        system: t('theme.darkTheme'),
        dark: t('theme.lightTheme'),
        light: t('theme.systemTheme'),
      }[theme]
    : null

  function toggleTheme () {
    startViewTransition(() => {
      if (theme === 'system') {
        setTheme('dark')
      } else if (theme === 'dark') {
        setTheme('light')
      } else {
        setTheme('system')
      }
    })
  }

  return {
    theme,
    themeIcon,
    themeLabel,
    toggleTheme,
  }
}
