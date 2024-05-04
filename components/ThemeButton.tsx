'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { startViewTransition } from '@/modules/startViewTransition'

export function ThemeButton () {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const icon = theme
    ? {
        dark: <FontAwesomeIcon icon={faSun} />,
        light: <FontAwesomeIcon icon={faMoon} />,
        system: <FontAwesomeIcon className="opacity-50" icon={faSun} />,
      }[theme]
    : null

  function handleClick () {
    startViewTransition(() => {
      if (theme !== 'light') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
    })
  }

  return <Button icon={icon} onClick={handleClick} />
}
