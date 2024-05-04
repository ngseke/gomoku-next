import { type Locale } from '@/types/Locale'
import { cookies } from 'next/headers'

export function getLocaleFromCookie () {
  const locale = cookies().get('NEXT_LOCALE')?.value as Locale

  return locale
}
