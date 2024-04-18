import axios from 'axios'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuth } from 'reactfire'

export function useSignInWithGoogleAuth () {
  const auth = useAuth()

  async function signIn () {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider())
      const { user } = result
      await axios.post(`/api/player/${user.uid}/init`, user)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    signIn,
  }
}
