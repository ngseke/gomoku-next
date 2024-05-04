import { Inter, Noto_Sans_TC, Noto_Sans_JP, Roboto_Mono } from 'next/font/google'

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

export const fontVariables = [
  inter.variable,
  notoSansTc.variable,
  notoSansJp.variable,
  robotoMono.variable,
]
