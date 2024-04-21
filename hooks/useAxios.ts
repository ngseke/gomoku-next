import baseAxios from 'axios'
import { useEffect, useRef } from 'react'
import { useAuth } from 'reactfire'
import { useAuthStore } from './useAuthStore'

export function useAxios () {
  const axiosRef = useRef(baseAxios.create())
  const auth = useAuth()

  const { sessionId } = useAuthStore()

  useEffect(() => {
    const axios = axiosRef.current

    const interceptor = axios.interceptors.request.use(async (config) => {
      const token = await auth.currentUser?.getIdToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      config.headers['X-Session-Id'] = sessionId

      return config
    })

    return () => {
      axios.interceptors.request.eject(interceptor)
    }
  }, [auth, sessionId])

  return axiosRef.current
}
