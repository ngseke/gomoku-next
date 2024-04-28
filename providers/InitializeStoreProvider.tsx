'use client'

import { type PropsWithChildren } from 'react'
import { useListenPlayerState } from './hooks/useListenPlayerState'
import { useInitializeSessionId } from './hooks/useInitializeSessionId'
import { useInitializeUser } from './hooks/useInitializeUser'
import { useListenRoom } from './hooks/useListenRoom'
import { useOnDisconnect } from './hooks/useOnDisconnect'
import { useUpdateUrlParams } from './hooks/useUpdateUrlParams'

export function InitializeStoreProvider ({ children }: PropsWithChildren) {
  useInitializeUser()
  useInitializeSessionId()

  useListenPlayerState()
  useListenRoom()

  useOnDisconnect()
  useUpdateUrlParams()

  return children
}
