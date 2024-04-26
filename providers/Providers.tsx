'use client'

import { firebaseConfig } from '@/modules/firebase'
import { type PropsWithChildren } from 'react'
import { FirebaseAppProvider } from 'reactfire'
import { ThemeProvider } from 'next-themes'
import { FirebaseProviders } from './FirebaseProviders'
import { StoreProvider } from './StoreProvider'
import { InitializeStoreProvider } from './InitializeStoreProvider'

export function Providers ({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class">
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseProviders>
          <StoreProvider>
            <InitializeStoreProvider>
              {children}
            </InitializeStoreProvider>
          </StoreProvider>
        </FirebaseProviders>
      </FirebaseAppProvider>
    </ThemeProvider>

  )
}
