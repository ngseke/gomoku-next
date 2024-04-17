import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

export const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? ''
)

export const firebaseApp = initializeApp(firebaseConfig)

export const firebaseDatabase = getDatabase(firebaseApp)
