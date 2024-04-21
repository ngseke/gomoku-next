'use client'

import { type PropsWithChildren } from 'react'
import { useInitializePlayerState } from './hooks/useInitializePlayerState'
import { useInitializeSessionId } from './hooks/useInitializeSessionId'
import { useInitializeUser } from './hooks/useInitializeUser'

export function InitializeStoreProvider ({ children }: PropsWithChildren) {
  useInitializeUser()
  useInitializeSessionId()
  useInitializePlayerState()

  return children
}
