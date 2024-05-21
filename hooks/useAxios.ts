import baseAxios from 'axios'
import { useEffect } from 'react'
import { useAuth } from 'reactfire'
import { useAuthStore } from './useAuthStore'

const axios = baseAxios.create({
  timeout: 10000,
})

export function useAxios () {
  const auth = useAuth()

  const { sessionId } = useAuthStore()

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(async (config) => {
      const token = await auth.currentUser?.getIdToken()

      config.headers.Authorization = `Bearer ${token}`
      config.headers['X-Session-Id'] = sessionId

      return config
    })

    return () => {
      axios.interceptors.request.eject(interceptor)
    }
  }, [auth, sessionId])

  return axios
}
