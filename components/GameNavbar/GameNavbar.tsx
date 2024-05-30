import { faIcons, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BackIconButton } from '../BackIconButton'
import { Button } from '../Button'
import { LogoText } from '../LogoText'
import { Navbar } from '../Navbar'
import { ThemeButton } from '../ThemeButton'
import { ShareButtonWithPopover } from '../Share/ShareButtonWithPopover'
import { GameNavbarMenu } from './GameNavbarMenu'
import { useTranslations } from 'next-intl'

export function GameNavbar ({
  isBackIconButtonLoading,
  onClickBackIconButton,
  isShowLabels,
  onClickToggleIsShowLabels,
  isShowEmojiPiece,
  onClickToggleIsShowEmojiPiece,
  shareUrl,
}: {
  isBackIconButtonLoading: boolean
  onClickBackIconButton: () => void
  isShowLabels: boolean
  onClickToggleIsShowLabels: () => void
  isShowEmojiPiece: boolean
  onClickToggleIsShowEmojiPiece: () => void
  shareUrl?: string
}) {
  const t = useTranslations()

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

        <div className="hidden gap-2 md:flex">
          <Button
            icon={<FontAwesomeIcon icon={faIcons} />}
            onClick={onClickToggleIsShowEmojiPiece}
          >{isShowEmojiPiece ? t('menu.showDefaultPiece') : t('menu.showEmojiPiece')}</Button>

          <Button
            icon={<FontAwesomeIcon icon={faLocationCrosshairs} />}
            onClick={onClickToggleIsShowLabels}
          >{isShowLabels ? t('menu.hideLabel') : t('menu.showLabel')}</Button>

          <ShareButtonWithPopover url={shareUrl} />
          <ThemeButton />
        </div>

        <div className="block md:hidden">
          <GameNavbarMenu
            isShowEmojiPiece={isShowEmojiPiece}
            isShowLabels={isShowLabels}
            shareUrl={shareUrl}
            onClickToggleIsShowEmojiPiece={onClickToggleIsShowEmojiPiece}
            onClickToggleIsShowLabels={onClickToggleIsShowLabels}
          />
        </div>
      </div>
    </Navbar>
  )
}
