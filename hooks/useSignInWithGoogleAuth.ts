import axios from 'axios'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuth } from 'reactfire'

export function useSignInWithGoogleAuth () {
  const auth = useAuth()

  async function signIn () {
    const result = await signInWithPopup(auth, new GoogleAuthProvider())
    const { user } = result

    await axios.post(`/api/user/${user.uid}/init`, user)

    return new Response(null, { status: 204 })
  }

  return {
    signIn,
  }
}
