import { useListenPlayerState } from './initialize/useListenPlayerState'
import { useInitializeSessionId } from './initialize/useInitializeSessionId'
import { useInitializeUser } from './initialize/useInitializeUser'
import { useListenRoom } from './initialize/useListenRoom'
import { useOnDisconnect } from './initialize/useOnDisconnect'
import { useUpdateUrlParams } from './initialize/useUpdateUrlParams'
import { useListenChat } from './initialize/useListenChat'

export function useInitializeStore () {
  useInitializeUser()
  useInitializeSessionId()

  useListenPlayerState()
  useListenRoom()
  useListenChat()

  useOnDisconnect()
  useUpdateUrlParams()
}
