import { usePathname } from '@/navigation'

export function useShareUrl () {
  const pathname = usePathname()
  const origin = typeof window !== 'undefined' ? window.location.origin : null
  const shareUrl = origin ? String(new URL(pathname, origin)) : ''

  return { shareUrl }
}
