import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../Button'
import { SharePopover } from './SharePopover'
import { useTranslations } from 'next-intl'

export function ShareButtonWithPopover ({ url }: { url?: string }) {
  const t = useTranslations()

  return (
    <SharePopover
      activator={
        <Button
          icon={<FontAwesomeIcon icon={faShareNodes} />}
        >{t('menu.share')}</Button>
      }
      url={url}
    />
  )
}
