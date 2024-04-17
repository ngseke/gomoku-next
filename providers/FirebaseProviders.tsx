'use client'

import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { type PropsWithChildren } from 'react'
import { AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire'

export function FirebaseProviders ({ children }: PropsWithChildren) {
  const databaseInstance = getDatabase(useFirebaseApp())
  const authInstance = getAuth(useFirebaseApp())

  return (
    <AuthProvider sdk={authInstance}>
      <DatabaseProvider sdk={databaseInstance}>
        {children}
      </DatabaseProvider>
    </AuthProvider>
  )
}
