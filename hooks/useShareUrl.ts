import { usePathname } from 'next/navigation'

export function useShareUrl () {
  const pathname = usePathname()
  const origin = window.location.origin
  const shareUrl = String(new URL(pathname, origin))

  return { shareUrl }
}
