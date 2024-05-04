import { type locales } from '@/i18n'
import { usePathname, useRouter } from '@/navigation'

export function useSetLocale () {
  const router = useRouter()
  const pathname = usePathname()

  function setLocale (locale: typeof locales[number]) {
    router.replace(pathname, { locale })
  }

  return {
    setLocale,
  }
}
