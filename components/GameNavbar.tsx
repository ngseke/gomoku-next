import { faListOl, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BackIconButton } from './BackIconButton'
import { Button } from './Button'
import { LogoText } from './LogoText'
import { Navbar } from './Navbar'
import { ThemeButton } from './ThemeButton'

export function GameNavbar ({
  isBackIconButtonLoading,
  onClickBackIconButton,
  isShowLabels,
  onClickToggleIsShowLabels,
}: {
  isBackIconButtonLoading: boolean
  onClickBackIconButton: () => void
  isShowLabels: boolean
  onClickToggleIsShowLabels: () => void
}) {
  return (
    <Navbar>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <BackIconButton
            loading={isBackIconButtonLoading}
            onClick={onClickBackIconButton}
          />
          <LogoText size="sm" />
        </div>

        <div className="flex gap-2">
          <Button
            icon={isShowLabels
              ? <FontAwesomeIcon icon={faListOl} />
              : <FontAwesomeIcon icon={faListOl} />}
            onClick={onClickToggleIsShowLabels}
          >{isShowLabels ? 'Hide' : 'Show'} Labels</Button>
          <Button icon={<FontAwesomeIcon icon={faShareNodes} />} />
          <ThemeButton />
        </div>
      </div>
    </Navbar>
  )
}
