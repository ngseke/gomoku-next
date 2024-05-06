import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../Button'
import { SharePopover } from './SharePopover'

export function ShareButtonWithPopover ({ url }: { url?: string }) {
  return (
    <SharePopover
      activator={<Button icon={<FontAwesomeIcon icon={faShareNodes} />} />}
      url={url}
    />
  )
}
