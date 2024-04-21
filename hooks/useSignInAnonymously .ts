import { signInAnonymously as baseSignInAnonymously } from 'firebase/auth'
import { useState } from 'react'
import { useAuth } from 'reactfire'

export function useSignInAnonymously () {
  const auth = useAuth()
  const [isSigningInAnonymously, setIsSigningInAnonymously] = useState(false)

  async function signInAnonymously () {
    setIsSigningInAnonymously(true)

    try {
      return await baseSignInAnonymously(auth)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSigningInAnonymously(false)
    }
  }

  return {
    signInAnonymously,
    isSigningInAnonymously,
  }
}
