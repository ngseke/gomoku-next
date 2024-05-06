import { ShareBody } from './ShareBody'
import { Dialog } from '../Dialog'
import { useTranslations } from 'next-intl'

export function ShareDialog ({ open, onClose, url }: {
  open?: boolean
  onClose?: () => void
  url?: string
}) {
  const t = useTranslations()

  return (
    <Dialog open={Boolean(open)} title={t('share.title')} onClose={onClose}>
      <ShareBody url={url} />
    </Dialog>
  )
}
