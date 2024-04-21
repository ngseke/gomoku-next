import { signInAnonymously } from 'firebase/auth'
import { useAuth } from 'reactfire'

export function useSignInAnonymously () {
  const auth = useAuth()

  async function signIn () {
    try {
      await signInAnonymously(auth)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    signIn,
  }
}
