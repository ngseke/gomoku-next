'use client'
import { useState } from 'react'
import { useAxios } from '@/hooks/useAxios'
import { type Room } from '@/types/Room'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useSignInAnonymously } from '@/hooks/useSignInAnonymously '

export function useCreateOrJoinRoom () {
  const axios = useAxios()
  const { player } = useAuthStore()

  const [isCreatingOrJoiningRoom, setIsCreatingOrJoiningRoom] = useState(false)

  const { signInAnonymously } = useSignInAnonymously()

  async function ensurePlayer () {
    if (player) return
    await signInAnonymously()
  }

  async function createRoom () {
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
    setIsCreatingOrJoiningRoom(true)

    try {
      await ensurePlayer()
      await axios.post(`/api/room/${id}/join`)
    } finally {
      setIsCreatingOrJoiningRoom(false)
    }
  }

  return {
    createRoom,
    joinRoom,
    isCreatingOrJoiningRoom,
  }
}
