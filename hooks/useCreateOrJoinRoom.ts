'use client'
import { useState } from 'react'
import { useAxios } from '@/hooks/useAxios'
import { type Room } from '@/types/Room'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useSignInAnonymously } from '@/hooks/useSignInAnonymously'
import { AxiosError } from 'axios'

export function useCreateOrJoinRoom () {
  const axios = useAxios()
  const { player, isInitializingPlayer } = useAuthStore()

  const [isCreatingOrJoiningRoom, setIsCreatingOrJoiningRoom] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)

  function clearJoinError () {
    setJoinError(null)
  }

  const { signInAnonymously } = useSignInAnonymously()

  async function ensurePlayer () {
    if (player) return
    await signInAnonymously()
  }

  async function createRoom () {
    if (isInitializingPlayer) return

    setIsCreatingOrJoiningRoom(true)

    try {
      await ensurePlayer()
      const { data } = await axios.post<Room>('/api/room/create', {})
      return data
    } finally {
      setIsCreatingOrJoiningRoom(false)
    }
  }

  async function joinRoom (id: string) {
    if (isInitializingPlayer) return

    setIsCreatingOrJoiningRoom(true)

    try {
      await ensurePlayer()
      await axios.post(`/api/room/${id}/join`)
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = (err as AxiosError).response?.data
        setJoinError(message as string)
      } else {
        throw err
      }
    } finally {
      setIsCreatingOrJoiningRoom(false)
    }
  }

  return {
    createRoom,
    joinRoom,
    clearJoinError,
    isCreatingOrJoiningRoom,
    joinError,
  }
}
