import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useAuth } from 'reactfire'

export function useSignInWithGoogleAuth () {
  const auth = useAuth()

  async function signIn () {
    try {
      await signInWithRedirect(auth, new GoogleAuthProvider())
    } catch (err) {
      console.error(err)
    }
  }

  return {
    signIn,
  }
}
