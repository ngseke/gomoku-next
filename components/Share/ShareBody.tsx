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
    <div className="flex w-full flex-col gap-2 sm:flex-row">
      <div className="flex-1">
        <Input
          readOnly
          leftSection={<FontAwesomeIcon icon={faLink} />}
          value={url}
        />
      </div>

      <div className="w-full sm:w-auto ">
        <Button block onClick={copy}>{t('action.copy')}</Button>
      </div>
    </div>
  )
}
