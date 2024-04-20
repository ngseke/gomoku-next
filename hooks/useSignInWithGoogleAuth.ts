import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuth } from 'reactfire'

export function useSignInWithGoogleAuth () {
  const auth = useAuth()

  async function signIn () {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (err) {
      console.error(err)
    }
  }

  return {
    signIn,
  }
}
