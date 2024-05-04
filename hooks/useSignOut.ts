import { signOut as firebaseSignOut } from 'firebase/auth'
import { useAuth } from 'reactfire'
import { useAxios } from './useAxios'

export function useSignOut () {
  const auth = useAuth()
  const axios = useAxios()

  async function signOut () {
    await axios.post('/api/room/exit')
    await axios.post('/api/player/sign-out')
    await firebaseSignOut(auth)
  }

  return {
    signOut,
  }
}
