import { useAppSelector } from '@/lib/hooks'
import baseAxios from 'axios'
import { useEffect, useRef } from 'react'

export function useAxios () {
  const axios = useRef(baseAxios.create())
  const token = useAppSelector((state) => state.auth.token)

  useEffect(() => {
    axios.current.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })
  }, [token])

  return axios.current
}
