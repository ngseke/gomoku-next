import type { Metadata } from 'next'
import '../globals.css'
import { Providers } from '@/providers/Providers'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { cn } from '@/modules/cn'
import { type Locale } from '@/types/Locale'
import { fontVariables } from './fonts'

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'Gomoku Next',
  description: 'Gomoku Next',
}

export default function RootLayout ({ children, params: { locale } }: Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>) {
  const messages = useMessages()

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={cn(
          fontVariables,
          'font-sans',
          {
            'font-sans-ja': locale === 'ja',
          },
        )}
      >
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="h-full">
              {children}
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
