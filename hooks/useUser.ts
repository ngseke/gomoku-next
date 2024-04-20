import { useAppSelector } from '@/lib/hooks'

/**
 * @deprecated
 */
export function useUser () {
  const user = useAppSelector((state) => state.auth.user)
  const isInitializingUser =
    useAppSelector((state) => state.auth.isInitializingUser)

  return {
    user,
    isInitializingUser,
  }
}
