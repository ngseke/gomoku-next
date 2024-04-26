'use client'

import { useTheme } from 'next-themes'
import { Checkbox } from '../Checkbox'
import { useEffect, useState } from 'react'

export function ThemeToggle () {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Checkbox
      checked={theme === 'dark'}
      onChange={() => {
        if (theme === 'dark') {
          setTheme('light')
        } else {
          setTheme('dark')
        }
      }}
    >Dark?</Checkbox>
  )
}
