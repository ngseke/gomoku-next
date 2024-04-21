import { useAppSelector } from '@/lib/hooks'

export function useAuthStore () {
  return useAppSelector((state) => state.auth)
}
