import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BackIconButton } from './BackIconButton'
import { Button } from './Button'
import { LogoText } from './LogoText'
import { Navbar } from './Navbar'
import { ThemeButton } from './ThemeButton'
import { ShareButton } from './ShareButton'

export function GameNavbar ({
  isBackIconButtonLoading,
  onClickBackIconButton,
  isShowLabels,
  onClickToggleIsShowLabels,
  shareUrl,
}: {
  isBackIconButtonLoading: boolean
  onClickBackIconButton: () => void
  isShowLabels: boolean
  onClickToggleIsShowLabels: () => void
  shareUrl?: string
}) {
  return (
    <Navbar>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <BackIconButton
            loading={isBackIconButtonLoading}
            onClick={onClickBackIconButton}
          />
          <LogoText className="text-nowrap text-2xl sm:text-3xl" />
        </div>

        <div className="flex gap-2">
          <Button
            icon={isShowLabels
              ? <FontAwesomeIcon icon={faListOl} />
              : <FontAwesomeIcon icon={faListOl} />}
            onClick={onClickToggleIsShowLabels}
          >{isShowLabels ? 'Hide' : 'Show'} Labels</Button>

          <ShareButton url={shareUrl} />
          <ThemeButton />
        </div>
      </div>
    </Navbar>
  )
}
