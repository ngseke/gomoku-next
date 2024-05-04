import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'zh-Hant'],
  defaultLocale: 'en',
})

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|__|.*\\..*).*)',
  ],
}
