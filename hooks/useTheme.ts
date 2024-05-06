'use client'
import { useTheme as useBaseTheme } from 'next-themes'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { startViewTransition } from '@/modules/startViewTransition'

export function useTheme () {
  const { theme, setTheme } = useBaseTheme()

  const themeIcon = theme
    ? {
        system: faMoon,
        dark: faSun,
        light: faMoon,
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
    toggleTheme,
  }
}
