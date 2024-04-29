'use client'

import { useEffect } from 'react'
import { initializeSessionId } from '@/lib/features/authSlice'
import { useAppDispatch } from '@/lib/hooks'

export function useInitializeSessionId () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch?.(initializeSessionId())
  }, [dispatch])
}
