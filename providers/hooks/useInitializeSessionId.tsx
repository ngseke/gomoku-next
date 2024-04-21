'use client'

import { useEffect } from 'react'
import { setSessionId } from '@/lib/features/authSlice'
import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch } from '@/lib/hooks'

export function useInitializeSessionId () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const sessionId = nanoid(6)
    dispatch?.(setSessionId(sessionId))
  }, [dispatch])
}
