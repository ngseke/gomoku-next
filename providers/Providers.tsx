'use client'

import { firebaseConfig } from '@/modules/firebase'
import { type PropsWithChildren } from 'react'
import { FirebaseAppProvider } from 'reactfire'
import { FirebaseProviders } from './FirebaseProviders'

export function Providers ({ children }: PropsWithChildren) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseProviders>
        {children}
      </FirebaseProviders>
    </FirebaseAppProvider>
  )
}
