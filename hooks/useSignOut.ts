import { signOut as firebaseSignOut } from 'firebase/auth'
import { useAuth } from 'reactfire'

export function useSignOut () {
  const auth = useAuth()

  async function signOut () {
    await firebaseSignOut(auth)
  }

  return {
    signOut,
  }
}
