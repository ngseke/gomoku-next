import { type FirebaseOptions } from 'firebase/app'

function getFirebaseConfig () {
  const raw = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  if (!raw) throw new Error('Missing env `NEXT_PUBLIC_FIREBASE_CONFIG`!')

  return JSON.parse(raw) as FirebaseOptions
}

export const firebaseConfig = getFirebaseConfig()
