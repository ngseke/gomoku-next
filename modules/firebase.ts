import { type FirebaseOptions } from 'firebase/app'

function getFirebaseConfig () {
  const raw = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  if (!raw) throw new Error('Missing env `NEXT_PUBLIC_FIREBASE_CONFIG`!')

  const firebaseOptions = JSON.parse(raw) as FirebaseOptions

  try {
    const authDomain = location.host
    if (authDomain) {
      firebaseOptions.authDomain = authDomain
    }
  } catch (err) {

  }

  return firebaseOptions
}

export const firebaseConfig = getFirebaseConfig()
