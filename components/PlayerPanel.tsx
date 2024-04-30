'use client'

import { useSignInWithGoogleAuth } from '@/hooks/useSignInWithGoogleAuth'
import { useSignOut } from '@/hooks/useSignOut'
import { PlayerPill } from './PlayerPill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from './Button'
import { useSignInAnonymously } from '@/hooks/useSignInAnonymously'
import { useAuthStore } from '@/hooks/useAuthStore'
import { ThemeButton } from './ThemeButton'

function Divider () {
  return <hr className="h-6 border-l border-neutral-200 dark:border-neutral-800" />
}

export function PlayerPanel () {
  const { signIn } = useSignInWithGoogleAuth()

  const { signInAnonymously, isSigningInAnonymously } = useSignInAnonymously()

  const { player, isInitializingPlayer } = useAuthStore()

  const { signOut } = useSignOut()

  const shouldDisableButton = isSigningInAnonymously

  return (
    <div className="flex flex-wrap items-center gap-2">
      {player ?? isInitializingPlayer
        ? <>
          <PlayerPill emoji={player?.emoji} loading={isInitializingPlayer} name={player?.name} />

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
            Sign in
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
            as Guest
          </Button>

          <Divider />
          <ThemeButton />
        </>}
    </div>
  )
}
