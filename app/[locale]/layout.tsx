import type { Metadata } from 'next'
import { Inter, Noto_Sans_TC, Noto_Sans_JP, Roboto_Mono } from 'next/font/google'
import '../globals.css'
import { Providers } from '@/providers/Providers'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { cn } from '@/modules/cn'
import { type Locale } from '@/types/Locale'

config.autoAddCss = false

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansTc = Noto_Sans_TC({
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
})

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
})

const robotoMono = Roboto_Mono({
  variable: '--font-robot-mono',
  subsets: ['latin'],
})

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
          inter.variable,
          notoSansTc.variable,
          notoSansJp.variable,
          robotoMono.variable,
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
