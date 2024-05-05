'use client'

import { firebaseConfig } from '@/modules/firebase'
import { type PropsWithChildren } from 'react'
import { FirebaseAppProvider } from 'reactfire'
import { ThemeProvider } from 'next-themes'
import { FirebaseProviders } from './FirebaseProviders'
import { StoreProvider } from './StoreProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers ({ children }: PropsWithChildren) {
  return (
    <ThemeProvider disableTransitionOnChange attribute="class">
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseProviders>
          <StoreProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </StoreProvider>
        </FirebaseProviders>
      </FirebaseAppProvider>
    </ThemeProvider>

  )
}
