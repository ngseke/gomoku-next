'use client'

import { useSignInWithGoogleAuth } from '@/hooks/useSignInWithGoogleAuth'
import { useSignOut } from '@/hooks/useSignOut'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from './Button'
import { useSignInAnonymously } from '@/hooks/useSignInAnonymously'
import { useAuthStore } from '@/hooks/useAuthStore'
import { ThemeButton } from './ThemeButton'
import { PlayerPillButton } from './PlayerPillButton'
import { useState } from 'react'
import { PlayerProfileDialog } from './PlayerProfileDialog'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/navigation'

function Divider () {
  return <hr className="h-6 border-l border-neutral-200 dark:border-neutral-800" />
}

export function PlayerPanel () {
  const t = useTranslations()

  const { signIn } = useSignInWithGoogleAuth()

  const { signInAnonymously, isSigningInAnonymously } = useSignInAnonymously()

  const { player, isInitializingPlayer } = useAuthStore()

  const { signOut } = useSignOut()

  const shouldDisableButton = isSigningInAnonymously

  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap items-center gap-2">
      <PlayerProfileDialog
        open={isOpen}
        onClose={() => { setIsOpen(false) }}
      />

      {player ?? isInitializingPlayer
        ? <>
          <PlayerPillButton
            disabled={isInitializingPlayer}
            emoji={player?.emoji}
            loading={isInitializingPlayer}
            name={player?.name}
            onClick={() => { setIsOpen(true) }}
          />

          <Button
            key="signOut"
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            onClick={signOut}
          />

          <Divider />

          <ThemeButton />
        </>
        : <>
          <span className="font-medium opacity-60">
            {t('action.signIn')}
          </span>

          <Button
            disabled={shouldDisableButton}
            icon={<FontAwesomeIcon icon={faGoogle} />}
            onClick={signIn}
          >
            Google
          </Button>
          <Button
            disabled={shouldDisableButton}
            icon={<FontAwesomeIcon icon={faUser} />}
            onClick={signInAnonymously}
          >
            {t('action.signInAsGuest')}
          </Button>

          <Divider />
          <ThemeButton />
        </>}
      <Button onClick={() => { router.replace(pathname, { locale: 'zh-Hant' }) }}>
        zh-Hant
      </Button>
      <Button onClick={() => { router.replace(pathname, { locale: 'en' }) }}>
        en
      </Button>
    </nav>
  )
}
