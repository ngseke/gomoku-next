import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from '@/providers/Providers'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { NextIntlClientProvider, useMessages } from 'next-intl'

config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gomoku Next',
  description: 'Gomoku Next',
}

export default function RootLayout ({ children, params: { locale } }: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = useMessages()

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={inter.className}>
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
