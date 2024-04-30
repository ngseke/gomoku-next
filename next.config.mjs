const { projectId } = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

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

export default nextConfig
