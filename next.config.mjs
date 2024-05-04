import createNextIntlPlugin from 'next-intl/plugin'

const { projectId } = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites () {
    return [
      {
        source: '/__/auth/:path*',
        destination: `https://${projectId}.firebaseapp.com/__/auth/:path*`,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
