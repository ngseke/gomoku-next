import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../Button'
import { Input } from '../Input'
import { useTranslations } from 'next-intl'

export function ShareBody ({ url }: { url?: string }) {
  const t = useTranslations()

  function copy () {
    if (!url) return
    void navigator.clipboard.writeText(url)
  }

  return (
    <div className="flex min-w-96 flex-col items-start gap-3">
      <h2 className="flex items-center gap-3 text-lg font-bold">
        {t('share.title')}
      </h2>

      <div className="grid w-full grid-cols-[1fr_auto] gap-2">
        <Input
          readOnly
          leftSection={<FontAwesomeIcon icon={faLink} />}
          value={url}
        />
        <Button onClick={copy}>{t('action.copy')}</Button>
      </div>
    </div>
  )
}
