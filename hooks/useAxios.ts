import baseAxios from 'axios'
import { useEffect, useRef } from 'react'
import { useAuth } from 'reactfire'

export function useAxios () {
  const axios = useRef(baseAxios.create())
  const auth = useAuth()

  useEffect(() => {
    axios.current.interceptors.request.use(async (config) => {
      const token = await auth.currentUser?.getIdToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })
  }, [auth])

  return axios.current
}
